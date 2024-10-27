'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { updateAvatar } from '@/app/actions/avatar';
import { useRouter } from 'next/navigation';
import styles from './uploadavatar.module.scss'
import SuccessPopup from '@/app/success/successpop';
import Icon from '../icons';
import DefaultAvatar from './defaultavatar';

interface AvatarUploadProps {
  currentAvatar: string | null;
  lastImageUpdate: Date | null;
}

export default function AvatarUpload({ currentAvatar, lastImageUpdate }: AvatarUploadProps) {
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

  const canUpdateAvatar = useCallback(() => {
    if (!lastImageUpdate) return true;
    const timeSinceLastUpdate = Date.now() - lastImageUpdate.getTime();
    return timeSinceLastUpdate >= 24 * 60 * 60 * 1000;
  }, [lastImageUpdate]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!canUpdateAvatar()) {
      const errorMessage = "You can only update your avatar once per day";
      setSuccessMessage(errorMessage);
      localStorage.setItem('avatarSuccessMessage', errorMessage);
      setShowPopup(true);
      return;
    }

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
  }, [router, canUpdateAvatar]);

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
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="User avatar"
              className={styles.avatar}
              draggable="false"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
              onClick={triggerFileInput}
            />
          ) : (
            <DefaultAvatar size={40} />
          )}
          <div className={styles.uploadicon}>
            <Icon name='upload' size={26} />
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