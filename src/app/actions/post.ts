'use server'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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

  const imageUrl = `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;

  const post = await prisma.post.create({
    data: {
      imageUrl,
      caption,
      links: links ? links.split(',').map(link => link.trim()) : [],
      userId: session.user.id,
    },
  });

  revalidatePath('/');
  return post;
}

export async function deletePost(postId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to delete a post");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true, imageUrl: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== session.user.id) {
      throw new Error("You can only delete your own posts");
    }

    // Delete the image from S3
    const fileName = post.imageUrl.split('/').pop();
    if (!fileName) {
      throw new Error("Invalid image URL");
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: fileName,
    });

    await s3Client.send(deleteCommand);

    // Delete the post from the database
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath('/');
    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}