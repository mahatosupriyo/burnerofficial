"use client"
import React, { useState, useEffect, useRef } from 'react'
import { color, motion, useAnimation } from 'framer-motion'
import styles from './banner.module.scss'

const posts = [
    {
        id: 1,
        title: "Collaboration Secrets",
        subtitle: "BEHIND THE SCENES",
        image: "https://images.unsplash.com/photo-1727807232404-78c35fd9dd31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "01",
        totalPages: "03",
    },
    {
        id: 2,
        title: "User Experience: The Art of Intuition",
        subtitle: "DESIGN PRINCIPLES",
        image: "https://images.unsplash.com/photo-1728356454433-8b11b5c0c917?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "02",
        totalPages: "03",
    },
    {
        id: 3,
        title: "From Concept to Launch : A Journey",
        subtitle: "PRODUCT DEVELOPMENT",
        image: "https://plus.unsplash.com/premium_photo-1728566648330-7ba0d675f3c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2N3x8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "03",
        totalPages: "03",
    },
]

const TIMER_DURATION = 6000

export default function PostCard() {
    const [currentPost, setCurrentPost] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const controls = useAnimation()
    const timerRef = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        startTimeRef.current = Date.now()

        timerRef.current = window.setInterval(() => {
            const elapsedTime = Date.now() - (startTimeRef.current || 0)
            const newProgress = Math.max(0, 100 - (elapsedTime / TIMER_DURATION) * 100)

            if (newProgress <= 0) {
                clearInterval(timerRef.current!)
                setCurrentPost((prev) => (prev + 1) % posts.length)
                startTimer()
            }
        }, 16)
    }


    useEffect(() => {
        if (!isDragging) {
            startTimer()
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [isDragging, currentPost])

    const handleDragStart = () => {
        setIsDragging(true)
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
    }

    const handleDragEnd = (event: any, info: any) => {
        setIsDragging(false)
        if (info.offset.x < -100) {
            setCurrentPost((prev) => (prev + 1) % posts.length)
        } else if (info.offset.x > 100) {
            setCurrentPost((prev) => (prev - 1 + posts.length) % posts.length)
        }
        controls.start({ x: 0, rotate: 0 })
        startTimer()
    }

    const handleDrag = (event: any, info: any) => {
        const rotation = info.offset.x * 0.1
        controls.start({ rotate: rotation })
    }

    return (


        <main className={styles.main}>

            <div className={styles.postContent}>
                <h2 className={styles.subtitle}>Featured creations</h2>
            </div>

            <motion.div
                className={styles.draggablePost}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                dragElastic={0.4}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                animate={controls}
            >
                <img
                    draggable="false"
                    src={posts[currentPost].image}
                    className={styles.creation}
                />
            </motion.div>

            <div className={styles.postInfo}>
                <div style={{width: '5rem'}}>{posts[currentPost].pageNumber} — {posts[currentPost].totalPages} </div> <span style={{ paddingLeft: '1rem', fontWeight: 600 }}>Drag to change</span>
            </div>
        </main>


    )
}