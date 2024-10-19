"use client";

import React, { useState, useEffect, useRef } from 'react';
import { easeInOut, motion, useAnimation } from 'framer-motion';
import styles from './postcard.module.scss';
import { Tilt } from 'react-tilt';

interface Post {
    id: string;
    imageUrl: string;
}

interface PostCardProps {
    posts: Post[];
}

const TIMER_DURATION = 6000;
const MAX_POSTS = 5;

const defaultOptions = {
    reverse: false,
    max: 15,
    perspective: 1600,
    scale: 1,
    speed: 300,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: false,
    "max-glare": 1,
    gyroscope: true,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45,
    gyroscopeSamples: 10
};

export default function PostCard({ posts }: PostCardProps) {
    const [topPosts, setTopPosts] = useState<Post[]>([]);
    const [currentPost, setCurrentPost] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const controls = useAnimation();
    const timerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        // Get the top 5 posts
        const sortedPosts = [...posts].sort((a, b) => b.id.localeCompare(a.id)).slice(0, MAX_POSTS);
        setTopPosts(sortedPosts);
    }, [posts]);

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        startTimeRef.current = Date.now();

        timerRef.current = window.setInterval(() => {
            const elapsedTime = Date.now() - (startTimeRef.current || 0);
            const newProgress = Math.max(0, 100 - (elapsedTime / TIMER_DURATION) * 100);

            if (newProgress <= 0) {
                clearInterval(timerRef.current!);
                setCurrentPost((prev) => (prev + 1) % topPosts.length);
                startTimer();
            }
        }, 16);
    };

    useEffect(() => {
        if (!isDragging && topPosts.length > 0) {
            startTimer();
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isDragging, currentPost, topPosts]);

    const handleDragStart = () => {
        setIsDragging(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const handleDragEnd = (event: any, info: any) => {
        setIsDragging(false);
        if (info.offset.x < -100) {
            setCurrentPost((prev) => (prev + 1) % topPosts.length);
        } else if (info.offset.x > 100) {
            setCurrentPost((prev) => (prev - 1 + topPosts.length) % topPosts.length);
        }
        controls.start({ x: 0, rotate: 0 });
        startTimer();
    };

    const handleDrag = (event: any, info: any) => {
        const rotation = info.offset.x * 0.1;
        controls.start({ rotate: rotation });
    };

    if (topPosts.length === 0) {
        return <div className={styles.noPostsMessage}>No posts available</div>;
    }

    const currentImage = topPosts[currentPost]?.imageUrl || '/placeholder.svg?height=400&width=600';

    return (
        <main className={styles.main}>
            <div className={styles.postContent}>
                <h2 className={styles.subtitle}>Featured creations</h2>
            </div>

            <Tilt options={defaultOptions}>
                <motion.div
                    className={styles.draggablePost}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.1}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    whileTap={{ scale: 1.03 }}
                    transition={easeInOut}
                >
                    <img
                        draggable="false"
                        src={currentImage}
                        alt={`Creation ${currentPost + 1}`}
                        className={styles.creation}
                    />
                </motion.div>
            </Tilt>

            <div className={styles.postIndicators}>
                {topPosts.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.indicator} ${index === currentPost ? styles.active : ''}`}
                        onClick={() => setCurrentPost(index)}
                    />
                ))}
            </div>
        </main>
    );
}