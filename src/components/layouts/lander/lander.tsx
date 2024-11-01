"use client"
import React from 'react'
import { easeInOut, motion } from 'framer-motion'
import styles from './landing.module.scss'
import Logo from '@/components/base/logo'
import Link from 'next/link'
import SmoothScrolling from '@/components/smoothscroll'
import TextHighlightScroll from './mission/mission'
import Footer from '@/components/footer/footer'

const Lander = () => {
    return (
        <>
            <SmoothScrolling>
                <div className={styles.wraper}>

                    <motion.div
                        className={styles.nav}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 813 227" fill="#fff">
                            <path d="M0 0H209V110.5L104.5 221H0V0Z" />
                            <path d="M218 0H316.5C377.527 0 427 49.4725 427 110.5C427 171.527 377.527 221 316.5 221H218V0Z" />
                            <path d="M645 0V122.5C645 180.214 598.214 227 540.5 227C482.786 227 436 180.214 436 122.5V0H645Z" />
                        </svg>

                        <div className={styles.buttons}>
                            <Link
                                href="/auth"
                                className={styles.loginbtn}>
                                Get started
                            </Link>
                        </div>

                    </motion.div>

                    <div className={styles.container}>

                        <header className={styles.header}>
                            <div className={styles.headercontent}>
                                <motion.h1
                                    initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    className={styles.title}
                                >
                                    Launchpad for Designers.
                                </motion.h1>
                                <motion.h4
                                    initial={{ opacity: 0, y: '2%' }}
                                    animate={{ opacity: 0.6, y: 0 }}
                                    className={styles.subtitle}
                                    transition={{ delay: 0.1 }}
                                >
                                    Learn, create, and inspire — this is your Stage.
                                </motion.h4>
                            </div>

                            <img
                                src="https://ik.imagekit.io/localstore/inspire.png?updatedAt=1730225224420"
                                draggable="false"
                                width={360}
                            />
                        </header>


                        <section>
                            <TextHighlightScroll />
                        </section>

                    </div>

                    <Footer />

                </div>
            </SmoothScrolling>
        </>
    )
}

export default Lander
