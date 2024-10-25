"use client"

import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import styles from '../../atoms/feed.module.scss'

interface OverlayProps {
  triggerButton: React.ReactNode
  overlayContent: React.ReactNode
}

export default function Overlay({ triggerButton, overlayContent }: OverlayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef = useRef(null)

  useClickAway(overlayRef, () => {
    if (isOpen) setIsOpen(false)
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{background: 'none', textDecoration: 'none', backgroundColor: 'none', width: '100%'}} className={styles.feedbtn}>{triggerButton}</button>
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
              <div className={styles.overlayContent} ref={overlayRef}>{overlayContent}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}