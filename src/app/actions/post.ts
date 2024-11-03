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


export async function createPost(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to create a post");
    }

    
    
    const file = formData.get('file');
    if (!(file instanceof File)) {
      throw new Error("No valid file uploaded");
    }
    
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds 5 mega byte limit");
    }

    // Check if the file is an image
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedImageTypes.includes(file.type)) {
      throw new Error("Please upload a JPEG, PNG, GIF, or WebP image.");
    }

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

    await prisma.post.create({
      data: {
        imageUrl: fileName,
        userId: session.user.id,
      },
    });

    revalidatePath('/');
    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
  }
}

export async function getPostWithSignedUrl(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const signedUrl = await getSignedImageUrl(post.imageUrl);

    return {
      ...post,
      imageUrl: signedUrl,
      user: {
        username: post.user?.username || 'Anonymous',
        image: post.user?.image || '/defaultavatar.png',
      },
    };
  } catch (error) {
    console.error("Error fetching post with signed URL:", error);
    throw new Error("Failed to fetch post");
  }
}

export async function getSignedImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return '/placeholder-image.jpg';
  }
}