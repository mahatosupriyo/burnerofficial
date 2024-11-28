"use client"
import React from 'react'
import { motion } from 'framer-motion'
import styles from './filter.module.scss'

const InspoFilter = () => {
    return (
        <motion.div
            className={styles.cover}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                cursor: 'pointer',
                marginBottom: '2rem'
            }}>

            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                All
            </motion.button>

            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                UI
            </motion.button>

            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                Poster
            </motion.button>

            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                Fonts
            </motion.button>


            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                Editorial
            </motion.button>

            <motion.button
                whileTap={{ opacity: 0.6 }}
                className={styles.chip}>
                Research
            </motion.button>

        </motion.div>
    )
}

export default InspoFilter
