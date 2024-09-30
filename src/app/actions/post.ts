'use server'

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from 'zod';
import sharp from 'sharp';
import crypto from 'crypto';

// Validate environment variables
const envSchema = z.object({
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
});

const env = envSchema.parse(process.env);

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const PostSchema = z.object({
  caption: z.string().optional(),
  links: z.string().optional(),
});

async function getSignedImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: key,
  });

  // The URL will be valid for 1 hour
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to create a post");
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const { caption, links } = PostSchema.parse({
    caption: formData.get('caption'),
    links: formData.get('links'),
  });

  const fileHash = crypto.createHash('md5').update(`${Date.now()}-${file.name}`).digest('hex');
  const fileName = `${fileHash}.webp`;

  const fileBuffer = await file.arrayBuffer();

  // Convert, compress, and resize the image to WebP
  const webpBuffer = await sharp(Buffer.from(fileBuffer))
    .resize({ width: 1080, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const putObjectCommand = new PutObjectCommand({
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: webpBuffer,
    ContentType: 'image/webp',
  });

  await s3Client.send(putObjectCommand);

  const imageUrl = await getSignedImageUrl(fileName);

  await prisma.post.create({
    data: {
      imageUrl: fileName, // Store only the file name in the database
      caption,
      links: links ? links.split(',').map(link => link.trim()) : [],
      userId: session.user.id,
    },
  });

  revalidatePath('/');
}

export async function getPostWithSignedUrl(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const signedUrl = await getSignedImageUrl(post.imageUrl);

  return { ...post, imageUrl: signedUrl };
}