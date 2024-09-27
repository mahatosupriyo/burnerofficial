"use client"
import React from 'react'
import styles from './settingslayout..module.scss'
import { useSession } from "next-auth/react"
import UpdateUsernameForm from '@/components/atoms/account/username/updateusernameform'
import { SignOut } from '@/components/base/auth/signoutbtn'

const SettingsLayout = () => {
    const { data: session, status } = useSession()

    const getFirstName = (name: string | null | undefined) => {
        if (!name) return ''
        return name.split(' ')[0]
    }

    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>


                {status === 'authenticated' && session?.user ? (

                    <div className={styles.usersessiondata}>

                        {session.user.image ? (
                            <img
                                src={session.user.image} draggable="false"
                                className={styles.avatar}
                            />
                        ) : (
                            <div className={styles.avatarFallback}>
                                {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                            </div>
                        )}

                        <div className={styles.header}>
                            <h1 className={styles.pagehead}>
                                Account settings
                            </h1>
                            <p className={styles.subhead}>
                                Add more information about you here.
                            </p>
                        </div>

                        <div className={styles.userdata}>
                            <p className={styles.email}>
                                {session.user.email}
                            </p>
                        </div>

                        <UpdateUsernameForm />


                        <div className={styles.dangerzone}>
                            <SignOut />
                        </div>


                    </div>
                ) : (
                    <a href="/api/auth/signin">Sign in</a>
                )}

            </div>
        </div>
    )
}

export default SettingsLayout
