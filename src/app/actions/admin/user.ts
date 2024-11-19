'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  username: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

const GetUsersParamsSchema = z.object({
  sortField: z.enum(['name', 'email', 'username']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().int().positive().optional(),
  perPage: z.number().int().positive().optional(),
})

export type GetUsersParams = z.infer<typeof GetUsersParamsSchema>

export async function getUsers(params?: GetUsersParams) {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to perform this action')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to perform this action')
  }

  const { sortField = 'name', sortOrder = 'asc', page = 1, perPage = 10 } = GetUsersParamsSchema.parse(params || {})

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
    },
    orderBy: { [sortField]: sortOrder },
    skip: (page - 1) * perPage,
    take: perPage,
  })

  const totalUsers = await prisma.user.count()

  return {
    users: users.map(user => UserSchema.parse(user)),
    totalPages: Math.ceil(totalUsers / perPage),
    currentPage: page,
  }
}

export async function getUserCount() {
  const session = await auth()
  if (!session?.user?.email) {
    throw new Error('You must be logged in to perform this action')
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })

  if (!admin || admin.role !== 'ADMIN') {
    throw new Error('You do not have permission to perform this action')
  }

  return await prisma.user.count()
}