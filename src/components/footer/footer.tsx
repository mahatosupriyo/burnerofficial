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
                        <svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 0 813 227" fill="none">
                            <path d="M0 0H209V110.5L104.5 221H0V0Z" fill="#fff" />
                            <path d="M218 0H316.5C377.527 0 427 49.4725 427 110.5C427 171.527 377.527 221 316.5 221H218V0Z" fill="#fff" />
                            <path d="M645 0V122.5C645 180.214 598.214 227 540.5 227C482.786 227 436 180.214 436 122.5V0H645Z" fill="#fff" />
                            <path d="M694.375 48.8082C690.023 48.8082 686.915 47.0053 684.677 44.3322V48H674.108V0.131678H684.677V17.6627C686.852 14.8652 690.085 13.0002 694.437 13.0002C702.954 13.0002 709.792 20.2737 709.792 30.9042C709.792 41.4725 703.078 48.8082 694.375 48.8082ZM691.888 38.7372C695.929 38.7372 699.099 35.691 699.099 30.9042C699.099 26.1795 695.991 23.0712 691.888 23.0712C687.785 23.0712 684.677 26.1795 684.677 30.9042C684.677 35.691 687.785 38.7372 691.888 38.7372Z" fill="#fff" />
                            <path d="M729.938 48.8082C718.997 48.8082 711.661 41.0373 711.661 30.9042C711.661 20.771 719.059 13.0002 729.689 13.0002C741.004 13.0002 748.401 21.89 747.345 33.1422H722.416C722.913 38.4263 726.27 40.6643 729.938 40.6643C732.798 40.6643 735.16 39.2967 735.968 36.81H746.847C744.485 45.2647 737.336 48.8082 729.938 48.8082ZM722.727 26.739H736.341C735.657 23.4442 733.419 21.144 729.627 21.144C725.835 21.144 723.597 23.4442 722.727 26.739Z" fill="#fff" />
                            <path d="M766.398 48.8082C759.808 48.8082 753.343 44.9538 753.343 34.7585V23.755H747.499V13.8083H753.343V6.78351L763.911 4.48334V13.8083H775.412V23.755H763.911V34.1368C763.911 37.4317 765.589 38.9858 768.263 38.9858C770.128 38.9858 772.366 38.2398 775.287 37.3073L777.09 45.8242C775.163 47.1918 770.687 48.8082 766.398 48.8082Z" fill="#fff" />
                            <path d="M792.195 48.8082C783.492 48.8082 776.778 41.4725 776.778 30.9042C776.778 20.2737 783.616 13.0002 792.133 13.0002C796.485 13.0002 799.717 14.8652 801.893 17.6627V13.8083H812.462L812.399 48H801.831V44.3322C799.655 47.0053 796.547 48.8082 792.195 48.8082ZM794.682 38.7372C798.785 38.7372 801.893 35.691 801.893 30.9042C801.893 26.1795 798.785 23.0712 794.682 23.0712C790.579 23.0712 787.471 26.1795 787.471 30.9042C787.471 35.691 790.641 38.7372 794.682 38.7372Z" fill="#fff" />
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
