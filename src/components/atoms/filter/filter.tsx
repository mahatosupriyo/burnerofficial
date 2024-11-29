"use client"
import React from 'react'
import { motion } from 'framer-motion'
import styles from './filter.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const InspoFilter = () => {
    const pathname = usePathname()

    return (
        <motion.div
            className={styles.cover}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                cursor: 'pointer',
            }}>

            <Link
                href="/"
                className={`${styles.chip} ${pathname === '/' ? styles.activechip : ''}`}>
                All
            </Link>

            <Link
                href="/inspiration/ui"
                className={`${styles.chip} ${pathname === '/inspiration/ui' ? styles.activechip : ''}`}>
                UI
            </Link>

            <Link
                href="/inspiration/graphics"
                className={`${styles.chip} ${pathname === '/inspiration/graphics' ? styles.activechip : ''}`}>
                Graphics
            </Link>

            <Link
                href="/inspiration/resources"
                className={`${styles.chip} ${pathname === '/inspiration/resources' ? styles.activechip : ''}`}>
                Resources
            </Link>

            <Link
                href="/inspiration/editorial"
                className={`${styles.chip} ${pathname === '/inspiration/editorial' ? styles.activechip : ''}`}>
                Editorial
            </Link>

        </motion.div>
    )
}

export default InspoFilter

