"use client"

import React, { useState } from 'react'
import styles from './userprofile.module.scss'
import PostCard from '@/components/molecules/banner/postcard'
import Icon from '@/components/atoms/icons'
import { motion } from 'framer-motion'
import Overlay from '@/components/molecules/overlay/overlay'
import { deletePost } from '@/app/actions/post/delete-post'
import { revalidatePath } from 'next/cache'

interface Post {
  id: string
  imageUrl: string
  createdAt: string
}

interface User {
  verified: boolean
  name: string
  image: string | null
  username: string
  posts: Post[]
}

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user: initialUser }: UserProfileProps) {
  const [user, setUser] = useState<User>(initialUser)
  const [visiblePosts, setVisiblePosts] = useState(3)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const firstName = user.name.split(" ")[0]

  const loadMorePosts = () => {
    setVisiblePosts(prevVisible => prevVisible + 3)
  }

  const handleDelete = async (postId: string) => {
    setDeletingPostId(postId)
    try {
      const result = await deletePost(postId)
      if (result.success) {
        setUser(prevUser => ({
          ...prevUser,
          posts: prevUser.posts.filter(post => post.id !== postId)
        }))
        console.log(result.message)
        // revalidatePath(`/user/${user.username}`)
        revalidatePath('/')


      } else {
        console.error(result.message)
      }
    } catch (error) {
      console.error("Error deleting post:", error)
    } finally {
      setDeletingPostId(null)
    }
  }

  return (
    <div className={styles.displaycontainer}>
      <section className={styles.displaywraper}>
        <div className={styles.content}>
          <div className={styles.contentwraper}>
            <div className={styles.userbadge}>
              <h4 className={styles.username}>
                {user.username}
                {user.verified && <Icon name='verified' size={10} />}
              </h4>
              <h3 className={styles.intro}>
                <span style={{ paddingLeft: '50%' }}></span>
                {firstName} is a Design Engineer based in India. He is a Top LinkedIn Design voice.
                As a visionary Design Engineer, Supriyo Mahato continues to shape the design landscape with his unique perspective and relentless pursuit of excellence.
              </h3>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <div className={styles.creatordata}>
                  <div className={styles.creator}>
                    <div style={{ width: '100%' }}>
                      <img
                        src={user.image || '/avatar.png'}
                        alt="User Avatar"
                        draggable="false"
                        className={styles.avatar}
                      />
                    </div>
                    <div className={styles.socials}>
                      <div className={styles.sociallink}>
                        <Icon name='instagram' size={20} fill='#fafafa' />
                        Instagram
                      </div>
                      <div className={styles.sociallink}>
                        <Icon name='linkedin' size={20} />
                        LinkedIn
                      </div>
                      <div className={styles.sociallink}>
                        <Icon name='behance' size={20} fill='#fafafa' />
                        Behance
                      </div>
                      <div className={styles.sociallink}>
                        <Icon name='dribbble' size={20} fill='#fafafa' />
                        Dribbble
                      </div>
                      <div className={styles.sociallink}>
                        <Icon name='x' size={20} fill='#fafafa' />
                        X (Twitter)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.componentwraper}>
              <PostCard posts={user.posts} />
              <div className={styles.userposts}>
                <div className={styles.postwraper}>
                  {user.posts.slice(0, visiblePosts).map((post) => (
                    <Overlay
                      key={post.id}
                      triggerButton={
                        <motion.div
                          className={styles.post}
                          whileTap={{ opacity: 0.6 }}
                          initial={{ opacity: 0.6, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, filter: 'blur(0px)' }}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={post.imageUrl}
                            alt="Post image"
                            draggable="false"
                            className={styles.creation}
                          />
                        </motion.div>
                      }
                      overlayContent={
                        <div className={styles.overlayContent}>
                          <img
                            src={post.imageUrl}
                            alt={`Post by ${user.username}`}
                            draggable="false"
                            className={styles.selectedImage}
                          />
                          <div className={styles.creatorwraper}>
                            <div className={styles.creator}>
                              <img
                                src={user.image || '/avatar.png'}
                                draggable="false"
                                loading="lazy"
                                className={styles.avatar}
                                alt={`Avatar of ${user.username}`}
                              />
                              <div className={styles.creationdetails}>
                                <p className={styles.username}>
                                  {user.username}
                                  {user.verified && <Icon name="verified" size={10} />}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              className={styles.deletebtn}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleDelete(post.id)}
                              disabled={deletingPostId === post.id}
                            >
                              {deletingPostId === post.id ? (
                                <div className={styles.loader}></div>
                              ) : (

                                'Delete'

                              )}
                            </motion.button>
                          </div>
                        </div>
                      }
                    />
                  ))}
                </div>
                {visiblePosts < user.posts.length && (
                  <div className={styles.loadMoreContainer}>
                    <button
                      onClick={loadMorePosts}
                      className={styles.loadMoreButton}
                    >
                      <Icon name='downarrow' size={22} fill='#fafafa' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}