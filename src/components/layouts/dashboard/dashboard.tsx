import React from 'react'
import styles from './dashboard.module.scss'
import Feed from '@/components/atoms/feed'
import PostsFetcher from '@/components/atoms/postfetcher'
import Icon from '@/components/atoms/icons'
import Link from 'next/link'

export default async function Dashboard() {


    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <PostsFetcher />
                    <Feed />

                    <div className={styles.lockedcontent}>
                        <Icon name='lock' size={30} />
                        <div className={styles.subwraper}>


                        <Link target='_blank' href="/plans" className={styles.Link}>Subscribe to Pro</Link>
                        
                        <p className={styles.description}>
                            Get unlimited Design Inpirations.
                        </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}