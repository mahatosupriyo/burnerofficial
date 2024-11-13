'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { approveVerificationRequest, rejectVerificationRequest, getPendingVerificationRequests } from '@/app/actions/verification/verification'

type VerificationRequest = {
  id: string
  user: {
    id: string
    name: string | null
    email: string | null
    username: string | null
    location: string | null
  }
  reason: string
}

export default function VerificationRequestList() {
  const [pendingRequests, setPendingRequests] = useState<VerificationRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPendingRequests()
  }, [])

  async function fetchPendingRequests() {
    try {
      const requests = await getPendingVerificationRequests()
      setPendingRequests(requests)
    } catch (error) {
      setError('Failed to load verification requests')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleApprove(id: string) {
    try {
      await approveVerificationRequest(id)
      setPendingRequests(prev => prev.filter(req => req.id !== id))
    } catch (error) {
      setError('Failed to approve request')
    }
  }

  async function handleReject(id: string) {
    try {
      await rejectVerificationRequest(id)
      setPendingRequests(prev => prev.filter(req => req.id !== id))
    } catch (error) {
      setError('Failed to reject request')
    }
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>

  if (pendingRequests.length === 0) return <div>No pending requests</div>

  return (
    <ul className="space-y-6">
      {pendingRequests.map((request) => (
        <li key={request.id} className="border p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="font-semibold">Username</h3>
              <p>{request.user.username || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{request.user.name || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{request.user.email || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>{request.user.location || 'N/A'}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Reason for Verification</h3>
            <p className="mt-1">{request.reason}</p>
          </div>
          <div className="mt-4 space-x-4">
            <button 
              onClick={() => handleApprove(request.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approve
            </button>
            <button 
              onClick={() => handleReject(request.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}