"use client";
import styles from './signoutbtn.module.scss'
import { signOut } from "next-auth/react"

export function SignOut() {
    return (
        <button onClick={() => signOut()} className={styles.logoutbtn} style={{ margin: '1rem 0rem' }}>
            <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                Logout
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
            </svg>
        </button>
    );
}