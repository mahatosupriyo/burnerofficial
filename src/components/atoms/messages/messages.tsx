import React from 'react'
import styles from './messages.module.scss'

interface MessageProps {
    message: string
    onClose?: () => void
}

export function SuccessMessage({ message, onClose }: MessageProps) {
    return (
        <div className={styles.successmessage} role="alert">
            <span className={styles.messagetext}>{message}</span>
            {onClose && (
                <button onClick={onClose} className={styles.closebutton} aria-label="Close success message">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height='2rem' viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}

export function ErrorMessage({ message, onClose }: MessageProps) {
    return (
        <div className={styles.errormessage} role="alert">
            <span className={styles.messagetext}>{message}</span>
            {onClose && (
                <button onClick={onClose} className={styles.closebutton} aria-label="Close success message">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" height='2rem' viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    )
}