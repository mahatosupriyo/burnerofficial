import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerwraper}>
                <p className={styles.regulartxt}>
                    Copyright &copy; 2024 Edu Burner. All rights reserved.
                </p>

                <div className={styles.quicklinks}>
                    <Link className={styles.link} href="/">Terms of use</Link>
                    <span className={styles.divider}></span>
                    <Link className={styles.link} href="/">Privacy Policy</Link>
                    <span className={styles.divider}></span>
                    <Link className={styles.link} href="/">Contact us</Link>
                </div>
            </div>

        </footer>
    )
}

export default Footer
