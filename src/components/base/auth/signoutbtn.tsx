"use client"
import styles from './signoutbtn.module.scss'
import { signOut } from "next-auth/react"
import { motion } from 'framer-motion'

export function SignOut() {
    return (
        <motion.button
            className={styles.signoutbtn}
            onClick={() => signOut()}
            whileHover={{ scale: 1.02 }}
            whileTap={{scale: 1, opacity: 0.6}}
        >
            Logout
        </motion.button>
    );
}