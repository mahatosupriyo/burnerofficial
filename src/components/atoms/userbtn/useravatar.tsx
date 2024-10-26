import React from 'react'
import Link from 'next/link'
import styles from './userbtn.module.scss'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getAvatarUrl } from '@/app/actions/avatar'


export default async function UserAvatar(){ 
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

    const avatarUrl = await getAvatarUrl(session.user.image || 'defaultavatar.png')

    return (
        <div style={{borderRadius: '100rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {session.user ? (
                <div draggable="false" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {user.image ? (
                        <img
                            src={avatarUrl || session.user.image || 'avatarUrl.png'}
                            alt={user.name || 'User avatar'}
                            draggable="false"
                            className={styles.avatar}
                        />

                    ) : (
                        <img
                            src={session.user.image || 'avatar.png'}
                        />
                    )}
                </div>
            ) : (
                <Link href="/auth" className={styles.btn}>Login</Link>
            )}
        </div>
    )
}



