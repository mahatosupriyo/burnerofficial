import React from 'react'
import styles from './searchitemskeleton.module.scss'

const SearchItemSkeleton = () => {
    return (
        <div>
            <div className={styles.searchitemskeleton}>
                <div className={styles.index}></div>
                <span className={styles.thumbnail}></span>
                <div className={styles.seriesdetails}>
                    <div className={styles.toplayer}>
                        <div className={styles.seriestitle}></div>
                        <div className={styles.subheading}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchItemSkeleton
