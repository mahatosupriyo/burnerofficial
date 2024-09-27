// lib/usernameHelpers.ts
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Helper function to check if the username is unique
export async function checkUsernameUnique(username: string) {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  return !user; // If no user is found, the username is unique
}

// Helper function to generate a username from the user's name
export function generateUsername(name: string | null) {
  if (!name) return `user${uuidv4()}`; // Fallback in case of no name
  return name.trim().toLowerCase().replace(/\s+/g, '');
}
