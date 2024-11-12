import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
import Icon from '../atoms/icons'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerwraper}>

                <div className={styles.leftwraper}>
                    <div className={styles.logowraper}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 0 282 100" fill="none">
                            <path d="M0.533203 0.316406H91.5694V48.448L46.0513 96.5796H0.533203V0.316406Z" fill="white" />
                            <path d="M95.4896 0.316406H138.394C164.977 0.316406 186.526 21.8657 186.526 48.448C186.526 75.0303 164.977 96.5796 138.394 96.5796H95.4896V0.316406Z" fill="white" />
                            <path d="M281.482 0.316406V53.675C281.482 78.8139 261.103 99.1931 235.964 99.1931C210.825 99.1931 190.446 78.8139 190.446 53.675V0.316406H281.482Z" fill="white" />
                        </svg>
                    </div>

                    <div className={styles.linkswraper}>
                        <p className={styles.linkhead}>company</p>
                        <div className={styles.linklist}>
                            <Link className={styles.link} href="/company/terms">Terms</Link>
                            <Link className={styles.link} href="/company/privacy">Privacy</Link>
                            <Link className={styles.link} href="/company/cancellation">refund</Link>
                            {/* <Link className={styles.link} href="/company/contact">Contact us</Link> */}
                        </div>
                    </div>

                    <div className={styles.linkswraper}>
                        <p className={styles.linkhead}>products</p>
                        <div className={styles.linklist}>
                            <Link className={styles.link} href="/">creator</Link>
                            <Link className={styles.link} href="/">inspire</Link>
                            <Link className={styles.link} href="/">series</Link>
                        </div>
                    </div>

                    <div className={styles.linkswraper}>
                        <p className={styles.linkhead}>quick access</p>
                        <div className={styles.linklist}>
                            <Link className={styles.link} href="/">freebies</Link>
                            <Link className={styles.link} href="/">ambassador</Link>
                            <Link className={styles.link} href="/">career</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.socials}>
                    <Link href="/" className={styles.sociallink}>
                        <Icon name="instagram" fill='#fff' size={30} />
                    </Link>

                    <Link href="/" className={styles.sociallink}>
                        <Icon name="linkedin" fill='#fff' size={30} />
                    </Link>
                </div>
            </div>


        </footer>
    )
}

export default Footer
