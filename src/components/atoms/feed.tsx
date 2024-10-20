"use client"

import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Icon from './icons'
import Controls from '../molecules/controls/controls'
import Overlay from '../molecules/overlay/overlay'
import styles from './feed.module.scss'

interface Post {
  id: string
  imageUrl: string
  createdAt: string
  userId: string
  user: {
    username: string
    image: string
  }
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const scriptElement = document.getElementById('posts-data')
    if (scriptElement && scriptElement.textContent) {
      try {
        const postsData = JSON.parse(scriptElement.textContent) as Post[]
        setPosts(postsData)
      } catch (error) {
        console.error("Error parsing posts data:", error)
        setPosts([])
      }
    }
  }, [])

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  }

  return (
    <div className={styles.feedwraper}>
      <Controls />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {posts.map((post) => (
          <Overlay
            key={post.id}
            triggerButton={
              <div className={styles.gridItem}>
                <motion.img
                  whileTap={{ opacity: 0.6 }}
                  initial={{ opacity: 0.6, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{duration: 0.3}}
                  src={post.imageUrl}
                  alt={`Image by ${post.user.username}`}
                  draggable="false"
                />
                <div className={styles.creator}>
                  <img
                    src={post.user.image}
                    draggable="false"
                    className={styles.avatar}
                    alt={`Avatar of ${post.user.username}`}
                  />
                  <div className={styles.creatorname}>
                    {post.user.username}
                    <Icon name="verified" size={10} />
                  </div>
                </div>
              </div>
            }
            overlayContent={
              <>
                <img
                  src={post.imageUrl}
                  draggable="false"
                  className={styles.selectedImage}
                  alt={`Image by ${post.user.username}`}
                />
                <div className={styles.creatorwraper}>
                  <div className={styles.creator}>
                    <img
                      src={post.user.image}
                      draggable="false"
                      loading="lazy"
                      className={styles.avatar}
                      alt={`Avatar of ${post.user.username}`}
                    />
                    <Link href={`/${post.user.username}`} className={styles.creationdetails}>
                      <h2 className={styles.subheading}>Inspiration by</h2>
                      <p className={styles.username}>
                        {post.user.username}
                        <Icon name="verified" size={10} />
                      </p>
                    </Link>
                  </div>
                </div>
              </>
            }
          />
        ))}
      </Masonry>
    </div>
  )
}