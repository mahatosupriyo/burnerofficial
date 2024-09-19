'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './faq.module.scss'

type FAQItem = {
  question: string
  answer: string
}

type FAQProps = {
  data: FAQItem[]
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter(i => i !== index)
        : [...prevOpenItems, index]
    )
  }

  return (
    <div className={styles.faqContainer}>
      {data.map((item, index) => (
        <motion.div 
          key={index} 
          className={styles.faqItem}
          initial={false}
          animate={openItems.includes(index) ? "open" : "closed"}
          data-state={openItems.includes(index) ? "open" : "closed"}
        >
          <motion.button
            className={styles.faqQuestion}
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.includes(index)}
            aria-controls={`faq-answer-${index}`}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
            whileTap={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          >
            <span>{item.question}</span>
            <motion.div
              variants={{
                open: { rotate: 360 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <ChevronDown className={styles.chevron} />
            </motion.div>
          </motion.button>
          <AnimatePresence initial={false}>
            {openItems.includes(index) && (
              <motion.div 
                key={`answer-${index}`}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div 
                  className={styles.faqAnswer}
                  id={`faq-answer-${index}`}
                >
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

export default FAQ
