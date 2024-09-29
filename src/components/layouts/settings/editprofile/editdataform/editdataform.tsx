'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateProfile } from '@/app/actions/update-profile'
import styles from './editdataform.module.scss'
import { SuccessMessage, ErrorMessage } from '@/components/atoms/messages/messages'

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isFormChanged, setIsFormChanged] = useState(false)

  const { register, handleSubmit, formState: { errors, dirtyFields }, setError, watch } = useForm<FormData>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: initialData,
  })

  const watchedFields = watch()

  useEffect(() => {
    const hasChanges = Object.keys(dirtyFields).length > 0
    setIsFormChanged(hasChanges)
  }, [watchedFields, dirtyFields])

  const onSubmit = async (data: FormData) => {
    if (!isFormChanged) {
      setErrorMessage("No changes detected. Please make changes before submitting.")
      return
    }

    setSuccessMessage(null)
    setErrorMessage(null)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value || ''))
    const result = await updateProfile(formData)
    if ('error' in result) {
      if (typeof result.error === 'object') {
        Object.entries(result.error).forEach(([key, value]) => {
          if (key === 'general') {
            setErrorMessage(value[0] || null)
          } else {
            setError(key as keyof FormData, { type: 'manual', message: value[0] })
          }
        })
      } else {
        setErrorMessage(result.error || null)
      }
    } else {
      setSuccessMessage('Account updated successfully')
    }
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
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
  )
}