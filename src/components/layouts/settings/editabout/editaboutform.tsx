'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateAbout } from '@/app/actions/update-about'
import { useState, useEffect } from 'react'
import styles from './editaboutform.module.scss'

const aboutSchema = z.object({
  about: z.string().max(150).optional(),
  location: z.string().max(100).optional(),
  work: z.string().max(100).optional(),
  instagram: z.string().url().optional().or(z.literal('')),
  behance: z.string().url().optional().or(z.literal('')),
  x: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  dribbble: z.string().url().optional().or(z.literal(''))
})

type AboutFormData = z.infer<typeof aboutSchema>

export default function UpdateAboutForm({ userId, initialData }: { userId: string, initialData?: AboutFormData }) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialData
  })

  const watchedFields = watch()

  useEffect(() => {
    setIsFormChanged(JSON.stringify(watchedFields) !== JSON.stringify(initialData))
  }, [watchedFields, initialData])

  const onSubmit = async (data: AboutFormData) => {
    try {
      const dataToSubmit = {
        ...data,
        about: data.about || '', // Provide a default empty string if about is undefined
      };
      await updateAbout(userId, dataToSubmit);
      setSuccess(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutform}>
      <div className={styles.inputswraper}>

        <div className={styles.formsection}>
          <label htmlFor="about" className={styles.label}>About</label>
          <div className={styles.subwrapergen}>
            <textarea
              id="about"
              {...register('about')}
              className={styles.textarea}
              autoComplete="off"
              placeholder='something about you'
              spellCheck="false"
            />

          </div>
        </div>

        <div className={styles.gridwraper}>


          <div className={styles.formsection}>
            <label htmlFor="location" className={styles.label}>Location</label>
            <input
              type="text"
              id="location"
              {...register('location')}
              autoComplete="off"
              spellCheck="false"
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="work" className={styles.label}>profession</label>
            <input
              type="text"
              id="work"
              {...register('work')}
              autoComplete="off"
              spellCheck="false"
              className={styles.inputbox}
            />
          </div>

        </div>

        <div style={{ paddingTop: '4rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <h4 style={{ fontSize: '1.66rem', fontWeight: 500 }}>Social links</h4>
          <p style={{ opacity: 0.46, fontSize: '1.46rem', fontWeight: 400 }}>paste your social media links</p>
        </div>

        <div className={styles.gridwraper}>

          <div className={styles.formsection}>
            <label htmlFor="instagram" className={styles.label}>Instagram</label>
            <input
              type="text"
              id="instagram"
              autoComplete="off"
              spellCheck="false"
              {...register('instagram')}
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="x" className={styles.label}>x</label>
            <input
              type="text"
              id="x"
              autoComplete="off"
              spellCheck="false"
              {...register('x')}
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="youtube" className={styles.label}>Youtube</label>
            <input
              type="text"
              id="youtube"
              autoComplete="off"
              spellCheck="false"
              {...register('youtube')}
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="dribbble" className={styles.label}>Dribbble</label>
            <input
              type="text"
              id="dribbble"
              autoComplete="off"
              spellCheck="false"
              {...register('dribbble')}
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="behance" className={styles.label}>Behance</label>
            <input
              type="text"
              id="behance"
              autoComplete="off"
              spellCheck="false"
              {...register('behance')}
              className={styles.inputbox}
            />
          </div>

          <div className={styles.formsection}>
            <label htmlFor="linkedin" className={styles.label}>Linkedin</label>
            <input
              type="text"
              id="linkedin"
              autoComplete="off"
              spellCheck="false"
              {...register('linkedin')}
              className={styles.inputbox}
            />
          </div>


          {error && <p>{error}</p>}
          {success && <p>Profile updated successfully!</p>}

        </div>
      </div>


      <button
        type="submit"
        className={`${styles.updatebtn} ${!isFormChanged ? styles.disabledbtn : ''}`}
      >

        Update
      </button>


    </form>
  )
}