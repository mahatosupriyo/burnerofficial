import { Suspense } from 'react'
import VerificationRequestList from './requestslist'
import UpdateRejects from './updaterejects'

export default function AdminVerificationRequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Pending Verification Requests</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateRejects />
        <VerificationRequestList />
      </Suspense>
    </div>
  )
}