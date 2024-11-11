"use client"
import React from 'react'
import { easeInOut, motion } from 'framer-motion'
import styles from './landing.module.scss'
import Logo from '@/components/base/logo'
import Link from 'next/link'
// import SmoothScrolling from '@/components/smoothscroll'
import TextHighlightScroll from './mission/mission'
import Footer from '@/components/footer/footer'

const Lander = () => {
    return (
        <>
            {/* <SmoothScrolling> */}
                <div className={styles.wraper}>

                    <motion.div
                        className={styles.nav}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 645 227" fill="none">
                            <path d="M0 30C0 13.4315 13.4315 0 30 0H179C195.569 0 209 13.4315 209 30V98.5611C209 106.228 206.065 113.604 200.797 119.174L113.377 211.613C107.711 217.605 99.8274 221 91.5804 221H30C13.4315 221 0 207.569 0 191V30Z" fill="white" />
                            <path d="M218 30C218 13.4315 231.431 0 248 0H316.5C377.527 0 427 49.4725 427 110.5C427 171.527 377.527 221 316.5 221H248C231.431 221 218 207.569 218 191V30Z" fill="white" />
                            <path d="M615 0C631.569 0 645 13.4315 645 30V122.5C645 180.214 598.214 227 540.5 227C482.786 227 436 180.214 436 122.5V30C436 13.4315 449.431 0 466 0H615Z" fill="white" />
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
                                <div className={styles.headerlist}>
                                    <motion.h1
                                        initial={{ opacity: 0, y: '2rem', filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{ delay: 0.2 }}
                                        className={styles.title}
                                    >
                                        learn,
                                    </motion.h1>
                                    <motion.h1
                                        initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{ delay: 0.3 }}
                                        className={styles.title}
                                    >
                                        create,
                                    </motion.h1>

                                    <motion.h1
                                        initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                        transition={{ delay: 0.4 }}
                                        className={styles.title}
                                    >
                                        inspire
                                    </motion.h1>
                                </div>

                                <motion.h4
                                    initial={{ opacity: 0, y: '2%' }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={styles.subtitle}
                                    transition={{ delay: 0.5 }}
                                >
                                    Learn Design, build your Portfolio, and Connect with our community — all in one place.
                                </motion.h4>

                                <Link
                                    href="/auth"
                                    className={styles.ctabtn}>
                                    Get started
                                </Link>
                            </div>
                        </header>

                        <TextHighlightScroll />

                        <section>
                        </section>

                    </div>

                    <Footer />

                </div>
            {/* </SmoothScrolling> */}
        </>
    )
}

export default Lander
