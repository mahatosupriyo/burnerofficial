'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateProfile } from '@/app/actions/update-profile'
import styles from './editdataform.module.scss'

const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_.]+$/, 
    "Username must be 3-20 characters and can only contain letters, numbers, underscores, and dots"),
})

type FormData = z.infer<typeof UpdateProfileSchema>

interface EditProfileFormProps {
  initialData: {
    name: string
    email: string
    username: string
  }
}

export default function EditProfileForm({ initialData }: EditProfileFormProps) {
  const [generalError, setGeneralError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: FormData) => {
    setGeneralError(null)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value || ''))
    const result = await updateProfile(formData)
    if ('error' in result) {
      if (typeof result.error === 'object') {
        Object.entries(result.error).forEach(([key, value]) => {
          if (key === 'general') {
            setGeneralError(value[0] || null)
          } else {
            setError(key as keyof FormData, { type: 'manual', message: value[0] })
          }
        })
      } else {
        setGeneralError(result.error || null)
      }
    } else {
      // Handle success (e.g., show success message, redirect)
      console.log('Profile updated successfully')
    }
  }

  return (
    <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
      {generalError && <p className={styles.error}>{generalError}</p>}
      <div className={styles.data}>
        <div className={styles.subcontainer}>
          <label className={styles.label}>name</label>
          <input {...register('name')} className={styles.inputbar} required />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.subcontainer}>
          <label className={styles.label}>email</label>
          <input {...register('email')} className={styles.inputbar} required type="email" />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.subcontainer}>
          <label className={styles.label}>username</label>
          <input {...register('username')} className={styles.inputbar} required />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
        </div>
      </div>
      <div className={styles.buttons}>
        <button type="submit" className={styles.btn}>
          Update
        </button>
      </div>
    </form>
  )
}