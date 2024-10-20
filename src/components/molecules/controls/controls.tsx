'use client';

import { useState, useRef } from 'react';
import { createPost } from '@/app/actions/post';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './controls.module.scss';
import Icon from '@/components/atoms/icons';
import SuccessPopup from '@/app/success/successpop'; // Import SuccessPopup

const Controls = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

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
            setSuccessMessage('Post created successfully!');
            setShowPopup(true); // Show success popup
            router.refresh();
            setPreview(null); // Reset preview
            // Reset the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setSuccessMessage('Failed to create post. Please try again.');
            setShowPopup(true); // Show error popup
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
                onClose={() => {
                    setShowPopup(false);
                    setSuccessMessage(null);
                }} 
            />
        </div>
    );
};

export default Controls;
