"use client"
import React from 'react'
import styles from './navbar.module.scss'
import Logo from '@/components/base/logo'
import { motion } from 'framer-motion'
import Link from 'next/link'

const NavBar = () => {
    return (
        <>
            <div className={styles.navwraper}>
                <div className={styles.nav}>

                    <Logo height='22' fill='#fafafa' />


                    <Link
                        className={styles.avatarbtn}
                        href="/auth"
                    >
                        <img
                            src="https://iili.io/JPcXRyu.png"
                            draggable="false"
                            className={styles.avatar}
                        />
                    </Link>

                </div>
            </div>
        </>
    )
}

export default NavBar;
