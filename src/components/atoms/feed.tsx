"use client";
import styles from './feed.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css'
import { useClickAway } from 'react-use';
import Icon from './icons';
import Link from 'next/link';

const dummyImages = [
"https://images.unsplash.com/photo-1727708248164-73450cd54f43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
"https://images.unsplash.com/photo-1727640567876-6ff5cc64bae2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1727106996914-664944339ea0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDN8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1722882840611-039aa17862da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727618809776-c4d18dcdbd2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjB8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727460198311-b30af35bceb2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTB8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727111544046-d92d85cb4b2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzF8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727409491394-7e90350a5ff9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODh8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1726820233490-ff4e1cf50ce2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMTN8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727086758391-69a5fd7041eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjF8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727440144543-ded882c768c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyODJ8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727341392733-c2646fe7987d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyODR8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727295791537-c7fa8a87e734?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOTZ8fHxlbnwwfHx8fHw%3D",
"https://plus.unsplash.com/premium_photo-1668383198516-1906bbdcfc1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMTZ8fHxlbnwwfHx8fHw%3D",
"https://images.unsplash.com/photo-1727087312697-13997c39c49c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMTR8fHxlbnwwfHx8fHw%3D",
];

const breakpointColumnsObj = {
  default: 4, // 4 columns by default
  1100: 2,    // 3 columns when the screen width is 1100px
  700: 1,     // 2 columns when the screen width is 700px
  500: 1      // 1 column when the screen width is 500px
};

interface ImageDetails {
  url: string;
  creatorName: string;
}

const Feed = () => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);


  // Create a reference for the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Create a reference for the overlay
  const overlayRef = useRef(null);

  const toggleOverlay = (image: ImageDetails) => {
    setSelectedImage(image);
    setIsOpen(!isOpen);
  };

  // Close overlay if click happens outside of it
  useClickAway(overlayRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Close overlay on "Escape" key press
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

  return (
    <div className={styles.feedwraper}>

      <AnimatePresence>
        {isOpen && (
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
                <img src={selectedImage?.url} draggable="false" className={styles.selectedImage} />
                <div className={styles.creatorwraper}>
                  <div className={styles.creator}>
                    <img
                      src="https://middaycdn.s.llnwi.net/Radiocity-images/images/uploads/darshan%20raval%20india%20tour_d.jpg"
                      draggable="false"
                      loading='lazy'
                      className={styles.avatar}
                    />
                    <Link href="/user" className={styles.creationdetails}>
                      <h2 className={styles.subheading}>
                        Inspiration by
                      </h2>
                      <p className={styles.username}>
                        {selectedImage?.creatorName}
                        <Icon name='verified' size={10}/>
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
        {dummyImages.map((image, index) => (
          <motion.button
            className={styles.feedbtn}
            onClick={() => toggleOverlay({ url: image, creatorName: "supriyomahato" })}
            whileTap={{ opacity: 0.6 }}
          >

            <div key={index} className={styles.gridItem}>
              <img src={image} alt={`Image ${index}`} draggable="false" />
              <Link href="/user" className={styles.creator}>
                <img
                  src="https://middaycdn.s.llnwi.net/Radiocity-images/images/uploads/darshan%20raval%20india%20tour_d.jpg"
                  draggable="false"
                  className={styles.avatar}
                />
                <div className={styles.creatorname}>
                  supriyomahato
                  <Icon name='verified' size={10}/>
                </div>

              </Link>
            </div>
          </motion.button>
        ))
        }
      </Masonry >
      <div className={styles.subscriptionwarning}>
        <h2 className={styles.headingtxt}>
          Keep scrolling with new <span className={styles.inspiration}>inspiration</span>.
        </h2>
        <p className={styles.subheadingtxt}>
          fresh new inspirations every day with Burner Pro.
        </p>
        <motion.button
          className={styles.btn}
          whileTap={{ opacity: 0.6 }}
        >
          Subscribe Pro
        </motion.button>
      </div>
    </div >


  );
};

export default Feed;
