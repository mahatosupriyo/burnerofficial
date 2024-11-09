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
    const [caption, setCaption] = useState('');
    const [link, setLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const persistedMessage = localStorage.getItem('postMessage');
        if (persistedMessage) {
            setMessage(persistedMessage);
            setShowPopup(true);
            localStorage.removeItem('postMessage');
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
        setMessage(null);
        try {
            if (caption) formData.append('caption', caption);
            if (link) formData.append('link', link);
            const result = await createPost(formData);
            if (result.success) {
                setMessage(result.message);
                localStorage.setItem('postMessage', result.message);
                setShowPopup(true);
                router.refresh();
                setPreview(null);
                setCaption('');
                setLink('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error creating post:', error);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setMessage(errorMessage);
            localStorage.setItem('postMessage', errorMessage);
            setShowPopup(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDismissPreview = () => {
        setPreview(null);
        setCaption('');
        setLink('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setMessage(null);
        localStorage.removeItem('postMessage');
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

                {preview && (
                    <div className={styles.postinputcontainer}>
                        <input
                            type="text"
                            placeholder="something about it"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className={styles.postInput}
                            disabled={isSubmitting}
                        />

                        <input
                            type="url"
                            placeholder="source of it"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className={styles.postInput}
                            disabled={isSubmitting}
                        />
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
                        <label htmlFor="file" className={styles.uploadbtn}>
                            <Icon name='upload' size={30} fill='#666' />
                        </label>
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
                message={message}
                isVisible={showPopup}
                onClose={handleClosePopup}
            />
        </div>
    );
};

export default Controls;