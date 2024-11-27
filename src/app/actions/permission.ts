import { UserRole } from '@prisma/client';
import prisma from '@/lib/prisma';

type Action = 'create' | 'read' | 'update' | 'delete';
type Resource = 'post' | 'user' | 'course' | 'video';

const permissionMatrix: Record<UserRole, Record<Resource, Action[]>> = {
  ADMIN: {
    post: ['create', 'read', 'update', 'delete'],
    user: ['create', 'read', 'update', 'delete'],
    course: ['create', 'read', 'update', 'delete'],
    video: ['create', 'read', 'update', 'delete'],
  },
  SUPERUSER: {
    post: ['create', 'read', 'update', 'delete'],
    user: ['read', 'update'],
    course: ['create', 'read', 'update', 'delete'],
    video: ['create', 'read', 'update', 'delete'],
  },
  USER: {
    post: ['create', 'read', 'update', 'delete'],
    user: ['read'],
    course: ['read'],
    video: ['read'],
  },
};

export function canPerformAction(userRole: UserRole, resource: Resource, action: Action): boolean {
  return permissionMatrix[userRole][resource].includes(action);
}

export async function checkPermission(userId: string, resource: Resource, action: Action): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    return false;
  }

  return canPerformAction(user.role, resource, action);
}

