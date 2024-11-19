import { Suspense } from 'react'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import UsersTable from './usertable'
import styles from './user.module.scss'
import { getUsers } from '@/app/actions/admin/user'

export default async function AdminUsersPage() {
  const session = await auth()
  if (!session?.user?.email) {
    return <div className={styles.error}>You must be logged in to view this page</div>
  }

  const admin = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  })

  if (!admin || admin.role !== 'ADMIN') {
    return <div className={styles.error}>You do not have permission to view this page</div>
  }

  const { users, totalPages } = await getUsers()

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <Suspense fallback={<div className={styles.loading}>Loading users...</div>}>
        <UsersTable initialUsers={users} initialTotalPages={totalPages} />
      </Suspense>
    </div>
  )
}