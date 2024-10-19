import { PrismaClient } from '@prisma/client'
import { getPostWithSignedUrl } from '@/app/actions/post'

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

  const postsWithSignedUrls = await Promise.all(
    posts.map(async (post) => {
      try {
        const postWithSignedUrl = await getPostWithSignedUrl(post.id)
        return {
          id: post.id,
          imageUrl: postWithSignedUrl.imageUrl || '/placeholder-image.jpg',
          caption: post.caption || '',
          links: post.links || [],
          createdAt: post.createdAt.toISOString(),
          userId: post.userId,
          user: {
            username: post.user?.username || 'Anonymous',
            image: post.user?.image || '/defaultavatar.png'
          }
        }
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error)
        return null
      }
    })
  )

  return postsWithSignedUrls.filter(Boolean)
}

export default async function PostsFetcher() {
  const posts = await getPosts()
  return <script id="posts-data" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(posts) }} />
}