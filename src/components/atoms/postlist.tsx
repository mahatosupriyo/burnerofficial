// 'use client'
// import { useState, useEffect } from 'react'
// import { deletePost } from '@/app/actions/post/delete-post'
// import { useRouter } from 'next/navigation'
// import {getPostWithSignedUrl} from '@/app/actions/post'

// type Post = {
//   id: string
//   imageUrl: string
//   links: string[]
//   createdAt: Date
//   user: {
//     name: string | null
//     image: string | null
//   }
// }

// type PostListProps = {
//   initialPosts: Post[]
// }

// export function PostList({ initialPosts }: PostListProps) {
//   const [posts, setPosts] = useState(initialPosts)

//   useEffect(() => {
//     const updateSignedUrls = async () => {
//       const updatedPosts = await Promise.all(
//         posts.map(async (post) => {
//           const updatedPost = await getPostWithSignedUrl(post.id)
//           return { ...post, imageUrl: updatedPost.imageUrl }
//         })
//       )
//       setPosts(updatedPosts)
//     }

//     updateSignedUrls()

//     const intervalId = setInterval(updateSignedUrls, 50 * 60 * 1000)

//     return () => clearInterval(intervalId)
//   }, [])

//   const router = useRouter()

//   const handleDelete = async (postId: string) => {
//     if (confirm('Are you sure you want to delete this post?')) {
//       try {
//         await deletePost(postId)
//         setPosts(posts.filter(post => post.id !== postId))
//         router.refresh()
//       } catch (error) {
//         console.error("Error deleting post:", error)
//         alert("Failed to delete post. Please try again.")
//       }
//     }
//   }

//   return (
//     <div className="space-y-8">
//       {posts.map(post => (
//         <div key={post.id} className="bg-white shadow rounded-lg overflow-hidden">
//           <img src={post.imageUrl} className="w-full h-64 object-cover" />
//           <div className="p-4">
//             {post.links.length > 0 && (
//               <div className="mt-2">
//                 <p className="text-sm font-medium text-gray-500">Links:</p>
//                 <ul className="list-disc pl-5">
//                   {post.links.map((link, index) => (
//                     <li key={index}>
//                       <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div className="mt-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 {post.user.image && (
//                   <img src={post.user.image} alt={post.user.name || ''} className="h-8 w-8 rounded-full mr-2" />
//                 )}
//                 <span className="text-sm text-gray-600">{post.user.name}</span>
//               </div>
//               <button
//                 onClick={() => handleDelete(post.id)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }


import React from 'react'

const Post = () => {
  return (
    <div>
      this ia a component
    </div>
  )
}

export default Post
