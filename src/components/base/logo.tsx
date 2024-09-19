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
            <Link href="/" className={styles.Logo} draggable="false">
                <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 792 310" fill="none">
                    <path d="M0 0H792V309.073H0V0Z" fill="url(#paint0_linear_2718_65)" />
                    <path d="M29.5437 28.4064H267.03V153.967L148.287 279.528H29.5437V28.4064Z" fill="white" />
                    <path d="M277.257 28.4064H389.182C458.528 28.4064 514.743 84.6219 514.743 153.967C514.743 223.313 458.528 279.528 389.182 279.528H277.257V28.4064Z" fill="white" />
                    <path d="M762.456 28.4064V167.603C762.456 233.183 709.293 286.346 643.713 286.346C578.133 286.346 524.97 233.183 524.97 167.603V28.4064H762.456Z" fill="white" />
                    <defs>
                        <linearGradient id="paint0_linear_2718_65" x1="-143" y1="235.5" x2="927.5" y2="72.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#AFA7A1" />
                            <stop offset="0.34243" stop-color="#FE4200" />
                            <stop offset="0.806666" stop-color="#FF805B" />
                            <stop offset="1" stop-color="#98B7C0" />
                        </linearGradient>
                    </defs>
                </svg>
            </Link>
        </>
    )
}

export default Logo;
