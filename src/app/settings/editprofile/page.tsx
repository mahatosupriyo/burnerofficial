import React from 'react'
import styles from './editprofile.module.scss'

import NavBar from '@/components/navbar/navbar'
import EditProfileLayout from '@/components/layouts/settings/editprofile/editprofilelayout'

const EditProfile = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <EditProfileLayout/>
            </div>
        </div>
    )
}

export default EditProfile
