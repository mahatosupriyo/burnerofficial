"use client"
import React from 'react'
import { motion } from 'framer-motion'
import styles from './landing.module.scss'
import Logo from '@/components/base/logo'
import Link from 'next/link'

const Lander = () => {
    return (
        <div className={styles.wraper}>
            <div className={styles.container}>
                <Logo width='80' />
                <header className={styles.header}>
                    <div className={styles.headercontent} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '4rem' }}>
                        <h1 className={styles.title} style={{ fontSize: '10rem', maxWidth: '100%', lineHeight: '110%', fontWeight: 800, textAlign: 'center' }}>
                            Great designers aren’t taught, they’re made here.
                        </h1>
                        <h4 style={{ fontSize: '2.4rem', maxWidth: '60%', opacity: 0.5, fontWeight: 500, textAlign: 'center' }}>
                            we don’t teach design — we help you live it.
                            <br />
                        </h4>
                    </div>

                    <div className={styles.subwraper}>
                        <Link href="/auth" className={styles.ctabutton}>
                            <div className={styles.innercontent}>
                                Get started for free
                            </div>
                        </Link>
                    </div>
                </header>

            </div>

        </div>
    )
}

export default Lander
