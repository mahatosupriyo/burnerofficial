'use server'

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from 'zod';
import { checkPermission } from "@/app/actions/permission";

const envSchema = z.object({
  SERVER_REGION: z.string(),
  SERVER_ACCESS_KEY_ID: z.string(),
  SERVER_SECRET_ACCESS_KEY: z.string(),
  SERVER_S3_BUCKET_NAME: z.string(),
});

const env = envSchema.parse(process.env);

const s3Client = new S3Client({
  region: env.SERVER_REGION,
  credentials: {
    accessKeyId: env.SERVER_ACCESS_KEY_ID,
    secretAccessKey: env.SERVER_SECRET_ACCESS_KEY,
  },
});

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

    const canDelete = await checkPermission(session.user.id, 'post', 'delete');

    if (!canDelete && post.userId !== session.user.id) {
      throw new Error("You don't have permission to delete this post");
    }

    // Delete the image from S3
    const fileName = post.imageUrl.split('/').pop();
    if (!fileName) {
      throw new Error("Invalid image URL");
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: env.SERVER_S3_BUCKET_NAME,
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
    throw error; // Re-throw the error to be handled by the client
  }
}

