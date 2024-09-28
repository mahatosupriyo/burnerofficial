'use client'
import React from 'react'
import styles from './settingslayout..module.scss'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { motion } from 'framer-motion'
import SettingsSkeleton from './settingskeleton'

export default function SettingsLayout() {
    const { data: session, status } = useSession()
    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>

                {session?.user ? (

                    <div className={styles.usersessiondata}>
                        <div
                            className={styles.subwraper}
                        >
                            {session.user.image ? (
                                <motion.img
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.9 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    src={session.user.image} draggable="false"
                                    className={styles.avatar}
                                />
                            ) : (
                                <div className={styles.avatarFallback}>
                                    {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                                </div>
                            )}

                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className={styles.header}
                        >

                            <div className={styles.mydata}>
                                <div className={styles.plan}>
                                    <p className={styles.sectionsubhead}>Subscription</p>
                                    <h1 className={styles.sectionhead}>Freemium</h1>
                                </div>

                                <div className={styles.plandetails}>
                                    <button className={styles.btn}>
                                        Subscribe Pro
                                    </button>
                                </div>

                            </div>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Edit account
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>

                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Purchase history
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Contact us
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Delete data
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button onClick={() => signOut()} className={styles.logoutbtn} style={{ margin: '1rem 0rem' }}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Logout
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                        </motion.div>

                        <div className={styles.userdata}>
                            <p className={styles.email}>
                                {session.user.email}
                            </p>
                        </div>

                    </div>
                ) : (
                    <SettingsSkeleton/>
                )}

            </div>
        </div>
    )
}
