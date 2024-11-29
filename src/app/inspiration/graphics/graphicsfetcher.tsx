import { PrismaClient } from '@prisma/client'
import { getSignedImageUrl } from '@/app/actions/post'
import { getAvatarUrl } from '@/app/actions/avatar'
import { redis } from '@/lib/redis'

const prisma = new PrismaClient()

const CACHE_KEY = 'verified_ui_posts'
const CACHE_EXPIRATION = 60 * 35 // 35 minutes

type PostWithUser = {
    id: string
    imageUrl: string
    createdAt: string
    userId: string
    link: string | null
    caption: string | null
    tags: string[]
    user: {
        username: string
        image: string
        avatarUrl: string
    }
}

async function getPosts(): Promise<PostWithUser[]> {
    try {
        // Try to get posts from cache
        const cachedPosts = await redis.get(CACHE_KEY)
        if (cachedPosts && typeof cachedPosts === 'string') {
            return JSON.parse(cachedPosts) as PostWithUser[]
        }

        // If not in cache, fetch from database
        const posts = await prisma.post.findMany({
            where: {
                user: {
                    verificationStatus: 'VERIFIED'
                },
                tags: {
                    hasSome: ['graphics', 'Graphics', 'GRAPHICS']
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
                createdAt: 'desc'
            }
        })

        const postsWithSignedUrls: PostWithUser[] = await Promise.all(
            posts.map(async (post) => {
                const signedImageUrl = await getSignedImageUrl(post.imageUrl)
                const avatarUrl = await getAvatarUrl(post.user.image || 'defaultavatar.png')
                return {
                    id: post.id,
                    imageUrl: signedImageUrl,
                    createdAt: post.createdAt.toISOString(),
                    userId: post.userId,
                    link: post.link,
                    caption: post.caption,
                    tags: post.tags,
                    user: {
                        username: post.user.username || 'Anonymous',
                        image: post.user.image || '/defaultavatar.png',
                        avatarUrl: avatarUrl
                    }
                }
            })
        )

        // Cache the result
        await redis.set(CACHE_KEY, JSON.stringify(postsWithSignedUrls), { ex: CACHE_EXPIRATION })

        return postsWithSignedUrls
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}

// Function to invalidate cache when a new post is added or updated
export async function invalidatePostsCache() {
    await redis.del(CACHE_KEY)
}

export default async function GraphicsPostsFetcher() {
    const posts = await getPosts()
    return <script
        id="posts-data"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(posts) }}
    />
}

