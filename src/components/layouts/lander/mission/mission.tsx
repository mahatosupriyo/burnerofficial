'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './mission.module.scss'

export default function TextHighlightScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center center"]
  })

  const words = [
    'the', 'path', 'to', 'great', 'design', 'starts', 'with', 'ambition.',
    'we', 'believe', 'those', 'who', 'dare', 'to', 'create,', 'deserve',
    'the', 'finest', 'inspirations,', 'community,', 'and', 'opportunities',
    'to', 'thrive.'
  ]

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <p style={{fontSize: '1.16rem', opacity: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2rem'}}>Make your story live</p>
        <motion.p
          initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false }}
          className={styles.mission}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              className={styles.word}
              style={{
                color: useTransform(
                  scrollYProgress,
                  [i / words.length, (i + 1) / words.length],
                  ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 1)"]
                )
              }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </div>
  )
}