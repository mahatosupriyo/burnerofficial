"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import styles from "./test.module.scss"

const cuisines = [
  "Mexican",
  "Italian",
  "Chinese",
  "Japanese",
  "Indian",
  "Greek",
  "French",
  "Spanish",
  "Turkish",
  "Lebanese",
  "Vietnamese",
  "Korean",
  "Argentinian",
  "Peruvian",
  "Ethiopian",
  "Nigerian",
  "German",
  "British",
  "Irish",
  "Swedish",
  "Danish",
  "Polish",
  "Hungarian",
  "Portuguese",
]

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

export default function CuisineSelector() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleCuisine = (cuisine: string) => {
    setSelected((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>What are your favorite cuisines?</h1>
      <div className={styles.wrapper}>
        <motion.div className={styles.chipGrid} layout transition={transitionProps}>
          {cuisines.map((cuisine) => {
            const isSelected = selected.includes(cuisine)
            return (
              <motion.button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.5)",
                }}
                whileHover={{
                  backgroundColor: isSelected ? "#2a1711" : "rgba(39, 39, 42, 0.8)",
                }}
                whileTap={{
                  backgroundColor: isSelected ? "#1f1209" : "rgba(39, 39, 42, 0.9)",
                }}
                transition={{
                  ...transitionProps,
                  backgroundColor: { duration: 0.1 },
                }}
                className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
              >
                <motion.div
                  className={styles.chipContent}
                  animate={{
                    width: isSelected ? "auto" : "100%",
                    paddingRight: isSelected ? "1.5rem" : "0",
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span>{cuisine}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={transitionProps}
                        className={styles.checkIcon}
                      >
                        <Check strokeWidth={1.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

