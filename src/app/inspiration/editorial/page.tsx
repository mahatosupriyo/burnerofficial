import React from 'react'
import styles from '../inspo.module.scss'
import Feed from '@/components/atoms/feed'
import NavBar from '@/components/navbar/navbar'
import EditorialPostsFetcher from './editorialfetcher'

export default async function EditorialPage() {


    return (
        <div className={styles.displaycontainer}>
            <NavBar/>
            <section className={styles.displaywraper}>
                <div className={styles.header}>
                    <EditorialPostsFetcher />
                    <Feed />
                </div>
            </section>
        </div>
    )
}