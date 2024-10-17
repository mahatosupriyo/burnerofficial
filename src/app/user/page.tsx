import React from 'react'
import styles from './user.module.scss'
import UserProfile from '@/components/layouts/userprofile/userprofile'
import NavBar from '@/components/navbar/navbar'
import prisma from '@/lib/prisma'

import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function UserPage() {

    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect('/auth')
    }

    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return (
        <div className={styles.wraper}>
            <div className={styles.container}>
                <NavBar />
            </div>

            <UserProfile />

        </div>
    )
}
