import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import React from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { redirect } from "next/navigation"
import SearchBox from '../atoms/searchbox/searchbox';
import Icon from "../atoms/icons";

export default async function NavBar() {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/auth")
    }

    if (!session.user.email) {
        throw new Error("User email is missing")
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
                    <Link draggable="false" href="/" className={styles.back}>
                        <Icon name="home" size={16.29} />
                    </Link>
                </div>

                <div style={{ width: '100%' }}>
                    <SearchBox />
                </div>


                <div className={styles.rightwraper}>

                    {session.user ? (

                        <div className={styles.avatarbtn} draggable="false">

                            {user.image ? (
                                <Link className={styles.settingslink} href="/settings">
                                    <img
                                        src={user.image}
                                        alt={user.name || 'User avatar'}
                                        draggable="false"
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
