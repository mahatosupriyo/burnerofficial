import { Suspense } from 'react'
import VerificationRequestList from './requestslist'

export default function AdminVerificationRequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Pending Verification Requests</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationRequestList />
      </Suspense>
    </div>
  )
}