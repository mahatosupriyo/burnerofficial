import React from 'react'
import Link from 'next/link'
import styles from './chaptercard.module.scss'
import { motion } from 'framer-motion'

interface ChapterCardProps {
    href: string;
    banner: string;
    label: string;
    sublabel: string;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ href, label, banner, sublabel }) => {
    return (
        <Link
            href={href}
            draggable="false"
            className={styles.bannercontainer}
        >
            <img src={banner} draggable="false" className={styles.banner} loading='lazy' />

            <div className={styles.extradetails}>
                <h3 className={styles.titlebanner}>{label}</h3>
                <p className={styles.shortchip}>{sublabel}</p>
            </div>
        </Link>
    )
}

export default ChapterCard;
