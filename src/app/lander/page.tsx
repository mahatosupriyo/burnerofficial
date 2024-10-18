"use client"
import React from 'react'
import { easeInOut, motion } from 'framer-motion'
import styles from './landing.module.scss'
import Logo from '@/components/base/logo'
import Link from 'next/link'
import SmoothScrolling from '@/components/smoothscroll'
import TextHighlightScroll from './mission/mission'

const Lander = () => {
    return (
        <>
            <SmoothScrolling>
                <div className={styles.wraper}>
                    <div className={styles.container}>
                        <motion.div
                            initial={{ opacity: 0, y: '-2%' }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ease: easeInOut, delay: 0.3 }}
                        >
                            <Logo width='80' />
                        </motion.div>
                        <header className={styles.header}>
                            <div className={styles.headercontent} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '4rem' }}>
                                <motion.h1
                                    initial={{ opacity: 0, y: '2%', filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    className={styles.title}
                                    style={{ fontSize: '14rem', maxWidth: '100%', lineHeight: '96%', fontWeight: 500, textAlign: 'center' }}
                                >
                                    Great designers aren’t taught, they’re made here.
                                </motion.h1>
                                <motion.h4
                                    initial={{ opacity: 0, y: '2%' }}
                                    animate={{ opacity: 0.6, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    style={{ fontSize: '1.8rem', maxWidth: '60%', fontWeight: 400, lineHeight: '140%', textAlign: 'center' }}
                                >
                                    From first idea to final masterpiece—your journey starts here.
                                    <br />
                                </motion.h4>
                            </div>

                            <div className={styles.buttons}>
                                <motion.div
                                    initial={{ opacity: 0, y: '5%' }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}

                                    className={styles.subwraper}>
                                    <Link href="/auth" className={styles.ctabutton}>
                                        <div className={styles.innercontent}>
                                            Get started for Free
                                        </div>
                                    </Link>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: '5%' }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className={styles.subwraper}>
                                    <Link href="/auth" className={styles.plansbutton}>
                                        <div className={styles.innercontent}>
                                            See plans
                                        </div>
                                    </Link>
                                </motion.div>
                            </div>

                        </header>

                        <section>
                            <TextHighlightScroll />
                        </section>

                        <section style={{ height: '100vh' }}>

                        </section>

                    </div>

                </div>
            </SmoothScrolling>
        </>
    )
}

export default Lander
