import React from 'react'
import styles from './dashboard.module.scss'
import Feed from '@/components/atoms/feed'
import PostsFetcher from '@/components/atoms/postfetcher'

export default async function Dashboard() {

    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <PostsFetcher />
                    <Feed/>
                </div>
            </section>
        </div>
    )
}