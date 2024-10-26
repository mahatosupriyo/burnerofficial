import React from 'react';
import styles from './uploadavatar.module.scss';

interface AvatarProps {
  size: number;
}

const DefaultAvatar: React.FC<AvatarProps> = ({ size }) => {
  return (
    <div
      className={styles.defaultavatar}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
    </div>
  );
};

export default DefaultAvatar;
