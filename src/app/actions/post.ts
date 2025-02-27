'use server'

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from 'zod';
import sharp from 'sharp';
import crypto from 'crypto';
import { rateLimit } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/sanitize';
import { FileTypeResult, fileTypeFromBuffer } from 'file-type';
import { checkPermission } from "@/app/actions/permission";

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

// Define schemas for various parts of the application
const FileSchema = z.instanceof(File);


const PostInputSchema = z.object({
  file: z.any(),
  caption: z
    .string()
    .max(500)
    .optional()
    .nullable()
    .refine(
      (val) => !val || val.trim().split(/\s+/).length <= 20,
      { message: "Caption must not exceed 20 words" }
    ),
  link: z.string().url().max(2000).optional().nullable(),
  tags: z
    .string()
    .array()
    .optional()
    .default([])
    .refine((tags) => tags.length <= 2, {
      message: "You can select a maximum of 2 tags.",
    })
    .refine((tags) => tags.every((tag) => tag.length <= 50), {
      message: "Each tag must be 50 characters or fewer.",
    }),
});


const UserSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  image: z.string().nullable(),
});

const PostSchema = z.object({
  id: z.string(),
  imageUrl: z.string(),
  caption: z.string().nullable(),
  link: z.string().nullable(),
  createdAt: z.date(),
  userId: z.string(),
  user: UserSchema,
  tags: z.string().array(),
});

type PostInput = z.infer<typeof PostInputSchema>;
type Post = z.infer<typeof PostSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_POSTS_PER_USER = 100;

export async function createPost(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to create a post");
    }

    // Apply rate limiting
    await rateLimit(session.user.id);

    // Check if the user has reached the maximum post limit
    const userPostCount = await prisma.post.count({
      where: { userId: session.user.id }
    });

    if (userPostCount >= MAX_POSTS_PER_USER) {
      throw new Error(`You have reached the maximum limit of ${MAX_POSTS_PER_USER} posts`);
    }


    const rawTags = formData.get("tags") as string;
    const tagsArray = rawTags ? [rawTags] : []; // Wrap single tag in an array

    const input = PostInputSchema.safeParse({
      file: formData.get("file"),
      caption: formData.get("caption") || null,
      link: formData.get("link") || null,
      tags: tagsArray,
    });

    if (!input.success) {
      throw new Error(input.error.errors[0].message || "Invalid input data");
    }

    const { file, caption, link, tags } = input.data as PostInput;

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)} MB limit`);
    }

    const fileBuffer = await file.arrayBuffer();
    const fileType: FileTypeResult | undefined = await fileTypeFromBuffer(Buffer.from(fileBuffer));

    if (!fileType || !ALLOWED_FILE_TYPES.includes(fileType.mime)) {
      throw new Error("Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.");
    }

    const fileHash = crypto.createHash('sha256').update(`${Date.now()}-${file.name}`).digest('hex');
    const fileName = `${fileHash}.webp`;

    const webpBuffer = await sharp(Buffer.from(fileBuffer))
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const putObjectCommand = new PutObjectCommand({
      Bucket: env.SERVER_S3_BUCKET_NAME,
      Key: fileName,
      Body: webpBuffer,
      ContentType: 'image/webp',
    });

    await s3Client.send(putObjectCommand);

    const newPost = await prisma.post.create({
      data: {
        imageUrl: fileName,
        userId: session.user.id,
        caption: caption ? sanitizeString(caption) : null,
        link: link ? sanitizeString(link) : null,
        tags,
      },
      include: {
        user: true,
      },
    });

    const validatedPost = PostSchema.parse(newPost);

    revalidatePath('/');
    return { success: true, message: "Post created successfully", post: validatedPost };
  } catch (error) {
    console.error("Error creating post:", error);
    if (error instanceof z.ZodError) {
      return { success: false, message: "Invalid input data", errors: error.errors };
    }
    return { success: false, message: error instanceof Error ? error.message : "An error occurred while creating the post" };
  }
}

export async function getPostWithSignedUrl(postId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("You must be logged in to view posts");
    }

    // Apply rate limiting
    await rateLimit(session.user.id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const validatedPost = PostSchema.parse(post);
    const signedUrl = await getSignedImageUrl(validatedPost.imageUrl);

    return {
      ...validatedPost,
      imageUrl: signedUrl,
    };
  } catch (error) {
    console.error("Error fetching post with signed URL:", error);
    throw new Error("Failed to fetch post");
  }
}

export async function getSignedImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: env.SERVER_S3_BUCKET_NAME,
    Key: key,
  });

  try {
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return '/placeholder-image.jpg';
  }
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

    const canDelete = await checkPermission(session.user.id, 'post', 'delete');

    if (!canDelete && post.userId !== session.user.id) {
      throw new Error("You don't have permission to delete this post");
    }

    // Delete the image from S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: env.SERVER_S3_BUCKET_NAME,
      Key: post.imageUrl,
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
    throw error;
  }
}

