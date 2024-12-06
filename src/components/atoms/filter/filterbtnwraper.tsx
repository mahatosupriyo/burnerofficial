"use client"
import React, { ReactNode } from "react"
import { motion } from 'framer-motion'

type WrapperProps = {
    children: ReactNode;
};

const FilterButtonWrapper: React.FC<WrapperProps> = ({ children }) => {
    return <motion.div
        whileTap={{ opacity: 0.5 }}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        {children}
    </motion.div>;
};

export default FilterButtonWrapper;
