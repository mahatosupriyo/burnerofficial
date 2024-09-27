import React from 'react'
import styles from './settings.module.scss'

import NavBar from '@/components/navbar/navbar'
import SettingsLayout from '@/components/layouts/settings/settings'

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <SettingsLayout/>
            </div>
        </div>
    )
}

export default Home
