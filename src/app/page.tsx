import React from 'react'
import styles from './home.module.scss'
import NavBar from '@/components/navbar/navbar'
import Dashboard from '@/components/layouts/dashboard/dashboard'
import { auth } from "@/auth"
import Lander from '@/components/layouts/lander/lander'

export default async function Home() {
    const session = await auth()

    return (
        <div className={styles.wraper}>

            {session ? (
                <>
                    <NavBar />
                    <div className={styles.container}>
                        <Dashboard />
                    </div>
                </>

            ) : (


                <Lander />


            )}

        </div>
    )
}

