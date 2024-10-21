"use client";
import React from 'react'
import styles from './authbox.module.scss'
import Logo from '../logo'
import AuthBtn from './authbtn'
import { motion } from 'framer-motion'

const AuthBox = () => {
    return (
        <>
            <div className={styles.authbox}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Logo width='100' fill='#fafafa' />
                </motion.div>

                <motion.h2
                    className={styles.titlemain}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.16 }}
                >
                    Login to
                    <br />
                    experience
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.24, staggerChildren: 0.15 }}
                    className={styles.providerbox}
                >
                    <AuthBtn provider='google' />
                    {/* <AuthBtn provider='github' /> */}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    className={styles.policy}
                >
                    By continuing, you agree to our <a target='_blank' href='/company/terms' style={{ textDecoration: 'underline', color: '#989898' }}>terms</a> and <a target='_blank' href='/company/delivery' style={{ textDecoration: 'underline', color: '#989898' }}>policies</a>.
                </motion.p>
            </div>
        </>
    )
}

export default AuthBox
