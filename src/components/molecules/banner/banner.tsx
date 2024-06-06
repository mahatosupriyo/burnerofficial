import React from 'react'
import styles from './banner.module.scss'

const PlaylistBanner = () => {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.playlistdetails}>

                    <h1 className={styles.playlistname}>
                        Design scape
                    </h1>
                    <h3 className={styles.chapters}>
                        13 Chapters
                    </h3>

                </div>
                <img
                    src="https://images.unsplash.com/photo-1714786479680-d0c30f22dd29?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={styles.playlistbanner}
                    draggable="false"
                />
            </div>

        </>
    )
}

export default PlaylistBanner
