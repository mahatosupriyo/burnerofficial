import React from 'react'
import styles from './editprofilelayout.module.scss'
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import EditProfileForm from './editdataform/editdataform'
import Link from 'next/link'

export default async function EditProfileLayout() {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/auth")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { name: true, email: true, username: true, lastUsernameUpdate: true },
    })

    if (!user || !user.name || !user.email || !user.username) {
        throw new Error("User not found or missing required fields")
    }

    const formInitialData = {
        name: user.name,
        email: user.email,
        username: user.username,
    }

    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>
                <div className={styles.topbuttonwraper}>
                    <Link href="/settings" className={styles.backbtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backicon} viewBox="0 0 107 107" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.2 70.7217L48.9466 54.7883L64.1028 38.7578L60.1195 34.7744L40.6885 54.6912L60.0223 74.8994L64.2 70.7217Z" fill="white" />
                        </svg>
                    </Link>
                </div>

                <div className={styles.layoutwraper}>
                    <h1 className={styles.pagehead}>
                        Edit Profile
                    </h1>
                    <p className={styles.description}>Update your account data</p>
                </div>

                <div className={styles.formlayout}>
                    <EditProfileForm initialData={formInitialData} />
                </div>

            </div>
        </div>
    )
}