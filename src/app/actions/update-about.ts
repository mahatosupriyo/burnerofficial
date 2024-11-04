'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const aboutSchema = z.object({
  about: z.string().min(1, "About is required").max(500),
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

export async function generateAbout(userInput: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `Based on the following information about a user, in third person. generate a engaging 'About' section, approximately 24 words long:

    User input: ${userInput}

    Please create an 'About' section that expands on this information, adding relevant details and maintaining a professional yet simple tone.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating about content:', error)
    throw new Error('Failed to generate about content')
  }
}