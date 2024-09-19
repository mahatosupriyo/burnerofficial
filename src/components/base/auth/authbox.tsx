import React from 'react'
import styles from './authbox.module.scss'
import Logo from '../logo'
import AuthBtn from './authbtn'

const AuthBox = () => {
    return (
        <>
            <div className={styles.authbox}>
                <Logo width='100'fill='#fafafa' />

                <h2 className={styles.titlemain}>
                    Sign up to
                    <br />
                    experience
                </h2>

                <div className={styles.providerbox}>
                    <AuthBtn provider='google' />
                    <AuthBtn provider='github' />
                </div>

                <p className={styles.policy}>
                    This site is protected by reCAPTCHA and the Google <span style={{ textDecoration: 'underline', color: '#989898' }}>Privacy Policy</span> and <span style={{ textDecoration: 'underline', color: '#989898' }}>Terms of Service</span> apply.
                </p>
            </div>
        </>
    )
}

export default AuthBox
