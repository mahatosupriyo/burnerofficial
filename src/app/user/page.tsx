import React from 'react'
import styles from './user.module.scss'
import UserProfile from '@/components/layouts/userprofile/userprofile'
import NavBar from '@/components/navbar/navbar'
import prisma from '@/lib/prisma'
import { PostList } from '@/components/atoms/postlist'

export default async function UserPage() {
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
            <NavBar />
            <div className={styles.container}>
                {/* <UserProfile/> */}
                <PostList initialPosts={posts} />

            </div>
        </div>
    )
}
