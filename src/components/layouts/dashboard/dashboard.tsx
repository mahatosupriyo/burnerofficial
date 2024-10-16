import React from 'react'
import styles from './dashboard.module.scss'
import { PrismaClient } from '@prisma/client'
import { getPostWithSignedUrl } from '@/app/actions/post'
import Feed from '@/components/atoms/feed'

const prisma = new PrismaClient()

async function getPosts() {
    const posts = await prisma.post.findMany({
        where: {
            user: {
                verified: true
            }
        },
        include: {
            user: {
                select: {
                    username: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    console.log('Posts fetched from database:', posts);


    const postsWithSignedUrls = await Promise.all(
        posts.map(async (post) => {
            const postWithSignedUrl = await getPostWithSignedUrl(post.id)
            return { ...post, imageUrl: postWithSignedUrl.imageUrl }
        })
    )

    return postsWithSignedUrls
}

export default async function Dashboard() {
    const posts = await getPosts()

    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>

                <div className={styles.header}>
                    <Feed posts={posts} />
                </div>

            </section>
        </div>
    )
}
