'use client'

import React, { useRef, useEffect } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import styles from './displaylayout.module.scss'
import { div } from 'framer-motion/client'
export default function AmbientMuxPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const player = playerRef.current?.querySelector('mux-player') as HTMLElement & { media: { nativeEl: HTMLVideoElement } } | null
    if (!canvas || !player) return

    const video = player.media.nativeEl
    const ambientCtx = canvas.getContext('2d')
    if (!ambientCtx) return

    ambientCtx.filter = 'blur(40px)'

    const poster = new Image()
    poster.src = 'https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg'
    poster.crossOrigin = 'anonymous'

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const updateCanvasSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener('resize', updateCanvasSize)

    video.addEventListener('loadedmetadata', function () {
      ambientCtx.drawImage(poster, 0, 0, canvas.width, canvas.height)
    })

    function paintCanvas() {
      if (video.paused || video.ended) return
      if (ambientCtx && canvas) {
        ambientCtx.drawImage(video, 0, 0, canvas.width, canvas.height)
      }
      video.requestVideoFrameCallback(paintCanvas)
    }

    video.addEventListener('play', paintCanvas)
    ambientCtx.drawImage(poster, 0, 0, canvas.width, canvas.height)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      video.removeEventListener('play', paintCanvas)
    }
  }, [])

  return (
    <div className={styles.seriescontainer}>

      <div className={styles.displaylayout}>
        <div className={styles.canvaswraper}>
          <canvas
            ref={canvasRef}
            className={styles.canvasambient}
            style={{
              opacity: 0.46,
              scale: '140%',
              filter: 'blur(60px)'
            }}
          />
        </div>

        <div ref={playerRef} className={styles.videowraper} style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <MuxPlayer
            streamType="on-demand"
            playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
            className={styles.muxplayer}
            accent-color="#FE4200"

            metadata={{
              video_id: "video-id-54321",
              video_title: "Test video title",
              viewer_user_id: "user-id-007",
            }}
          />

          <div className={styles.chapterswraper}>
            <div className={styles.chapter}>
              <img
                src="https://images.unsplash.com/photo-1719937206930-84afb0daf141?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                className={styles.chapterbanner}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}