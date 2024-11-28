"use client"

import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Icon from './icons'
import Overlay from '../molecules/overlay/overlay'
import styles from './feed.module.scss'
import Avatar from './avatar'
import InspoFilter from './filter/filter'

interface Post {
  id: string
  imageUrl: string
  createdAt: string
  userId: string
  link?: string
  caption?: string
  user: {
    username: string
    image: string
    avatarUrl: string
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {posts.map((post) => (
          <Overlay
            key={post.id}
            triggerButton={
              <motion.div
                whileTap={{ opacity: 0.6 }}
                className={styles.gridItem}>
                <motion.img
                  whileTap={{ opacity: 0.6 }}
                  initial={{ opacity: 0.6, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.3 }}
                  src={post.imageUrl}
                  alt={`Image by ${post.user.username}`}
                  draggable="false"
                />

                <div className={styles.creator}>
                  <Avatar
                    src={post.user.avatarUrl}
                    size={32}
                  />
                  <div className={styles.creatorname}>
                    {post.user.username}
                    <Icon name="verified" size={10} />
                  </div>
                </div>
              </motion.div>
            }
            overlayContent={
              <>
                <img
                  src={post.imageUrl}
                  draggable="false"
                  className={styles.selectedImage}
                  alt={`Image by ${post.user.username}`}
                />
                {post.caption && <p className={styles.caption}>{post.caption}</p>}
                <div className={styles.creatorwraper}>
                  <div className={styles.creator}>
                    <Avatar
                      src={post.user.avatarUrl}
                      size={42}
                    />


                    <Link href={`/${post.user.username}`} className={styles.creationdetails}>
                      <h2 className={styles.subheading}>Inspiration by</h2>
                      <p className={styles.username}>
                        {post.user.username}
                        <Icon name="verified" size={10} />
                      </p>
                    </Link>
                  </div>
                  {post.link &&
                    <a href={post.link} target='_blank' className={styles.link}>
                      <Icon name='link' fill='#fff' size={26} />
                    </a>
                  }
                </div>
              </>
            }
          />
        ))}
      </Masonry>
    </div>
  )
}