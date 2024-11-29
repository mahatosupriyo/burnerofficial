import React from 'react'
import styles from '../inspo.module.scss'
import Feed from '@/components/atoms/feed'
import NavBar from '@/components/navbar/navbar'
import UIPostsFetcher from './uifetcher'

export default async function UIPage() {


    return (
        <div className={styles.displaycontainer}>
            <NavBar/>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <UIPostsFetcher />
                    <Feed />
                </div>
            </section>
        </div>
    )
}