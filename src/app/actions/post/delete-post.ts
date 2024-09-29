'use server'

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from 'zod';

// Move this part to a shared config file or keep it here if it's not reused in many places
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
      throw error; // Re-throw the error to be handled by the client
    }
  }