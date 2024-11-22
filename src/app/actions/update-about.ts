'use server'

import { z } from 'zod'
import { auth } from "@/auth"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


const aboutSchema = z.object({
  about: z.string().min(1, "About is required").max(150),
  location: z.string().max(100).optional(),
  work: z.string().max(100).optional(),
  instagram: z.string().url().optional().or(z.literal('')),
  behance: z.string().url().optional().or(z.literal('')),
  x: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  dribbble: z.string().url().optional().or(z.literal(''))
})

export async function updateAbout(userId: string, data: z.infer<typeof aboutSchema>) {
  const validatedData = aboutSchema.parse(data)

  const session = await auth()
  if (!session || !session.user?.email) {
    return { error: "You must be logged in to update your profile." }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { about: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const now = new Date()
  const existingAbout = user.about[0]
  
  if (existingAbout) {
    const lastUpdate = existingAbout.lastAboutUpdate
    const timeSinceLastUpdate = (now.getTime() - lastUpdate.getTime()) / 1000 // Convert to seconds

    if (timeSinceLastUpdate < 60) { // 60 seconds = 1 minute
      throw new Error('You can only update your profile once per minute')
    }

    // Update existing About entry
    const updatedAbout = await prisma.about.update({
      where: { id: existingAbout.id },
      data: {
        ...validatedData,
        lastAboutUpdate: now
      }
    })

    revalidatePath('/')
    return updatedAbout
  } else {
    // Create new About entry
    const newAbout = await prisma.about.create({
      data: {
        ...validatedData,
        userId,
        lastAboutUpdate: now
      }
    })

    revalidatePath('/')
    return newAbout
  }
}