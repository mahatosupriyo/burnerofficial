'use server'

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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

export async function updateAvatar(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to update your avatar");
    }

    const file = formData.get('file');
    if (!(file instanceof File)) {
      throw new Error("No valid file uploaded");
    }

    // Fetch the current user to get the existing avatar
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true },
    });

    const fileHash = crypto.createHash('md5').update(`${Date.now()}-${file.name}`).digest('hex');
    const fileName = `avatar/${fileHash}.webp`;

    const fileBuffer = await file.arrayBuffer();

    // Convert, compress, and resize the image to WebP
    const webpBuffer = await sharp(Buffer.from(fileBuffer))
      .resize({ width: 180, height: 180, fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();

    // Upload new avatar
    const putObjectCommand = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp',
    });

    await s3Client.send(putObjectCommand);

    // Delete old avatar if it exists
    if (currentUser?.image && currentUser.image !== 'defaultavatar.png') {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: currentUser.image,
      });

      try {
        await s3Client.send(deleteObjectCommand);
      } catch (deleteError) {
        console.error("Error deleting old avatar:", deleteError);
        // Continue execution even if delete fails
      }
    }

    // Update user's avatar in the database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: fileName },
    });

    revalidatePath('/profile'); 
    return { success: true, message: "Avatar updated successfully" };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function getSignedAvatarUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error generating signed URL for avatar:", error);
    return '/defaultavatar.png';
  }
}