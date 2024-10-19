// 'use client';

// import styles from './feed.module.scss';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import Masonry from 'react-masonry-css';
// import { useClickAway } from 'react-use';
// import Link from 'next/link';
// import Icon from './icons';

// interface Post {
//   id: string;
//   imageUrl: string;
//   user: {
//     username: string | null; 
//     image: string | null;     
//   };
// }


// interface FeedProps {
//   posts: Post[];
// }

// const Feed = ({ posts }: FeedProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<Post | null>(null);
//   const overlayRef = useRef(null);

//   const toggleOverlay = (post: Post) => {
//     setSelectedImage(post);
//     setIsOpen(true);
//   };

//   // Close the overlay when clicking outside of it
//   useClickAway(overlayRef, () => {
//     if (isOpen) setIsOpen(false);
//   });

//   // Close the overlay on "Escape" key press
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('keydown', handleKeyDown);
//     } else {
//       document.removeEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [isOpen]);

//   const breakpointColumnsObj = {
//     default: 4,
//     1100: 2,
//     700: 1,
//     500: 1,
//   };

//   return (
//     <div className={styles.feedwraper}>
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               className={styles.backgroundOverlay}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             />
//             <motion.div
//               className={styles.overlayContainer}
//               initial={{ opacity: 0, scale: 0.99 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.99 }}
//               transition={{ duration: 0.14 }}
//             >
//               <div className={styles.overlayContent} ref={overlayRef}>
//                 {selectedImage && (
//                   <>
//                     <img
//                       src={selectedImage.imageUrl}
//                       draggable="false"
//                       className={styles.selectedImage}
//                     />
//                     <div className={styles.creatorwraper}>
//                       <div className={styles.creator}>
//                         <img
//                           src={selectedImage.user.image || 'avatar.png'}
//                           draggable="false"
//                           loading="lazy"
//                           className={styles.avatar}
//                         />
//                         <Link draggable="false" href="/user" className={styles.creationdetails}>
//                           <h2 className={styles.subheading}>Inspiration by</h2>
//                           <p className={styles.username}>
//                             {selectedImage.user.username || 'annonymous'}
//                             <Icon name="verified" size={10} />
//                           </p>
//                         </Link>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       <Masonry
//         breakpointCols={breakpointColumnsObj}
//         className={styles.masonryGrid}
//         columnClassName={styles.masonryGridColumn}
//       >
//         {posts.map((post) => (
//           <motion.button
//             key={post.id}
//             className={styles.feedbtn}
//             onClick={() => toggleOverlay(post)}
//             whileTap={{ opacity: 0.6 }}
//           >
//             <div className={styles.gridItem}>
//               <img
//                 src={post.imageUrl}
//                 alt={`Image by ${post.user.username}`}
//                 draggable="false"
//               />
//               <div className={styles.creator}>
//                 <img
//                   src={post.user.image || 'defaultavatar.png'}
//                   draggable="false"
//                   className={styles.avatar}
//                 />
//                 <div className={styles.creatorname}>
//                   {post.user.username}
//                   <Icon name="verified" size={10} />
//                 </div>
//               </div>
//             </div>
//           </motion.button>
//         ))}
//       </Masonry>

//       {/* <div className={styles.subscriptionwarning}>
//         <h2 className={styles.headingtxt}>
//           Keep scrolling with new <span className={styles.inspiration}>inspiration</span>.
//         </h2>
//         <p className={styles.subheadingtxt}>
//           Fresh new inspirations every day with Burner Pro.
//         </p>
//         <motion.button
//           className={styles.btn}
//           whileTap={{ opacity: 0.6 }}
//         >
//           Subscribe Pro
//         </motion.button>
//       </div> */}
//     </div>
//   );
// };

// export default Feed;


// // import React from 'react'

// // const Feed = () => {
// //   return (
// //     <div>
// //       this is the feed
// //     </div>
// //   )
// // }

// // export default Feed


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
  user: {
    username: string;
    image: string;
  };
}

interface FeedProps {
  posts: Post[];
}

const Feed = ({ posts }: FeedProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Post | null>(null);
  const overlayRef = useRef(null);

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