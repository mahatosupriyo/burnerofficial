"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './banner.module.scss'
import { Tilt } from 'react-tilt'


const posts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1727807232404-78c35fd9dd31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "01",
        totalPages: "03",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1728356454433-8b11b5c0c917?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "02",
        totalPages: "03",
    },
    {
        id: 3,
        image: "https://plus.unsplash.com/premium_photo-1728566648330-7ba0d675f3c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2N3x8fGVufDB8fHx8fA%3D%3D",
        pageNumber: "03",
        totalPages: "03",
    },
]

const TIMER_DURATION = 6000

const defaultOptions = {
    reverse:                false,  // reverse the tilt direction
    max:                    15,     // max tilt rotation (degrees)
    startX:                 0,      // the starting tilt on the X axis, in degrees.
    startY:                 0,      // the starting tilt on the Y axis, in degrees.
    perspective:            1600,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:                  1,      // 2 = 200%, 1.5 = 150%, etc..
    speed:                  300,    // Speed of the enter/exit transition
    transition:             true,   // Set a transition on enter/exit.
    axis:                   null,   // What axis should be enabled. Can be "x" or "y".
    reset:                  false,   // If the tilt effect has to be reset on exit.
    "reset-to-start":       false,   // Whether the exit reset will go to [0,0] (default) or [startX, startY]
    easing:                 "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    glare:                  false,  // if it should have a "glare" effect
    "max-glare":            1,      // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
    "glare-prerender":      false,  // false = VanillaTilt creates the glare elements for you, otherwise
                                    // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
    "mouse-event-element":  null,   // css-selector or link to an HTML-element that will be listening to mouse events
    "full-page-listening":  false,  // If true, parallax effect will listen to mouse move events on the whole document, not only the selected element
    gyroscope:              true,   // Boolean to enable/disable device orientation detection,
    gyroscopeMinAngleX:     -45,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
    gyroscopeMaxAngleX:     45,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
    gyroscopeMinAngleY:     -45,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
    gyroscopeMaxAngleY:     45,     // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
    gyroscopeSamples:       10      
}

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
                >
                    <img
                        draggable="false"
                        src={posts[currentPost].image}
                        className={styles.creation}
                    />
                </motion.div>

            </Tilt>


            <div className={styles.postInfo}>
                <div style={{ width: '5rem' }}>{posts[currentPost].pageNumber} — {posts[currentPost].totalPages} </div> <span style={{ paddingLeft: '1rem', fontWeight: 600 }}>Drag to change</span>
            </div>
        </main>


    )
}