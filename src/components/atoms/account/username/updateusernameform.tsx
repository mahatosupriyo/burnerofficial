'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateUsername } from '@/app/actions/update-username'
import styles from './usernameform.module.scss'

const updateUsernameSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
})

type FormData = z.infer<typeof updateUsernameSchema>

type UpdateUsernameResult = {
  error?: string;
  success?: string;
}

export default function UpdateUsernameForm() {
  const [message, setMessage] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(updateUsernameSchema),
  })

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()
    formData.append('username', data.username)

    const result = await updateUsername(formData) as UpdateUsernameResult

    if (result.error) {
      setMessage(result.error)
    } else if (result.success) {
      setMessage(result.success)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.inputwraper}>
      <div className={styles.formcontainer}>
        <label className={styles.label} htmlFor="username">
          username (*)
        </label>
        <div className={styles.inputbox}>
          <input
            {...register('username')}
            type="text"
            placeholder="enter your username"
            id="username"
            autoComplete='false'
            autoCorrect='false'
            spellCheck="false"
            className={styles.inputarea}
          />
        </div>

      </div>


      <div className={styles.bottomlayer}>
        <div className={styles.messagewraper}>
          {errors.username && (
            <p className={styles.message}>{errors.username.message}</p>
          )}
          {message && (
            <p className={styles.message}>
              {message}
            </p>
          )}
        </div>

        {/* <button
          className={styles.submitbtn}
          type="submit"
        >
          Save
        </button> */}
      </div>


    </form>
  )
}