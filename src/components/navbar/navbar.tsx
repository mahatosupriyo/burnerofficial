"use client"
import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import Logo from '@/components/base/logo';
import Link from 'next/link';
import { motion } from 'framer-motion'

const NavBar = () => {
    // const [hasBackground, setHasBackground] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         setHasBackground(scrollTop > 20);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className={styles.navwraper}>
            <div className={styles.nav}>
                <motion.button
                    className={styles.morebtn}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 43 43" className={styles.morelogo}>
                        <path d="M11 22C11 23.6569 9.65685 25 8 25C6.34315 25 5 23.6569 5 22C5 20.3431 6.34315 19 8 19C9.65685 19 11 20.3431 11 22Z" />
                        <path d="M24 22C24 23.6569 22.6569 25 21 25C19.3431 25 18 23.6569 18 22C18 20.3431 19.3431 19 21 19C22.6569 19 24 20.3431 24 22Z" />
                        <path d="M37 22C37 23.6569 35.6569 25 34 25C32.3431 25 31 23.6569 31 22C31 20.3431 32.3431 19 34 19C35.6569 19 37 20.3431 37 22Z" />
                    </svg>
                </motion.button>

                <div className={styles.rightwraper}>

                    <motion.button
                        className={styles.uploadbtn}
                        whileTap={{ opacity: 0.6 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.uploadicon} viewBox="0 0 105 105" fill="none">
                            <path d="M30.9971 23C28.7871 23 26.9971 24.79 26.9971 27C26.9971 29.21 28.7871 31 30.9971 31H72.9971C75.2071 31 76.9971 29.21 76.9971 27C76.9971 24.79 75.2071 23 72.9971 23H30.9971Z" />
                            <path d="M76.1469 61.0702C76.7369 63.2002 78.9369 64.4402 81.0769 63.8502C83.2069 63.2602 84.4469 61.0502 83.8569 58.9202C81.6969 51.1602 79.5869 46.0102 75.2369 42.6902C70.3969 38.9902 64.4369 38.9902 53.6169 38.9902H50.3869C39.5669 38.9902 33.6069 38.9902 28.7669 42.6902C24.4169 46.0202 22.3069 51.1602 20.1469 58.9202C19.5569 61.0502 20.7969 63.2502 22.9269 63.8502C23.2869 63.9502 23.6469 64.0002 24.0069 64.0002C25.7569 64.0002 27.3669 62.8402 27.8569 61.0702C29.8469 53.9302 31.3569 50.7802 33.6269 49.0502C36.2069 47.0802 40.3769 47.0002 50.3869 47.0002H53.6169C63.6269 47.0002 67.7969 47.0802 70.3769 49.0502C72.6469 50.7802 74.1569 53.9302 76.1469 61.0702Z" />
                            <path d="M51.9971 87C54.2071 87 55.9971 85.21 55.9971 83V66.66L61.1671 71.83C61.9471 72.61 62.9771 73 63.9971 73C65.0171 73 66.0471 72.61 66.8271 71.83C68.3871 70.27 68.3871 67.74 66.8271 66.17L59.9471 59.29C57.8271 57.17 54.9971 56 51.9971 56C48.9971 56 46.1671 57.17 44.0471 59.29L37.1671 66.17C35.6071 67.73 35.6071 70.26 37.1671 71.83C38.7271 73.39 41.2671 73.39 42.8271 71.83L47.9971 66.66V83C47.9971 85.21 49.7871 87 51.9971 87Z" />
                        </svg>
                    </motion.button>

                    <Link className={styles.avatarbtn} href="/auth">
                        <img
                            src="https://middaycdn.s.llnwi.net/Radiocity-images/images/uploads/darshan%20raval%20india%20tour_d.jpg"
                            draggable="false"
                            className={styles.avatar}
                        />
                    </Link>

                </div>


            </div>
        </div>
    );
}

export default NavBar;
