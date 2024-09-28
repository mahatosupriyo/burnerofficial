import React from 'react'
import styles from './success.module.scss'
import Logo from '@/components/base/logo'
import SuccessAnimation from '@/components/atoms/lotties/success'

const SuccessPage = () => {
    return (
        <div className={styles.wraper}>
            <div className={styles.container}>
                <Logo width='90' />

                <div className={styles.mainwraper}>
                    <SuccessAnimation />
                    <h3 className={styles.heading}>
                        Your payment was successful.
                    </h3>
                    <p className={styles.subheading}>
                        we're processing your payment.
                    </p>
                </div>
                <p className={styles.highpriority}>
                    you can close the page.
                </p>
            </div>
        </div>
    )
}

export default SuccessPage
