import React from 'react'
import Link from 'next/link'
import styles from './userbtn.module.scss'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getAvatarUrl } from '@/app/actions/avatar'

export default async function UserBtn() {
    const session = await auth()

    if (!session || !session.user) {
        redirect("/auth")
    }

    if (!session.user.email) {
        throw new Error("User email is missing")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { name: true, email: true, image: true, username: true },
    })

    if (!user) {
        throw new Error("User not found")
    }

  const avatarUrl = await getAvatarUrl(session.user.image || 'defaultavatar.png')

    return (
        <div>

            {session.user ? (

                <div className={styles.avatarbtn} draggable="false">

                    {user.image ? (
                        <Link className={styles.settingslink} href={`/${user.username}`}>
                            <img
                                src={avatarUrl || session.user.image || 'avatarUrl.png'}
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
    )
}

