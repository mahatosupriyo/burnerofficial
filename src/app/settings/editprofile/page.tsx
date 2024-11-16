import React from 'react'
import styles from './editprofile.module.scss'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { getAvatarUrl } from '@/app/actions/avatar'

import NavBar from '@/components/navbar/navbar'
import EditProfileNav from '@/components/layouts/settings/editprofile/editprofilenav/editprofilenav'
import EditProfileForm from '@/components/layouts/settings/editprofile/editdataform/editdataform'
import VerificationRequestForm from '@/components/atoms/verification/resquestform/requestform'
import Icon from '@/components/atoms/icons'

import Link from 'next/link'

export default async function EditProfile() {

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
            verificationStatus: true,
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

    const avatarUrl = await getAvatarUrl(user.image || 'defaultavatar.png')


    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>

                <div className={styles.toplayer}>
                    <div className={styles.layoutwraper}>
                        <h1 className={styles.pagehead}>
                            Edit account
                        </h1>
                        <p className={styles.description}>Add / change information about you here.</p>
                    </div>

                    <div className={styles.formcomponentwraper}>
                        <EditProfileNav />
                        <EditProfileForm
                            initialData={formInitialData}
                        />

                        {user.verificationStatus === 'UNVERIFIED' && (

                            <div className={styles.verifiedlayout}>
                                <div className={styles.toplayer}>
                                    <div className={styles.creatorwraper}>
                                        <div className={styles.creator}>
                                            <p className={styles.username}>{user.username}</p>
                                            <Icon name='verified' size={10} />
                                        </div>
                                    </div>
                                </div>
                                <VerificationRequestForm />
                            </div>
                        )}
                        {user.verificationStatus === 'PENDING' && (
                            <div className={styles.verifiedlayout}>
                                <div className={styles.toplayer}>
                                    <div className={styles.creatorwraper}>
                                        <div className={styles.creator}>
                                            <p className={styles.username}>{user.username}</p>
                                            <Icon name='verified' size={10} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.regulartxt}>We are reviewing your request.</div>
                            </div>
                        )}
                        {user.verificationStatus === 'VERIFIED' && (
                            <div className={styles.verifiedlayout}>
                                <div className={styles.toplayer}>
                                    <div className={styles.creatorwraper}>
                                        <div className={styles.creator}>
                                            <p className={styles.username}>{user.username}</p>
                                            <Icon name='verified' size={10} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.regulartxt}>Enjoy creator benefits. <Link className={styles.link} href={`/${user.username}`}>Add your creations</Link>.</div>
                            </div>

                        )}

                        {user.verificationStatus === 'REJECTED' && (
                            <div className={styles.verifiedlayout}>
                                <div className={styles.toplayer}>
                                    <div className={styles.creatorwraper}>
                                        <div className={styles.creator}>
                                            <p className={styles.username}>{user.username}</p>
                                            <Icon name='verified' size={10} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.regulartxt}>Your verification request is Rejected, update your profile to get verified.</div>
                            </div>
                        )}

                    </div>
                </div>



            </div>
        </div >
    )
}
