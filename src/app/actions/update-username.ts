'use server'

import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

const updateUsernameSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_.]+$/),
})

export async function updateUsername(formData: FormData) {
  const session = await auth()

  if (!session || !session.user?.email) {
    return { error: "You must be logged in to update your username." }
  }

  const result = updateUsernameSchema.safeParse({
    username: formData.get('username'),
  })

  if (!result.success) {
    return { error: "Invalid username. It must be 3-20 characters and can only contain letters, numbers, underscores, and dots." }
  }

  const { username } = result.data

  // Check if username is already taken
  const existingUser = await prisma.user.findUnique({
    where: { username },
  })

  if (existingUser) {
    return { error: "This username is already taken." }
  }

  // Check if the user has updated their username in the last week
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { lastUsernameUpdate: true, username: true },
  })

  if (!currentUser) {
    return { error: "User not found." }
  }

  if (currentUser.username === username) {
    return { error: "This is already your current username." }
  }

  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  if (currentUser.lastUsernameUpdate && currentUser.lastUsernameUpdate > oneWeekAgo) {
    return { error: "You can only update your username once a week." }
  }

  // Update the username
  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        username,
        lastUsernameUpdate: new Date(),
      },
    })
    return { success: "Username updated successfully." }
  } catch (error) {
    console.error("Error updating username:", error)
    return { error: "An error occurred while updating your username." }
  }
}