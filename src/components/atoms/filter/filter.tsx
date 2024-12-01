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
                draggable="false"
                href="/academy" className={`${styles.chip} ${pathname === '/series' ? styles.activechip : ''}`}>
                Academy
            </Link>

            <span className={styles.divider}></span>

            <Link
                draggable="false"
                href="/"
                className={`${styles.chip} ${pathname === '/' ? styles.activechip : ''}`}>
                All
            </Link>

            <Link
                draggable="false"
                href="/inspiration/ui"
                className={`${styles.chip} ${pathname === '/inspiration/ui' ? styles.activechip : ''}`}>
                Interfaces
            </Link>

            <Link
                draggable="false"
                href="/inspiration/graphics"
                className={`${styles.chip} ${pathname === '/inspiration/graphics' ? styles.activechip : ''}`}>
                Graphics
            </Link>

            <Link
                draggable="false"
                href="/inspiration/resources"
                className={`${styles.chip} ${pathname === '/inspiration/resources' ? styles.activechip : ''}`}>
                Resources
            </Link>

            <Link
                draggable="false"
                href="/inspiration/editorial"
                className={`${styles.chip} ${pathname === '/inspiration/editorial' ? styles.activechip : ''}`}>
                Editorial
            </Link>

        </motion.div>
    )
}

export default InspoFilter

