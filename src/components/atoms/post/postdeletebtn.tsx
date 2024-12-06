import React from 'react'
import styles from './postdelete.module.scss'

interface DeletePostProps {
  postId: string;
}

export const DeletePost: React.FC<DeletePostProps> = ({ postId }) => {

  return (
    <button
      className={styles.morebtn}
    >
      Delete
    </button>
  )
}

export default DeletePost
