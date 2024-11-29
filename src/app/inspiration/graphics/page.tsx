import React from 'react'
import styles from '../inspo.module.scss'
import Feed from '@/components/atoms/feed'
import NavBar from '@/components/navbar/navbar'
import GraphicsPostsFetcher from './graphicsfetcher'

export default async function GraphicsPage() {


    return (
        <div className={styles.displaycontainer}>
            <NavBar/>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <GraphicsPostsFetcher />
                    <Feed />
                </div>
            </section>
        </div>
    )
}