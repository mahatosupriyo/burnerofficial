'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitVerificationRequest(reason: string) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to submit a verification request')
  }

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

  await prisma.verificationRequest.create({
    data: {
      userId: user.id,
      reason,
      status: 'PENDING'
    },
  })

  revalidatePath('/settings')
  return { success: true }
}

export async function getPendingVerificationRequests() {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to view verification requests')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to view verification requests')
  }

  const pendingRequests = await prisma.verificationRequest.findMany({
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

  return pendingRequests
}

export async function approveVerificationRequest(requestId: string) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to approve a verification request')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to approve verification requests')
  }

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

  await prisma.verificationRequest.update({
    where: { id: requestId },
    data: { status: 'APPROVED' },
  })

  await prisma.user.update({
    where: { id: request.userId },
    data: { verificationStatus: 'VERIFIED' },
  })

  revalidatePath('/admin/verification-requests')
  return { success: true }
}

export async function rejectVerificationRequest(requestId: string) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to reject a verification request')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to reject verification requests')
  }

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

  await prisma.verificationRequest.update({
    where: { id: requestId },
    data: { status: 'REJECTED' },
  })

  revalidatePath('/admin/verification-requests')
  return { success: true }
}