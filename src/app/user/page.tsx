import React from 'react'
import styles from './user.module.scss'
import UserProfile from '@/components/layouts/userprofile/userprofile'
import NavBar from '@/components/navbar/navbar'
import { Sitemap } from '@/components/atoms/sitemap/sitemap'

const UserPage = () => {
    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                {/* <UserProfile/> */}
                <Sitemap />
            </div>
        </div>
    )
}

export default UserPage
