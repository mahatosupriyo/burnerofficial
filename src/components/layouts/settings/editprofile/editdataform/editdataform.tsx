'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateProfile } from '@/app/actions/update-profile';
import styles from './editdataform.module.scss';
import toast from 'react-hot-toast';

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
  const [isFormChanged, setIsFormChanged] = useState(false);

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
      toast.success(persistedMessage);
      localStorage.removeItem('successMessage');
    }
    const persistedErrorMessage = localStorage.getItem('errorMessage');
    if (persistedErrorMessage) {
      toast.error(persistedErrorMessage);
      localStorage.removeItem('errorMessage');
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    if (!isFormChanged) {
      toast.error("Please make changes before submitting.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value || ''));

    const result = await updateProfile(formData);

    if ('error' in result) {
      if (typeof result.error === 'object') {
        Object.entries(result.error).forEach(([key, value]) => {
          if (key === 'general') {
            toast.error(value[0] || 'An error occurred');
          } else {
            setError(key as keyof FormData, { type: 'manual', message: value[0] });
          }
        });
      } else {
        toast.error(result.error || 'An error occurred');
      }
    } else {
      toast.success('Account updated successfully');
    }
  };

  return (
    <form className={styles.editaccountform} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.datawraper}>
        <div className={styles.subcontainer}>
          <label className={styles.label}>name</label>
          <div className={styles.box}>
            <input {...register('name')} className={styles.inputbox} required />
          </div>
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.subcontainer}>
          <label className={styles.label}>username</label>
          <div className={styles.box} style={{ paddingLeft: '1.6rem' }}>
            eduburner.org/
            <input spellCheck="false" autoComplete='off' style={{ textTransform: 'lowercase' }} {...register('username')} className={styles.usernameinputbox} required />
          </div>
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        className={`${styles.updatebtn} ${!isFormChanged ? styles.disabledbtn : ''}`}
        disabled={!isFormChanged}
      >
        Update
      </button>
    </form>
  );
}

