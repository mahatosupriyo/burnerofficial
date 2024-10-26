import React from 'react'

interface AvatarProps {
  src: string
  size?: number
}

export default function Avatar({ src, size = 40 }: AvatarProps) {
  return (
    <div style={{ width: size, height: size }}>
      <img
        src={src}
        width={size}
        height={size}
        style={{borderRadius: '100rem'}}
      />
    </div>
  )
}