'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_.]+$/, 
    "Username must be 3-20 characters and can only contain letters, numbers, underscores, and dots"),
})

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session || !session.user?.email) {
    return { error: "You must be logged in to update your profile." }
  }

  const validatedFields = UpdateProfileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { name, email, username } = validatedFields.data

  // Check if username is already taken
  const existingUser = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  })

  if (existingUser && existingUser.id !== session.user.id) {
    return { error: { username: ["This username is already taken."] } }
  }

  // Check if the user has updated their username in the last week
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { lastUsernameUpdate: true, username: true },
  })

  if (!currentUser) {
    return { error: { general: ["User not found."] } }
  }

  if (currentUser.username !== username) {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    if (currentUser.lastUsernameUpdate && currentUser.lastUsernameUpdate > oneWeekAgo) {
      return { error: { username: ["You can only update your username once a week."] } }
    }
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        name, 
        email, 
        username,
        lastUsernameUpdate: currentUser.username !== username ? new Date() : undefined,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: { general: ["An error occurred while updating your profile."] } }
  }
}