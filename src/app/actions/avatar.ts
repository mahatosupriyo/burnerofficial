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

    // Check if the file is an image
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedImageTypes.includes(file.type)) {
      throw new Error("Please upload a JPEG, PNG, GIF, or WebP image.");
    }

    // Fetch the current user to get the existing avatar and last update time
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { image: true, lastImageUpdate: true },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    // Check if the user has updated their avatar in the last 24 hours
    if (currentUser.lastImageUpdate) {
      const timeSinceLastUpdate = Date.now() - currentUser.lastImageUpdate.getTime();
      if (timeSinceLastUpdate < 24 * 60 * 60 * 1000) {
        throw new Error("You can only update your avatar once per day");
      }
    }

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
      Bucket: env.SERVER_S3_BUCKET_NAME,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp',
    });

    await s3Client.send(putObjectCommand);

    // Delete old avatar if it exists and is not the default avatar
    if (currentUser.image && !currentUser.image.startsWith('http') && !currentUser.image.startsWith('https') && currentUser.image !== 'defaultavatar.png') {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: env.SERVER_S3_BUCKET_NAME,
        Key: currentUser.image,
      });

      try {
        await s3Client.send(deleteObjectCommand);
      } catch (deleteError) {
        console.error("Error deleting old avatar:", deleteError);
        // Continue execution even if delete fails
      }
    }

    // Update user's avatar and lastImageUpdate in the database
    await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        image: fileName,
        lastImageUpdate: new Date(),
      },
    });

    revalidatePath('/'); 
    return { success: true, message: "Avatar updated successfully" };
  } catch (error) {
    console.error("Error updating avatar:", error);
    return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function getAvatarUrl(key: string) {
  // If the key is already a full URL, return it as is
  if (key.startsWith('http') || key.startsWith('https')) {
    return key;
  }

  // If it's the default avatar, return the local path
  if (key === 'defaultavatar.png') {
    return '/defaultavatar.png';
  }

  // Otherwise, generate a signed URL for S3
  const command = new GetObjectCommand({
    Bucket: process.env.SERVER_S3_BUCKET_NAME!,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error generating signed URL for avatar:", error);
    return '/defaultavatar.png';
  }
}