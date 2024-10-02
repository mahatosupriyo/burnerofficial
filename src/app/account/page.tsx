// import { PostList } from '@/components/atoms/postlist'
// import { CreatePostForm } from '@/components/atoms/createpostform'
// import prisma from '@/lib/prisma'

// export default async function Account() {
//   const posts = await prisma.post.findMany({
//     include: {
//       user: {
//         select: {
//           name: true,
//           image: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: 'desc',
//     },
//   })

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Image Posting App</h1>
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
//         <CreatePostForm />
//       </div>
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
//         <PostList initialPosts={posts} />
//       </div>
//     </main>
//   )
// }


import { PostList } from '@/components/atoms/postlist';
import { CreatePostForm } from '@/components/atoms/createpostform';
import prisma from '@/lib/prisma';

export default async function Account() {
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Image Posting App</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <CreatePostForm />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <PostList initialPosts={posts} />
      </div>
    </main>
  );
}
