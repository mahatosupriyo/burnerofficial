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

  const { name, email } = validatedFields.data
  const username = validatedFields.data.username.toLowerCase() // Convert username to lowercase

  // Fetch current user data
  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      username: true,
      lastUsernameUpdate: true,
      lastNameUpdate: true,
      lastEmailUpdate: true,
    },
  })

  if (!currentUser) {
    return { error: { general: ["User not found."] } }
  }

  // Check if any changes were made
  if (currentUser.name === name && currentUser.email === email && currentUser.username === username) {
    return { error: { general: ["No changes detected. Please make changes before submitting."] } }
  }

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  const errors: Record<string, string[]> = {}

  // Check if updates are allowed
  if (currentUser.name !== name) {
    if (currentUser.lastNameUpdate && currentUser.lastNameUpdate > oneWeekAgo) {
      errors.name = ["You can only update your name once a week."]
    }
  }

  if (currentUser.email !== email) {
    const emailUpdateCount = await prisma.user.count({
      where: {
        id: session.user.id,
        lastEmailUpdate: { gt: oneWeekAgo }
      }
    })
    if (emailUpdateCount >= 2) {
      errors.email = ["You can only update your email twice a week."]
    }
  }

  if (currentUser.username !== username) {
    if (currentUser.lastUsernameUpdate && currentUser.lastUsernameUpdate > oneWeekAgo) {
      errors.username = ["You can only update your username once a week."]
    }
  }

  // Check if username is already taken
  if (currentUser.username !== username) {
    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })

    if (existingUser && existingUser.id !== session.user.id) {
      errors.username = [...(errors.username || []), "This username is already taken."]
    }
  }

  // Check if email is already taken
  if (currentUser.email !== email) {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })

    if (existingEmail && existingEmail.id !== session.user.id) {
      errors.email = [...(errors.email || []), "This email is already in use."]
    }
  }

  if (Object.keys(errors).length > 0) {
    return { error: errors }
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        name: currentUser.name !== name ? name : undefined,
        email: currentUser.email !== email ? email : undefined,
        username: currentUser.username !== username ? username : undefined,
        lastNameUpdate: currentUser.name !== name ? new Date() : undefined,
        lastEmailUpdate: currentUser.email !== email ? new Date() : undefined,
        lastUsernameUpdate: currentUser.username !== username ? new Date() : undefined,
      },
    })
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { error: { general: ["An error occurred while updating your profile."] } }
  }
}