'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfile } from '@/app/actions/update-profile';
import styles from './editdataform.module.scss';
import SuccessPopup from '@/app/success/successpop'; // Assuming this handles both success and error messages

const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_.]+$/,
    "Username must be 3-20 characters and can only contain letters, numbers, underscores, and dots"),
});

type FormData = z.infer<typeof UpdateProfileSchema>;

interface EditProfileFormProps {
  initialData: {
    name: string;
    email: string;
    username: string;
  };
}

export default function EditProfileForm({ initialData }: EditProfileFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { register, handleSubmit, formState: { errors, dirtyFields }, setError, watch } = useForm<FormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: initialData,
  });

  const watchedFields = watch();

  useEffect(() => {
    const hasChanges = Object.keys(dirtyFields).length > 0;
    setIsFormChanged(hasChanges);
  }, [watchedFields, dirtyFields]);

  // Check for persisted success or error message on component mount
  useEffect(() => {
    const persistedMessage = localStorage.getItem('successMessage');
    if (persistedMessage) {
      setSuccessMessage(persistedMessage);
      setShowPopup(true);
      localStorage.removeItem('successMessage'); // Clear the persisted message
    }
    const persistedErrorMessage = localStorage.getItem('errorMessage');
    if (persistedErrorMessage) {
      setErrorMessage(persistedErrorMessage);
      setShowPopup(true);
      localStorage.removeItem('errorMessage'); // Clear the persisted error message
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!isFormChanged) {
      setErrorMessage("Please make changes before submitting.");
      localStorage.setItem('errorMessage', "No changes detected.");
      setShowPopup(true);
      return;
    }

    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value || ''));

    const result = await updateProfile(formData);

    if ('error' in result) {
      if (typeof result.error === 'object') {
        Object.entries(result.error).forEach(([key, value]) => {
          if (key === 'general') {
            setErrorMessage(value[0] || null);
            localStorage.setItem('errorMessage', value[0]);
          } else {
            setError(key as keyof FormData, { type: 'manual', message: value[0] });
          }
        });
      } else {
        setErrorMessage(result.error || null);
        localStorage.setItem('errorMessage', result.error || 'Error occurred');
      }
      setShowPopup(true);
    } else {
      const message = 'Account updated successfully';
      setSuccessMessage(message);
      localStorage.setItem('successMessage', message); // Persist the success message
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSuccessMessage(null);
    setErrorMessage(null);
    localStorage.removeItem('successMessage'); // Ensure both messages are cleared from storage
    localStorage.removeItem('errorMessage');
  };

  return (
    <form style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)}>
      {successMessage || errorMessage ? (
        <SuccessPopup
          message={successMessage || errorMessage}
          isVisible={showPopup}
          onClose={handleClosePopup}
        />
      ) : null}

      <div className={styles.data}>
        <div className={styles.subcontainer}>
          <label className={styles.label}>name</label>
          <input {...register('name')} className={styles.inputbar} required />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.subcontainer}>
          <label className={styles.label}>username</label>
          <input spellCheck="false" autoComplete='off' style={{ textTransform: 'lowercase' }} {...register('username')} className={styles.inputbar} required />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>

        <div className={styles.subcontainer}>
          <label className={styles.label}>email</label>
          <input autoComplete='off' spellCheck="false" disabled style={{ cursor: 'not-allowed' }} {...register('email')} className={styles.inputbar} required type="email" />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          type="submit"
          className={`${styles.btn} ${!isFormChanged ? styles.disabledbtn : ''}`}
          disabled={!isFormChanged}
        >
          Update
        </button>
      </div>
    </form>
  );
}
