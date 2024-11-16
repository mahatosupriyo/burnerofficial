"use client";

import React from 'react'
import styles from './editprofilenav.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation';


const EditProfileNav = () => {
    const pathname = usePathname();
    return (
        <div className={styles.formsnavwraper}>
            <div className={styles.nav}>
                <Link
                    href="/settings/editprofile"
                    className={`${pathname === '/settings/editprofile' ? styles.active : styles.link}`}
                >
                    Account
                </Link>
                <Link
                    href="/settings/editprofile/about"
                    className={`${pathname === '/settings/editprofile/about' ? styles.active : styles.link}`}
                >
                    Personal
                </Link>
            </div>

        </div>
    )
}

export default EditProfileNav
