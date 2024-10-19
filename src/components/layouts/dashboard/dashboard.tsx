import React from 'react'
import styles from './dashboard.module.scss'
import Feed from '@/components/atoms/feed'
import PostsFetcher from '@/components/atoms/postfetcher'
import { PostList } from '@/components/atoms/postlist'
import prisma from '@/lib/prisma'
export default async function Dashboard() {
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
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <PostsFetcher />
                    {/* <Feed/> */}
                    <PostList initialPosts={posts} />

                </div>
            </section>
        </div>
    )
}