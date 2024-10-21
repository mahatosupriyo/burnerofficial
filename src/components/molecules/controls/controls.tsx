'use client';

import { useState, useRef, useEffect } from 'react';
import { createPost } from '@/app/actions/post';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './controls.module.scss';
import Icon from '@/components/atoms/icons';
import SuccessPopup from '@/app/success/successpop';

const Controls = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Check for persisted success message on component mount
        const persistedMessage = localStorage.getItem('successMessage');
        if (persistedMessage) {
            setSuccessMessage(persistedMessage);
            setShowPopup(true);
            localStorage.removeItem('successMessage'); // Clear the persisted message
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setSuccessMessage(null);
        try {
            await createPost(formData);
            const message = 'Post created successfully';
            setSuccessMessage(message);
            localStorage.setItem('successMessage', message); // Persist the message
            setShowPopup(true);
            router.refresh();
            setPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error creating post:', error);
            const errorMessage = 'Failed to create post. Please try again.';
            setSuccessMessage(errorMessage);
            localStorage.setItem('successMessage', errorMessage); // Persist the error message
            setShowPopup(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDismissPreview = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSuccessMessage(null);
        localStorage.removeItem('successMessage'); // Ensure the message is cleared from storage
    };

    return (
        <div className={styles.controlswraper}>
            <form action={handleSubmit} className={styles.controlcontainer}>
                {preview && (
                    <div className={styles.previewContainer}>
                        <img src={preview} alt="Preview" className={styles.previewimg} />
                        <button 
                            type="button" 
                            onClick={handleDismissPreview} 
                            className={styles.dismissBtn}
                            aria-label="Dismiss preview"
                        >
                            <Icon name="close" size={16} fill="#fff" />
                        </button>
                    </div>
                )}

                <div className={styles.uploadbtnwraper}>
                    {preview ? (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.submitbtn} ${isSubmitting ? styles.disabled : ''}`}
                        >
                            {isSubmitting ? 'Creating...' :
                                <Icon name='activeupload' size={30} fill='#fff' />
                            }
                        </button>
                    ) : (
                        <button className={styles.uploadbtn} type="button">
                            <Icon name='upload' size={30} fill='#666' />
                        </button>
                    )}

                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.actualinput}
                        required
                        ref={fileInputRef}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
            
            <SuccessPopup
                message={successMessage}
                isVisible={showPopup}
                onClose={handleClosePopup}
            />
        </div>
    );
};

export default Controls;