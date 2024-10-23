'use client'

import React, { useRef, useEffect } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import styles from './displaylayout.module.scss'
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
    <div className={styles.displaylayout}>
      <canvas
        ref={canvasRef}
        className={styles.canvasambient}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.4,
        scale: '140%',
        zIndex: 0,
        filter: 'blur(40px)'
      }}
      />
      <div ref={playerRef} className={styles.videowraper} style={{ position: 'relative', zIndex: 1, height: '100%', padding: '10rem' }}>
        <MuxPlayer
          streamType="on-demand"
          playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
          className={styles.muxplayer}

          metadata={{
            video_id: "video-id-54321",
            video_title: "Test video title",
            viewer_user_id: "user-id-007",
          }}
          style={{ width: '100%', aspectRatio: 16 / 9 }}
        />
      </div>
    // </div>
  )
}