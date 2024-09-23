"use client"
import React from 'react'
import styles from './dashboard.module.scss'
import Feed from '@/components/atoms/feed'

const Dashboard = () => {
    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>

                <div className={styles.header}>
                    <h1 className={styles.headingtxt}>inspiration</h1>
                    <Feed/>
                </div>

            </section>
        </div>
    )
}

export default Dashboard