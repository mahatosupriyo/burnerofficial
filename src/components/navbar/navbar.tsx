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
                    <Link href="/" className={styles.back}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backicon} viewBox="0 0 58 58">
                            <path d="M10.8897 57.9907H47.1284C53.1259 57.9907 58 53.1166 58 47.1191V23.9535C58 19.6139 55.8619 15.5552 52.2652 13.1091L36.3927 2.29183C34.2093 0.796981 31.6454 0.00878906 29 0.00878906C26.3546 0.00878906 23.7907 0.796981 21.6073 2.29183L5.73477 13.1091C2.14714 15.5552 0 19.6049 0 23.9535V47.1191C0 53.1166 4.8741 57.9907 10.8716 57.9907H10.8897ZM7.26585 23.9535C7.26585 22.0057 8.22618 20.1937 9.82974 19.0975L25.7023 8.28027C26.6807 7.60985 27.8222 7.25652 29.0091 7.25652C30.1959 7.25652 31.3374 7.60985 32.3158 8.28027L48.1884 19.0975C49.7919 20.1937 50.7523 22.0057 50.7523 23.9535V47.1191C50.7523 49.1213 49.1306 50.7429 47.1284 50.7429H10.8897C8.88753 50.7429 7.26585 49.1213 7.26585 47.1191V23.9535Z" />
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
