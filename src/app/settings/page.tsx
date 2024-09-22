import React from 'react'
import styles from './settings.module.scss'

import NavBar from '@/components/navbar/navbar'
import DisplayLayout from '@/components/layouts/displaylayout/displaylayout'

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <DisplayLayout />
            </div>
        </div>
    )
}

export default Home
