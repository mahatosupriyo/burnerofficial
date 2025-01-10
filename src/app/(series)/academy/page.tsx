import React from 'react'
import styles from './series.module.scss'
import NavBar from '@/components/navbar/navbar'
import AcademyLogo from './academylogo'
import { Metadata } from 'next';
import FAQ from '@/components/atoms/FAQ/faq';
import Footer from '@/components/footer/footer';

export const metadata: Metadata = {
    title: 'Burner Academy',
    description:
        'Learn design in the way, it’s meant to be learned.',
};

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>

                <div className={styles.content}>
                    <div className={styles.hero}>
                        <AcademyLogo />
                    </div>



                    <div className={styles.wraperbox}>
                        <span className={styles.subheading}>Intro</span>
                        <div className={styles.componentboxwraper}>
                            <div className={styles.componentbox}>
                                <div className={styles.component}>
                                    <h2 className={styles.featurelabel}>Era of Design Scape</h2>
                                    <p className={styles.description}>Course</p>
                                </div>

                                <div className={styles.component}>
                                    <h2 className={styles.featurelabel}>Intermediates</h2>
                                    <p className={styles.description}>Designed for</p>
                                </div>

                                <div className={styles.component}>
                                    <h2 className={styles.featurelabel}>3 Months</h2>
                                    <p className={styles.description}>Duration</p>
                                </div>

                                <div className={styles.component}>
                                    <h2 className={styles.featurelabel}>Hindi - English</h2>
                                    <p className={styles.description}>Language</p>
                                </div>
                            </div>

                            <h1 className={styles.bigtxt}>
                                Design skills that ensure your career success.
                            </h1>

                            <h4 className={styles.subdesc}>
                                Learn designing in the way,
                                It is meant to be learned.
                            </h4>

                        </div>

                    </div>

                    <div className={styles.gridsection}>
                        <div className={styles.bento}>
                            <img src="https://ik.imagekit.io/localstore/cc.png?updatedAt=1734462503532" draggable="false" className={styles.grid} />
                            <button className={styles.downloadbtn}>
                                <svg className={styles.downloadicon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
                                    <rect width="200" height="200" fill="black" />
                                    <path d="M143.9 79.9L137.6 73.6C137.3 73.3 136.9 73.3 136.6 73.6L105.2 105V55.7C105.2 55.3 104.9 55 104.5 55H95.6004C95.2004 55 94.9004 55.3 94.9004 55.7V105.5L62.9004 73.5C62.6004 73.2 62.2004 73.2 61.9004 73.5L55.5004 79.9C55.2004 80.2 55.2004 80.6 55.5004 80.9L92.9004 118.3L99.2004 124.6C99.5004 124.9 99.9004 124.9 100.2 124.6L106.5 118.3L143.9 80.9C144.2 80.6 144.2 80.2 143.9 79.9Z" fill="white" />
                                    <path d="M144 134H56C55.4 134 55 134.4 55 135V143.9C55 144.4 55.4 144.9 56 144.9H144C144.6 144.9 145 144.4 145 143.9V135C145 134.4 144.6 134 144 134Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home
