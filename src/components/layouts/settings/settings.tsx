import React from 'react'
import styles from './settingslayout..module.scss'
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { SignOut } from '@/components/base/auth/signoutbtn'

export default async function SettingsLayout() {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/auth")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { name: true, email: true, image: true },
    })

    if (!user) {
        throw new Error("User not found")
    }
    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>

                <div className={styles.usersessiondata}>
                    <div
                        className={styles.subwraper}
                    >
                        {user.image ? (
                            <img
                                src={user.image} draggable="false"
                                className={styles.avatar}
                            />
                        ) : (
                            <div className={styles.avatarFallback}>
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                        )}

                    </div>

                    <div
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

                        <SignOut />

                    </div>

                    <div className={styles.userdata}>
                        <p className={styles.email}>
                            {session.user.email}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}
