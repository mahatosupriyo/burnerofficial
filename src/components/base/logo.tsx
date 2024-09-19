import React from 'react'
import styles from './logo.module.scss'
import Link from 'next/link'

type LogoProps = {
    width: string;
    fill?: string;
};

const Logo: React.FC<LogoProps> = ({ width, fill }) => {
    return (
        <>
            <Link href="/" className={styles.Logo}>

            </Link>
        </>
    )
}

export default Logo;
