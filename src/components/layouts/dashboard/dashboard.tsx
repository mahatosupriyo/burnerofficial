// import React from 'react'
// import styles from './dashboard.module.scss'
// import { PrismaClient } from '@prisma/client'
// import { getPostWithSignedUrl } from '@/app/actions/post'
// import Feed from '@/components/atoms/feed'

// const prisma = new PrismaClient()

// async function getPosts() {
//     const posts = await prisma.post.findMany({
//         where: {
//             user: {
//                 verified: true
//             }
//         },
//         include: {
//             user: {
//                 select: {
//                     username: true,
//                     image: true
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: 'asc'
//         }
//     })

//     console.log('Posts fetched from database:', posts);

//     const postsWithSignedUrls = await Promise.all(
//         posts.map(async (post) => {
//             try {
//                 const postWithSignedUrl = await getPostWithSignedUrl(post.id)
//                 return { 
//                     ...post, 
//                     imageUrl: postWithSignedUrl.imageUrl || '',
//                     user: {
//                         username: post.user?.username || 'Anonymous',
//                         image: post.user?.image || '/defaultavatar.png'
//                     }
//                 }
//             } catch (error) {
//                 console.error(`Error processing post ${post.id}:`, error);
//                 return null;
//             }
//         })
//     )

//     return postsWithSignedUrls.filter(Boolean);
// }

// export default async function Dashboard() {
//     const posts = await getPosts()

//     return (
//         <div className={styles.displaycontainer}>
//             <section className={styles.displaywraper}>
//                 <div className={styles.header}>
//                     <Feed posts={posts} />
//                 </div>
//             </section>
//         </div>
//     )
// }


import React from 'react'
import styles from './dashboard.module.scss'
import { PrismaClient } from '@prisma/client'
import { getPostWithSignedUrl } from '@/app/actions/post'
import Feed from '@/components/atoms/feed'

const prisma = new PrismaClient()

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  links: string[];
  createdAt: Date;
  userId: string;
  user: {
    username: string;
    image: string;
  };
}

async function getPosts(): Promise<Post[]> {
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
    posts.map(async (post): Promise<Post> => {
      try {
        const postWithSignedUrl = await getPostWithSignedUrl(post.id)
        return {
          id: post.id,
          imageUrl: postWithSignedUrl.imageUrl || '/placeholder-image.jpg',
          caption: post.caption || '',
          links: post.links || [],
          createdAt: post.createdAt,
          userId: post.userId,
          user: {
            username: post.user?.username || 'Anonymous',
            image: post.user?.image || '/defaultavatar.png'
          }
        }
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        return {
          id: post.id,
          imageUrl: '/placeholder-image.jpg',
          caption: '',
          links: [],
          createdAt: post.createdAt,
          userId: post.userId,
          user: {
            username: 'Anonymous',
            image: '/defaultavatar.png'
          }
        }
      }
    })
  )

  return postsWithSignedUrls;
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