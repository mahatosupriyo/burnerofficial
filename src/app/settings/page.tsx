import React from 'react'
import styles from './settings.module.scss'

import NavBar from '@/components/navbar/navbar'
import SettingsLayout from '@/components/layouts/settings/settings'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

const Settings = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <SettingsLayout/>
            </div>
        </div>
    )
}

export default Settings
