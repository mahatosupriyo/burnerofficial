'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const aboutSchema = z.object({
  about: z.string().max(500).optional(),
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

  const user = await prisma.user.findUnique({
    where: { id: userId },
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