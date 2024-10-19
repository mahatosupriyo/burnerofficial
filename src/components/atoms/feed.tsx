'use client';

import styles from './feed.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { useClickAway } from 'react-use';
import Link from 'next/link';
import Icon from './icons';

interface Post {
  id: string;
  imageUrl: string;
  createdAt: string;
  userId: string;
  user: {
    username: string;
    image: string;
  };
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Post | null>(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const scriptElement = document.getElementById('posts-data');
    if (scriptElement && scriptElement.textContent) {
      try {
        const postsData = JSON.parse(scriptElement.textContent) as Post[];
        setPosts(postsData);
      } catch (error) {
        console.error("Error parsing posts data:", error);
        setPosts([]);
      }
    }
  }, []);

  const toggleOverlay = (post: Post) => {
    setSelectedImage(post);
    setIsOpen(true);
  };

  useClickAway(overlayRef, () => {
    if (isOpen) setIsOpen(false);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
  };

  return (
    <div className={styles.feedwraper}>
      <AnimatePresence>
        {isOpen && selectedImage && (
          <>
            <motion.div
              className={styles.backgroundOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className={styles.overlayContainer}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.14 }}
            >
              <div className={styles.overlayContent} ref={overlayRef}>
                <img
                  src={selectedImage.imageUrl}
                  draggable="false"
                  className={styles.selectedImage}
                  alt={`Image by ${selectedImage.user.username}`}
                />
                <div className={styles.creatorwraper}>
                  <div className={styles.creator}>
                    <img
                      src={selectedImage.user.image}
                      draggable="false"
                      loading="lazy"
                      className={styles.avatar}
                      alt={`Avatar of ${selectedImage.user.username}`}
                    />
                    <Link href={`/user/${selectedImage.user.username}`} className={styles.creationdetails}>
                      <h2 className={styles.subheading}>Inspiration by</h2>
                      <p className={styles.username}>
                        {selectedImage.user.username}
                        <Icon name="verified" size={10} />
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryGridColumn}
      >
        {posts.map((post) => (
          <motion.button
            key={post.id}
            className={styles.feedbtn}
            onClick={() => toggleOverlay(post)}
            whileTap={{ opacity: 0.6 }}
          >
            <div className={styles.gridItem}>
              <img
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
          </motion.button>
        ))}
      </Masonry>
    </div>
  );
};

export default Feed;