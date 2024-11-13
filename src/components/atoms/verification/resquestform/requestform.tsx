'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './requestform.module.scss'
import { submitVerificationRequest } from '@/app/actions/verification/verification'

export default function VerificationRequestForm() {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitVerificationRequest(reason)

      router.push('/settings/editprofile')
    } catch (error) {

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.requestform}>
      <input
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Why should you be verified?"
        required
        className={styles.inputbox}
      />
      <button className={styles.btn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Verification Request'}
      </button>
    </form>
  )
}