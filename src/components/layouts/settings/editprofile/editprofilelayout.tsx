import React from 'react'
import styles from './editprofilelayout.module.scss'
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import EditProfileForm from './editdataform/editdataform'
import Link from 'next/link'
import { getAvatarUrl } from '@/app/actions/avatar'
import AvatarUpload from "@/components/atoms/uploadavatar/uploadavatar"
import UpdateAboutForm from '../editabout/editaboutform'

export default async function EditProfileLayout() {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/auth")
    }

    if (!session.user.email) {
        throw new Error("User email is missing")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            name: true,
            email: true,
            username: true,
            lastUsernameUpdate: true,
            image: true,
            lastImageUpdate: true,
            about: {
                select: {
                    about: true,
                    location: true,
                    work: true,
                    instagram: true,
                    behance: true,
                    x: true,
                    linkedin: true,
                    youtube: true,
                    dribbble: true,
                },
            },
        },
    })

    if (!user || !user.name || !user.email || !user.username) {
        throw new Error("User not found or missing required fields")
    }


    const formInitialData = {
        name: user.name,
        email: user.email,
        username: user.username,
    }

    // socialmedia form data
    const socialMediaInitialData = Array.isArray(user.about) && user.about.length > 0 ? user.about[0] : {};



    const avatarUrl = await getAvatarUrl(user.image || 'defaultavatar.png')

    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>
                <div className={styles.topbuttonwraper}>
                    <Link href="/settings" className={styles.backbtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backicon} viewBox="0 0 107 107" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M64.2 70.7217L48.9466 54.7883L64.1028 38.7578L60.1195 34.7744L40.6885 54.6912L60.0223 74.8994L64.2 70.7217Z" fill="white" />
                        </svg>
                    </Link>
                </div>

                <div className={styles.layoutwraper}>
                    <h1 className={styles.pagehead}>
                        Edit account
                    </h1>
                    <p className={styles.description}>Update your account data</p>
                </div>

                <div style={{ width: '100%', maxWidth: '70rem', padding: '0rem 0rem 4rem 0rem', display: 'flex', alignItems: 'flex-start' }}>
                    <AvatarUpload currentAvatar={avatarUrl} lastImageUpdate={user.lastImageUpdate} />
                </div>

                <div className={styles.formlayout}>
                    <EditProfileForm
                        initialData={formInitialData}
                    />

                    <UpdateAboutForm userId={session.user.id} initialData={socialMediaInitialData} />

                </div>

            </div>
        </div>
    )
}