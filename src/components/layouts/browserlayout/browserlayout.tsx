"use client"

import React from 'react'
import ChapterCard from '@/components/molecules/cards/chaptercard/chaptercard'
import styles from './browserlayout.module.scss'

const BrowserLayout = () => {
  return (
    <section className={styles.browserwraper}>
    <div className={styles.toplayer}>
        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 105 105" fill="none">
            <path d="M20.23 39.34C21.18 44.12 24.88 47.82 29.66 48.77C30.82 49 31.95 49 34 49C36.05 49 37.18 49 38.34 48.77C43.12 47.82 46.82 44.12 47.77 39.34C48 38.18 48 37.05 48 35C48 32.95 48 31.82 47.77 30.66C46.82 25.88 43.12 22.18 38.34 21.23C37.18 21 36.05 21 34 21C31.95 21 30.82 21 29.66 21.23C24.88 22.18 21.18 25.88 20.23 30.66C20 31.82 20 32.95 20 35C20 37.05 20 38.18 20.23 39.34ZM28.08 32.22C28.4 30.63 29.63 29.39 31.22 29.08C31.61 29 32.56 29 34 29C35.44 29 36.39 29 36.78 29.08C38.37 29.4 39.61 30.63 39.92 32.22C40 32.61 40 33.56 40 35C40 36.44 40 37.4 39.92 37.78C39.6 39.37 38.37 40.61 36.78 40.92C36.39 41 35.44 41 34 41C32.56 41 31.61 41 31.22 40.92C29.63 40.6 28.39 39.37 28.08 37.78C28 37.39 28 36.44 28 35C28 33.56 28 32.6 28.08 32.22Z" fill="white" />
            <path d="M83.77 30.66C82.82 25.88 79.12 22.18 74.34 21.23C73.18 21 72.05 21 70 21C67.95 21 66.82 21 65.66 21.23C60.88 22.18 57.18 25.88 56.23 30.66C56 31.82 56 32.95 56 35C56 37.05 56 38.18 56.23 39.34C57.18 44.12 60.88 47.82 65.66 48.77C66.82 49 67.95 49 70 49C72.05 49 73.18 49 74.34 48.77C79.12 47.82 82.82 44.12 83.77 39.34C84 38.18 84 37.05 84 35C84 32.95 84 31.82 83.77 30.66ZM75.92 37.78C75.6 39.37 74.37 40.61 72.78 40.92C72.39 41 71.44 41 70 41C68.56 41 67.61 41 67.22 40.92C65.63 40.6 64.39 39.37 64.08 37.78C64 37.39 64 36.44 64 35C64 33.56 64 32.6 64.08 32.22C64.4 30.63 65.63 29.39 67.22 29.08C67.61 29 68.56 29 70 29C71.44 29 72.39 29 72.78 29.08C74.37 29.4 75.61 30.63 75.92 32.22C76 32.61 76 33.56 76 35C76 36.44 76 37.4 75.92 37.78Z" fill="white" />
            <path d="M20.23 75.34C21.18 80.12 24.88 83.82 29.66 84.77C30.82 85 31.95 85 34 85C36.05 85 37.18 85 38.34 84.77C43.12 83.82 46.82 80.12 47.77 75.34C48 74.18 48 73.05 48 71C48 68.95 48 67.82 47.77 66.66C46.82 61.88 43.12 58.18 38.34 57.23C37.18 57 36.05 57 34 57C31.95 57 30.82 57 29.66 57.23C24.88 58.18 21.18 61.88 20.23 66.66C20 67.82 20 68.95 20 71C20 73.05 20 74.18 20.23 75.34ZM28.08 68.22C28.4 66.63 29.63 65.39 31.22 65.08C31.61 65 32.56 65 34 65C35.44 65 36.39 65 36.78 65.08C38.37 65.4 39.61 66.63 39.92 68.22C40 68.61 40 69.56 40 71C40 72.44 40 73.4 39.92 73.78C39.6 75.37 38.37 76.61 36.78 76.92C36.39 77 35.44 77 34 77C32.56 77 31.61 77 31.22 76.92C29.63 76.6 28.39 75.37 28.08 73.78C28 73.39 28 72.44 28 71C28 69.56 28 68.6 28.08 68.22Z" fill="white" />
            <path d="M83.77 66.66C82.82 61.88 79.12 58.18 74.34 57.23C73.18 57 72.05 57 70 57C67.95 57 66.82 57 65.66 57.23C60.88 58.18 57.18 61.88 56.23 66.66C56 67.82 56 68.95 56 71C56 73.05 56 74.18 56.23 75.34C57.18 80.12 60.88 83.82 65.66 84.77C66.82 85 67.95 85 70 85C72.05 85 73.18 85 74.34 84.77C79.12 83.82 82.82 80.12 83.77 75.34C84 74.18 84 73.05 84 71C84 68.95 84 67.82 83.77 66.66ZM75.92 73.78C75.6 75.37 74.37 76.61 72.78 76.92C72.39 77 71.44 77 70 77C68.56 77 67.61 77 67.22 76.92C65.63 76.6 64.39 75.37 64.08 73.78C64 73.39 64 72.44 64 71C64 69.56 64 68.6 64.08 68.22C64.4 66.63 65.63 65.39 67.22 65.08C67.61 65 68.56 65 70 65C71.44 65 72.39 65 72.78 65.08C74.37 65.4 75.61 66.63 75.92 68.22C76 68.61 76 69.56 76 71C76 72.44 76 73.4 75.92 73.78Z" fill="white" />
        </svg>
        <div className={styles.sectionlabel}>
            Browse series
        </div>
    </div>

    <div className={styles.chaptercontainer}>

        <ChapterCard
            href='/'
            label='Asal mein'
            sublabel='Series'
            banner='https://m.media-amazon.com/images/M/MV5BYmQ0MTE3ZjYtZGEyMS00NzBmLTkxNzMtMTI0MDYwZGE3NzYxXkEyXkFqcGdeQXVyMTA5NzIyMDY5._V1_.jpg'
        />

        <ChapterCard
            href='/'
            label='Tum mere'
            sublabel='Series'
            banner='https://m.media-amazon.com/images/M/MV5BM2ZhZGEwZTgtYTAwNS00MjJkLTlmYTktNjA5NTUxYzUzYTYxXkEyXkFqcGdeQXVyNDQ4NTg1Njc@._V1_.jpg'
        />
        
        <ChapterCard
            href='/'
            label='Saajan ve'
            sublabel='Series'
            banner='https://resources.tidal.com/images/0a34410d/65fc/40cc/afe7/8d13996b30cf/640x640.jpg'
        />

        <ChapterCard
            href='/'
            label='Darshan Unfiltered'
            sublabel='Series'
            banner='https://c.saavncdn.com/editorial/Let_sPlayDarshanRavalHindi_20231227172253.jpg'
        />



        <ChapterCard
            href='/'
            label='Baarishon mein'
            sublabel='Series'
            banner='https://images.genius.com/4fb3f027cdc6001ef833d8cccde44ed4.554x554x1.jpg'
        />

        <ChapterCard
            href='/'
            label='Chogada'
            sublabel='Series'
            banner='https://www.shazam.com/mkimage/image/thumb/Music124/v4/af/69/79/af697907-7447-e35b-5446-40d3cb3e1f64/8903431684981_cover.jpg/375x375bb.webp'
        />


        <ChapterCard
            href='/'
            label='Jeeja'
            sublabel='Series'
            banner='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-XX6kErny5klNgFTaQ3kvaQ-NpHyzWjWqHQ&s'
        />

        <ChapterCard
            href='/'
            label='Saajan ve'
            sublabel='Series'
            banner='https://resources.tidal.com/images/0a34410d/65fc/40cc/afe7/8d13996b30cf/640x640.jpg'
        />

        <ChapterCard
            href='/'
            label='Darshan Unfiltered'
            sublabel='Series'
            banner='https://c.saavncdn.com/editorial/Let_sPlayDarshanRavalHindi_20231227172253.jpg'
        />



        <ChapterCard
            href='/'
            label='Baarishon mein'
            sublabel='Series'
            banner='https://images.genius.com/4fb3f027cdc6001ef833d8cccde44ed4.554x554x1.jpg'
        />

        <ChapterCard
            href='/'
            label='Chogada'
            sublabel='Series'
            banner='https://www.shazam.com/mkimage/image/thumb/Music124/v4/af/69/79/af697907-7447-e35b-5446-40d3cb3e1f64/8903431684981_cover.jpg/375x375bb.webp'
        />


    </div>
</section>
  )
}

export default BrowserLayout
