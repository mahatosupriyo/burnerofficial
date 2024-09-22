"use client"
import React from 'react'
import styles from './dashboard.module.scss'
import Link from 'next/link'
import ChapterCard from '@/components/molecules/cards/chaptercard/chaptercard'

const Dashboard = () => {
    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>

                <div className={styles.header}>
                    <h1 className={styles.headingtxt}>inspiration</h1>
                </div>

            </section>
        </div>
    )
}

export default Dashboard
