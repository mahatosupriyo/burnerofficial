import React from 'react'
import styles from '../inspo.module.scss'
import Feed from '@/components/atoms/feed'
import NavBar from '@/components/navbar/navbar'
import ResourcesPostsFetcher from './resourcesfetcher'

export default async function ResourcesPage() {


    return (
        <div className={styles.displaycontainer}>
            <NavBar/>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <ResourcesPostsFetcher />
                    <Feed />
                </div>
            </section>
        </div>
    )
}