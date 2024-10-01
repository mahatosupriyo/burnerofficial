import React from 'react'
import styles from './user.module.scss'
import UserProfile from '@/components/layouts/userprofile/userprofile'
import NavBar from '@/components/navbar/navbar'

const UserPage = () => {
    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <UserProfile/>
            </div>
        </div>
    )
}

export default UserPage
