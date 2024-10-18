import React from 'react'
import styles from './home.module.scss'
import NavBar from '@/components/navbar/navbar'
import Dashboard from '@/components/layouts/dashboard/dashboard'
// import InspirationPage from '@/components/atoms/test'

const Home = () => {

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <Dashboard/>
                {/* <InspirationPage/> */}
            </div>
        </div>
    )
}

export default Home
