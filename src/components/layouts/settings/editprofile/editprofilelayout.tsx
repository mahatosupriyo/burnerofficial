import React from 'react'
import styles from './editprofilelayout.module.scss'
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { SignOut } from '@/components/base/auth/signoutbtn'
import Link from 'next/link'
import EditProfileForm from './editdataform/editdataform'

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
                <div className={styles.layoutwraper}>
                    <h1 className={styles.pagehead}>
                        Edit Account
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