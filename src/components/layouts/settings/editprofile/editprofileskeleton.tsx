import React from 'react'
import styles from './editprofileskeleton.module.scss'

const EditProfileSkeleton = () => {
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
          <div className={styles.textone}></div>
          <div className={styles.texttwo}></div>
        </div>
        <div className={styles.content}>

        </div>
      </div>
    </div>
  )
}

export default EditProfileSkeleton
