import React from 'react'
import styles from './settingskeleton.module.scss'

const SettingsSkeleton = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '4rem'
      }}
    >
      <div className={styles.settingslayout}>
        <div className={styles.header}>
          <div className={styles.avatar}>

          </div>
        </div>
        <div className={styles.content}>

        </div>
      </div>
    </div>
  )
}

export default SettingsSkeleton
