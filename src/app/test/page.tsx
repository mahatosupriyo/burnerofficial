"use client"
import React from 'react'
import styles from './test.module.scss'
import NavBar from '@/components/navbar/navbar'
import ButtonWrapper from '@/components/navbar/buttonwraper'
import Link from 'next/link'
import Icon from '@/components/atoms/icons'
import SearchBox from '@/components/atoms/searchbox/searchbox'
import UploadControls from '@/components/atoms/uploadpost/uploadpost'

const Test = () => {
  return (
    <div className={styles.wraper}>
        <div className={styles.navwraper}>
            <div className={styles.nav}>

                <div className={styles.leftwraper}>

                    <ButtonWrapper>
                        <Link draggable="false" href="/" className={styles.primarybutton}>
                            <div className={styles.iconwraper}>
                                <Icon name="home" size={16} fill='#ffffff5c' />
                            </div>
                        </Link>
                    </ButtonWrapper>

                    <UploadControls />
                </div>

                <div style={{ width: '100%' }}>
                    <SearchBox />
                </div>


                <div className={styles.rightwraper}>
                    <ButtonWrapper>
                        <Link href='/settings' className={styles.primarybutton}>
                            <Icon name='settings' size={26.80} fill='#ffffff5c' />
                        </Link>
                    </ButtonWrapper>

                    <div>
                        {/* <UserBtn /> */}
                    </div>

                </div>


            </div>
        </div>
    </div>
  )
}

export default Test
