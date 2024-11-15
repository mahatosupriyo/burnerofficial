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
      <div className={styles.subcontainer}>
        <label className={styles.label}>something special about you</label>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className={styles.inputbox}
        />
      </div>

      <button className={styles.updatebtn} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Verification Request'}
      </button>
    </form>
  )
}