import React from 'react'
import styles from './home.module.scss'
import Link from 'next/link'
import NavBar from '@/components/navbar/navbar'
import BrowserLayout from '@/components/layouts/browserlayout/browserlayout'
import DisplayLayout from '@/components/layouts/displaylayout/displaylayout'

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <BrowserLayout />
                <DisplayLayout />
            </div>
        </div>
    )
}

export default Home
