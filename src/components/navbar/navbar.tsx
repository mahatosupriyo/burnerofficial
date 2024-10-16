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
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.backicon} viewBox="0 0 58 58" fill="none">
                            <path d="M10.8897 57.9819H47.1284C53.1259 57.9819 58 53.1078 58 47.1103V23.9447C58 19.6051 55.8619 15.5464 52.2652 13.1003L36.3927 2.28304C34.2093 0.788192 31.6454 0 29 0C26.3546 0 23.7907 0.788192 21.6073 2.28304L5.73477 13.1003C2.14714 15.5464 0 19.5961 0 23.9447V47.1103C0 53.1078 4.8741 57.9819 10.8716 57.9819H10.8897ZM7.26585 23.9447C7.26585 21.9969 8.22618 20.1849 9.82974 19.0887L25.7023 8.27148C26.6807 7.60106 27.8222 7.24773 29.0091 7.24773C30.1959 7.24773 31.3374 7.60106 32.3158 8.27148L48.1884 19.0887C49.7919 20.1849 50.7523 21.9969 50.7523 23.9447V47.1103C50.7523 49.1125 49.1306 50.7341 47.1284 50.7341H10.8897C8.88753 50.7341 7.26585 49.1125 7.26585 47.1103V23.9447Z" fill="url(#paint0_linear_2927_69)" />
                            <defs>
                                <linearGradient id="paint0_linear_2927_69" x1="-10.4722" y1="44.1796" x2="69.4582" y2="39.4286" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#AFA7A1" />
                                    <stop offset="0.34243" stop-color="#FE4200" />
                                    <stop offset="0.806666" stop-color="#FF805B" />
                                    <stop offset="1" stop-color="#98B7C0" />
                                </linearGradient>
                            </defs>
                        </svg>
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
