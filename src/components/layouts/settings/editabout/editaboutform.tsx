'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateAbout, generateAbout } from '@/app/actions/update-about'
import { useState, useEffect } from 'react'
import styles from './editaboutform.module.scss'
import Icon from '@/components/atoms/icons'

const aboutSchema = z.object({
  about: z.string().max(500).optional(),
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
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialData
  })

  const watchedFields = watch()
  const aboutContent = watch('about')

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

  const handleGenerate = async () => {
    if (aboutContent && aboutContent.trim().split(/\s+/).length >= 5) {
      setIsGenerating(true)
      try {
        const generatedAbout = await generateAbout(aboutContent)
        setValue('about', generatedAbout)
        setError(null)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to generate about content')
      } finally {
        setIsGenerating(false)
      }
    }
  }

  // const isGenerateDisabled = !aboutContent || aboutContent.trim().split(/\s+/).length < 5
  const wordCount = aboutContent ? aboutContent.trim().split(/\s+/).length : 0
  const isGenerateDisabled = wordCount < 5

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutform}>
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
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerateDisabled || isGenerating}
            className={`${styles.generatebtn} ${isGenerateDisabled ? styles.insufficientWords : ''} ${isGenerating ? styles.generating : ''}`}
          >
            {isGenerating ? (
              <div className={styles.generating}>
                <Icon name='generate' size={28} />
              </div>
            )
              :
              (
                <Icon name='generate' size={28} />
              )

            }
          </button>
        </div>

        <p style={{opacity: 0}}>
          {wordCount} word{wordCount !== 1 ? 's' : ''} {isGenerateDisabled ? '(minimum 5 required)' : ''}
        </p>

        {errors.about && <p className="mt-1 text-sm text-red-600">{errors.about.message}</p>}
      </div>


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
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
      </div>

      <div className={styles.formsection}>
        <label htmlFor="work" className={styles.label}>Work</label>
        <input
          type="text"
          id="work"
          {...register('work')}
          autoComplete="off"
          spellCheck="false"
          className={styles.inputbox}
        />
        {errors.work && <p className="mt-1 text-sm text-red-600">{errors.work.message}</p>}
      </div>

      <div style={{ paddingTop: '4rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <h4 style={{ fontSize: '1.66rem', fontWeight: 500 }}>Social links</h4>
        <p style={{ opacity: 0.46, fontSize: '1.46rem', fontWeight: 400 }}>paste your social media links</p>
      </div>


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
        {errors.instagram && <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>}
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
        {errors.x && <p className="mt-1 text-sm text-red-600">{errors.x.message}</p>}
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
        {errors.youtube && <p className="mt-1 text-sm text-red-600">{errors.youtube.message}</p>}
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
        {errors.dribbble && <p className="mt-1 text-sm text-red-600">{errors.dribbble.message}</p>}
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
        {errors.behance && <p className="mt-1 text-sm text-red-600">{errors.behance.message}</p>}
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
        {errors.linkedin && <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>}
      </div>


      <div className={styles.buttons}>
        <button
          type="submit"
          className={`${styles.btn} ${!isFormChanged ? styles.disabledbtn : ''}`}
        >

          Update
        </button>
      </div>


      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {success && <p className="mt-2 text-sm text-green-600">Profile updated successfully!</p>}
    </form>
  )
}