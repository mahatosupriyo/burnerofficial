"use client"
import React from 'react'
import styles from './cancellation.module.scss'
import CompanyNav from '../components/companynav/companynav'
import { motion } from 'framer-motion'
import CompanyHeader from '../components/header/header'
import CompanyFooter from '../components/companyfooter/compayfooter'

const CancellationPage = () => {
    return (
        <div className={styles.wraper}>
            <div className={styles.container}>
                <CompanyNav />
                <div className={styles.content}>
                    <CompanyHeader
                        titleone='cancellation'
                        titletwo='& refunds'
                        update='Aug 28th 2024'
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: .25, delay: 0.2 }}
                        className={styles.maincontent}>

                        No cancellations & Refunds are entertained.

                    </motion.div>
                </div>

            </div>
            {/* <CompanyFooter /> */}
        </div >
    )
}

export default CancellationPage
