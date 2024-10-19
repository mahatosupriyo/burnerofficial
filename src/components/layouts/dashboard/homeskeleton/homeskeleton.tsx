"use client"
import React from 'react'
import styles from './homeskeleton.module.scss'
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
    500: 1,
};

const HomeSkeleton = () => {
    return (
        <div className={styles.feed}>
            <div
                className={styles.masonrygrid}
            >
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
                <div className={styles.gridItem}></div>
            </div>


        </div>
    )
}

export default HomeSkeleton
