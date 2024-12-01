import React from 'react'
import styles from './series.module.scss'
import NavBar from '@/components/navbar/navbar'
import AcademyLogo from './academylogo'
import { Metadata } from 'next';

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
                </div>
            </div>
        </div>
    )
}

export default Home
