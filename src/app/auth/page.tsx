import React from 'react'
import styles from './auth.module.scss'
import AuthBox from '@/components/base/auth/authbox'

const AuthPage = () => {
  return (
    <>
      <div className={styles.wraper}>
        <div className={styles.container}>
            <AuthBox/>
        </div>
      </div>
    </>
  )
}

export default AuthPage;
