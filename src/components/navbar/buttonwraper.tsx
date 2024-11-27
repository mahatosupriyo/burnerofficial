"use client"
import React, { ReactNode } from "react"
import { motion } from 'framer-motion'
import styles from './navbar.module.scss'

type WrapperProps = {
    children: ReactNode;
};

const ButtonWrapper: React.FC<WrapperProps> = ({ children }) => {
    return <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1 }}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        {children}
    </motion.div>;
};

export default ButtonWrapper;
