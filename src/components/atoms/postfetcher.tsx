import { PrismaClient } from '@prisma/client'
import { getSignedImageUrl } from '@/app/actions/post'

const prisma = new PrismaClient()

async function getPosts() {
  try {
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
        createdAt: 'desc'
      }
    })

    const postsWithSignedUrls = await Promise.all(
      posts.map(async (post) => {
        const signedImageUrl = await getSignedImageUrl(post.imageUrl)
        return {
          id: post.id,
          imageUrl: signedImageUrl,
          createdAt: post.createdAt.toISOString(),
          userId: post.userId,
          user: {
            username: post.user.username || 'Anonymous',
            image: post.user.image || '/defaultavatar.png'
          }
        }
      })
    )

    return postsWithSignedUrls
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function PostsFetcher() {
  const posts = await getPosts()
  return <script id="posts-data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(posts) }} />
}