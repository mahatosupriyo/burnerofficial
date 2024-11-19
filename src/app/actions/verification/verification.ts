'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

const verificationRequestSchema = z.object({
  reason: z.string()
    .min(1, "Reason is required")
    .max(5000, "Reason must be 500 words or less")
    .refine(
      (value) => value.split(/\s+/).length <= 500,
      "Reason must be 500 words or less"
    )
})

async function checkAdminAuth() {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to perform this action')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true }
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to perform this action')
  }

  return session.user.email
}

export async function submitVerificationRequest(reason: string) {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      throw new Error('You must be logged in to submit a verification request')
    }

    const validatedData = verificationRequestSchema.parse({ reason })
    const sanitizedReason = DOMPurify.sanitize(validatedData.reason)

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        verificationRequests: {
          where: {
            createdAt: {
              gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
            }
          }
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (user.verificationStatus === 'VERIFIED') {
      throw new Error('You are already verified')
    }

    if (user.verificationRequests.length > 0) {
      throw new Error('You can only submit one verification request per month')
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.verificationRequest.create({
        data: {
          userId: user.id,
          reason: sanitizedReason,
          status: 'PENDING'
        },
      })

      await prisma.user.update({
        where: { id: user.id },
        data: { verificationStatus: 'PENDING' }
      })
    })

    revalidatePath('/settings')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message }
    }
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function getPendingVerificationRequests() {
  await checkAdminAuth()

  return await prisma.verificationRequest.findMany({
    where: { status: 'PENDING' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          location: true,
          verificationStatus: true,
        },
      },
    },
  })
}

export async function approveVerificationRequest(requestId: string) {
  await checkAdminAuth()

  const request = await prisma.verificationRequest.findUnique({
    where: { id: requestId },
    include: { user: true },
  })

  if (!request) {
    throw new Error('Verification request not found')
  }

  if (request.user.verificationStatus === 'VERIFIED') {
    throw new Error('User is already verified')
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.verificationRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    })

    await prisma.user.update({
      where: { id: request.userId },
      data: { verificationStatus: 'VERIFIED' },
    })
  })

  revalidatePath('/admin/verification-requests')
  return { success: true }
}

export async function rejectVerificationRequest(requestId: string) {
  await checkAdminAuth()

  const request = await prisma.verificationRequest.findUnique({
    where: { id: requestId },
    include: { user: true },
  })

  if (!request) {
    throw new Error('Verification request not found')
  }

  if (request.user.verificationStatus === 'VERIFIED') {
    throw new Error('User is already verified')
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.verificationRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    })

    await prisma.user.update({
      where: { id: request.userId },
      data: { verificationStatus: 'REJECTED' }
    })
  })

  revalidatePath('/admin/verification')
  return { success: true }
}

const RejectedRequestsCountSchema = z.object({
  eligibleForUpdate: z.number(),
  totalRejected: z.number(),
})

const BulkUpdateResultSchema = z.union([
  z.object({
    success: z.literal(true),
    message: z.string(),
    eligibleForUpdate: z.number(),
    totalRejected: z.number(),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
])

export type RejectedRequestsCounts = z.infer<typeof RejectedRequestsCountSchema>
export type BulkUpdateResult = z.infer<typeof BulkUpdateResultSchema>

export async function getRejectedRequestsCounts(): Promise<RejectedRequestsCounts> {
  await checkAdminAuth()

  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

  const totalRejected = await prisma.verificationRequest.count({
    where: { status: 'REJECTED' }
  })

  const eligibleForUpdate = await prisma.verificationRequest.count({
    where: {
      status: 'REJECTED',
      updatedAt: { lt: oneMonthAgo }
    }
  })

  return RejectedRequestsCountSchema.parse({ eligibleForUpdate, totalRejected })
}

export async function bulkUpdateRejectedRequests(): Promise<BulkUpdateResult> {
  try {
    await checkAdminAuth()

    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const result = await prisma.$transaction([
      prisma.user.updateMany({
        where: {
          verificationStatus: 'REJECTED',
          verificationRequests: {
            some: {
              status: 'REJECTED',
              updatedAt: { lt: oneMonthAgo }
            }
          }
        },
        data: { verificationStatus: 'UNVERIFIED' }
      }),
      prisma.verificationRequest.updateMany({
        where: {
          status: 'REJECTED',
          updatedAt: { lt: oneMonthAgo }
        },
        data: { status: 'PENDING' }
      })
    ])

    const { eligibleForUpdate, totalRejected } = await getRejectedRequestsCounts()

    revalidatePath('/admin/verification')
    return BulkUpdateResultSchema.parse({
      success: true,
      message: `Updated ${result[0].count} users and ${result[1].count} requests.`,
      eligibleForUpdate,
      totalRejected
    })
  } catch (error) {
    console.error('Error updating rejected requests:', error)
    return BulkUpdateResultSchema.parse({
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    })
  }
}

console.log('Server-side verification actions loaded successfully.')