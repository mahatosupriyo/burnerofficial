import React from 'react'
import Link from 'next/link'
import styles from './compayfooter.module.scss'

const CompanyFooter = () => {
    return (
        <div className={styles.footerwraper}>
            <div className={styles.footercontainer}>
                <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 0 697 272" fill="none">
                    <path d="M0 0H697V272H0V0Z" fill="#1A1A1A" />
                    <path d="M26 25H235V135.5L130.5 246H26V25Z" fill="white" />
                    <path d="M244 25H342.5C403.527 25 453 74.4725 453 135.5C453 196.527 403.527 246 342.5 246H244V25Z" fill="white" />
                    <path d="M671 25V147.5C671 205.214 624.214 252 566.5 252C508.786 252 462 205.214 462 147.5V25H671Z" fill="white" />
                </svg>
            </div>

        </div>
    )
}

export default CompanyFooter
