import React from 'react'
import styles from './series.module.scss'
import NavBar from '@/components/navbar/navbar'
import AcademyLogo from './academylogo'

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>

                <div className={styles.content}>
                    <div className={styles.hero}>
                        <AcademyLogo/>
                    </div>


                    <div className={styles.headercontent}>
                        <h2 className={styles.heading}>Step Into <br />The Top One %</h2>
                        <p className={styles.description}>
                            Become Part of World’s Elite - 1% of Designers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
