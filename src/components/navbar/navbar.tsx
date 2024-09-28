import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import React from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import Logo from '../base/logo';
import { redirect } from "next/navigation"
import SearchBox from '../atoms/searchbox/searchbox';

export default async function NavBar() {
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
        <div className={styles.navwraper}>
            <div className={styles.nav}>

                <div className={styles.leftwraper}>
                    <Logo width='66' />
                    <Link href="/" className={styles.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107 107" className={styles.backicon}>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.2 70.7217L48.9466 54.7883L64.1028 38.7578L60.1195 34.7744L40.6885 54.6912L60.0223 74.8994L64.2 70.7217Z" />
                        </svg>
                    </Link>
                </div>

                <SearchBox />


                <div className={styles.rightwraper}>

                    {session.user ? (

                        <div className={styles.avatarbtn} draggable="false">

                            {user.image ? (
                                <Link className={styles.settingslink} href="/settings">
                                    <img
                                        src={session.user.image} draggable="false"
                                        className={styles.avatar}
                                    />
                                </Link>

                            ) : (
                                <div className={styles.avatarFallback}>
                                    {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth" className={styles.btn}>Login</Link>
                    )}

                </div>


            </div>
        </div>
    );
}
