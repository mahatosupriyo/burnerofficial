"use client"
import React from 'react'
import { easeInOut, motion } from 'framer-motion'
import styles from './landing.module.scss'
import Logo from '@/components/base/logo'
import Link from 'next/link'
import animationData from '../../../../public/lotties/learn.json'
import TextHighlightScroll from './mission/mission'
import Footer from '@/components/footer/footer'
import Lottie from 'lottie-react'

const Lander = () => {
    return (
        <>
            {/* <SmoothScrolling> */}
            <div className={styles.wraper}>

                <motion.div
                    className={styles.nav}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"  height="26" viewBox="0 0 282 100" fill="none">
                        <path d="M0.533203 0.316406H91.5694V48.448L46.0513 96.5796H0.533203V0.316406Z" fill="white" />
                        <path d="M95.4896 0.316406H138.394C164.977 0.316406 186.526 21.8657 186.526 48.448C186.526 75.0303 164.977 96.5796 138.394 96.5796H95.4896V0.316406Z" fill="white" />
                        <path d="M281.482 0.316406V53.675C281.482 78.8139 261.103 99.1931 235.964 99.1931C210.825 99.1931 190.446 78.8139 190.446 53.675V0.316406H281.482Z" fill="white" />
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

                            <motion.div
                                initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: 0.6 }}

                            >
                                <Link
                                    href="/auth"
                                    className={styles.ctabtn}>
                                    Get started
                                </Link>
                            </motion.div>
                        </div>
                    </header>

                    <TextHighlightScroll />

                    <section className={styles.featuressection}>
                        <div className={styles.feature}>
                            <div className={styles.featurebanner}>

                                <Lottie
                                    className={styles.banner}
                                    animationData={animationData} style={{ width: '100%', padding: '4rem', boxSizing: 'border-box' }} autoplay />
                            </div>
                        </div>
                    </section>

                </div>

                <Footer />

            </div>
            {/* </SmoothScrolling> */}
        </>
    )
}

export default Lander
