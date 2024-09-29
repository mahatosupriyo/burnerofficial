'use server'

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from 'zod';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const PostSchema = z.object({
  caption: z.string().optional(),
  links: z.string().optional(),
});

export async function createPost(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
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

  const fileExtension = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExtension}`;

  const fileBuffer = await file.arrayBuffer();

  // Compress and resize the image
  const compressedImageBuffer = await sharp(Buffer.from(fileBuffer))
    .resize({ width: 1080, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName,
    Body: compressedImageBuffer,
    ContentType: 'image/webp',
  });

  await s3Client.send(putObjectCommand);

  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

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
  const session = await auth();
  if (!session?.user) {
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
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileName!,
  });

  await s3Client.send(deleteCommand);

  // Delete the post from the database
  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath('/');
}