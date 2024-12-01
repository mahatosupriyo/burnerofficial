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
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Account Data',
};

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


                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'row',
                                gap: '2rem',

                                fontSize: '1.56rem',
                                fontWeight: 600
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 60 60" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.81781 43.4454C1.7723 39.4091 0.599609 34.8545 0.599609 30C0.599609 25.1454 1.7723 20.5909 3.81781 16.5545C8.7541 6.73641 18.8723 0 30.5996 0C38.6996 0 45.4632 2.9727 50.6723 7.8273L42.0813 16.4182C38.945 13.4727 35.0177 11.9454 30.5996 11.9454C22.7996 11.9454 16.1723 17.2091 13.7996 24.3C13.1996 26.1 12.845 28.009 12.845 30C12.845 31.9909 13.1996 33.9 13.7996 35.7L13.7641 35.7272H13.7996C16.1723 42.8182 22.7996 48.0818 30.5996 48.0818C34.6359 48.0818 38.045 46.9908 40.7177 45.1908C43.9087 43.0636 46.0359 39.9 46.745 36.1636H30.5996V24.5454H58.8541C59.2086 26.5091 59.3995 28.5545 59.3995 30.6818C59.3995 39.8181 56.1268 47.509 50.4541 52.7454C45.4905 57.3272 38.6996 59.9999 30.5996 59.9999C18.8723 59.9999 8.7541 53.2636 3.81781 43.4727V43.4454Z" fill="white" />
                                <path d="M59 52.5C59 56.6421 55.6421 60 51.5 60C47.3579 60 44 56.6421 44 52.5C44 48.3579 47.3579 45 51.5 45C55.6421 45 59 48.3579 59 52.5Z" fill="black" />
                                <path d="M51.5 45C47.3579 45 44 48.3579 44 52.5C44 56.6421 47.3579 60 51.5 60C55.6421 60 59 56.6421 59 52.5C59 48.3579 55.6421 45 51.5 45ZM54.3125 49.3069L55.6306 50.625L50.5625 55.6931L47.3694 52.5L48.6875 51.1819L50.5625 53.0569L54.3125 49.3069Z" fill="#49E911" />
                            </svg>
                            {user.email}
                        </div>

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
