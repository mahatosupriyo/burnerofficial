"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './displaylayout.module.scss'

const DisplayLayout = () => {
    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <div className={styles.toplayer}>
                    <Link href="/" className={styles.backbutton}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 107 107" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M64.2 70.7217L48.9466 54.7883L64.1028 38.7578L60.1195 34.7744L40.6885 54.6912L60.0223 74.8994L64.2 70.7217Z" fill="white" />
                        </svg>
                    </Link>

                    <div className={styles.titlewraper}>
                        <h1 className={styles.pageheading}>Settings</h1>
                    </div>
                </div>
                <div>
                    <button className={styles.avatar}>
                        <img
                            src="https://middaycdn.s.llnwi.net/Radiocity-images/images/uploads/darshan%20raval%20india%20tour_d.jpg"
                            className={styles.avatarimg}
                        />
                    </button>
                </div>


                <div className={styles.wraperforms}>
                    <div className={styles.form}>
                        <label className={styles.label}>
                            Name
                            <input type="text" spellCheck="false" autoComplete='false' className={styles.inputbar} defaultValue={'Darshan Raval'} />
                        </label>
                        <div className={styles.bottomlayer}>
                            <p className={styles.instruction}>
                                you can update name two times in a month *
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 1, opacity: 0.6 }}
                                className={styles.submitbtn}>
                                Save
                            </motion.button>
                        </div>

                    </div>

                    <div className={styles.form}>
                        <label className={styles.label}>
                            Username
                            <input type="text" spellCheck="false" autoComplete='false' className={styles.inputbar} defaultValue={'darshanravaldz'} />
                        </label>
                        <div className={styles.bottomlayer}>
                            <p className={styles.instruction}>
                                you can update username two times in a month *
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 1, opacity: 0.6 }}
                                className={styles.submitbtn}>
                                Save
                            </motion.button>
                        </div>

                    </div>

                    <div className={styles.form}>
                        <label className={styles.label}>
                            Contact no.
                            <input type="tel" spellCheck="false" autoComplete='false' className={styles.inputbar} defaultValue={'7929008384'} />
                        </label>
                        <div className={styles.bottomlayer}>
                            <p className={styles.instruction}>
                                you can update phone no two times in a day *
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 1, opacity: 0.6 }}
                                className={styles.submitbtn}>
                                Save
                            </motion.button>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    )
}

export default DisplayLayout
