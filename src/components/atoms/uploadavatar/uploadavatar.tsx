'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { updateAvatar } from '@/app/actions/avatar';
import { useRouter } from 'next/navigation';
import styles from './uploadavatar.module.scss'
import SuccessPopup from '@/app/success/successpop';
import Icon from '../icons';

export default function AvatarUpload({ currentAvatar }: { currentAvatar: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(currentAvatar);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check for persisted success message on component mount
    const persistedMessage = localStorage.getItem('avatarSuccessMessage');
    if (persistedMessage) {
      setSuccessMessage(persistedMessage);
      setShowPopup(true);
      localStorage.removeItem('avatarSuccessMessage');
    }
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await updateAvatar(formData);
      if (result.success) {
        const message = 'Pic updated successfully';
        setSuccessMessage(message);
        localStorage.setItem('avatarSuccessMessage', message); // Persist the message
        setShowPopup(true);
        router.refresh();
        // Create a new object URL for the uploaded file
        const newAvatarSrc = URL.createObjectURL(file);
        setAvatarSrc(newAvatarSrc);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update avatar. Please try again.';
      setSuccessMessage(errorMessage);
      localStorage.setItem('avatarSuccessMessage', errorMessage); // Persist the error message
      setShowPopup(true);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [router]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSuccessMessage(null);
    localStorage.removeItem('avatarSuccessMessage');
  };

  return (
    <div className={styles.avatarContainer}>
      {isUploading ? (
        <div className={styles.skeletonLoader}></div>
      ) : (
        <div className={styles.avatarsubcontainer}>
          <img
            src={avatarSrc || '/defaultavatar.png'}
            alt="User avatar"
            className={styles.avatar}
            onClick={triggerFileInput}
          />

          <div className={styles.uploadicon}>
            <Icon name='upload' size={36} />
          </div>
        </div>

      )}
      <input
        id="avatar-upload"
        name="file"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.uploadbutton}
        ref={fileInputRef}
      />
      <SuccessPopup
        message={successMessage}
        isVisible={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  )
}