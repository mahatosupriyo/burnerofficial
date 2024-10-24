'use client'

import MuxPlayer from '@mux/mux-player-react'
import styles from './displaylayout.module.scss'
import Overlay from "@/components/molecules/overlay/overlay";
import Icon from '@/components/atoms/icons';

export default function AmbientMuxPlayer() {

  const imgUrl = "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"

  return (
    <div className={styles.seriescontainer}>

      <div className={styles.displaylayout}>
        <div className={styles.canvaswraper}>
          <div className={styles.headerwraper}>
            <div style={{ display: 'flex', gap: '0.6rem', flexDirection: 'column' }}>
              <p className={styles.subheading}>master course</p>
              <p className={styles.title}>Era of Glassmorphism</p>
            </div>

            <div className={styles.creatorwraper}>

              <div className={styles.label}>
                Instructed by
                <h3 className={styles.username}>
                  apu
                  <Icon name='verified' size={10} />
                </h3>
              </div>
            </div>
          </div>

          <div className={styles.bannerwraper}>
            <img
              src={imgUrl}
              className={styles.banneroriginal}
            />
            <img
              style={{ position: 'absolute' }}
              src={imgUrl}
              className={styles.banner}
            />
          </div>

        </div>

        <div className={styles.chaptercontainer}>
          <h3 className={styles.title}>chapters</h3>

          <div className={styles.chapter}>
            <img
              src="https://image.mux.com/tgcgNxURMDq02gJ02thoMZ3cLPsNHzN4Ak/animated.gif?start=20"
              className={styles.chapterbanner}
            />

            <div className={styles.episodelabel}>
              <h3 className={styles.chaptertitle}>
                Era of glassmorphism
              </h3>
              <p className={styles.episode}>
                Episode 1
              </p>
            </div>
          </div>

          <div className={styles.chapter}>
            <img
              src="https://i.pinimg.com/control/564x/6f/49/45/6f4945d4cb375332f9cd5049a33e5ad3.jpg"
              className={styles.chapterbanner}
            />

            <div className={styles.episodelabel}>
              <h3 className={styles.chaptertitle}>
                Era of glassmorphism
              </h3>
              <p className={styles.episode}>
                Episode 2
              </p>
            </div>
          </div>

        </div>

        <div className={styles.videowraper} style={{ position: 'relative', zIndex: 1, height: '100%' }}>


          {/* <Overlay
            triggerButton={
              <div>
                Trigger
              </div>
            }
            overlayContent={
              <MuxPlayer
                streamType="on-demand"
                playbackId="r4rOE02cc95tbe3I00302nlrHfT023Q3IedFJW029w018KxZA"
                className={styles.muxplayer}
                accent-color="#FE4200"
                autoPlay="true"

                metadata={{
                  video_id: "video-id-54321",
                  video_title: "Test video title",
                  viewer_user_id: "user-id-007",
                }}
              />
            }
          /> */}

        </div>
      </div>

    </div>
  )
}