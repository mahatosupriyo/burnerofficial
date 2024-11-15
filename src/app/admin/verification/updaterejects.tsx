"use client"

import React, { useState, useEffect } from 'react'
import { bulkUpdateRejectedRequests, getRejectedRequestsCounts } from '@/app/actions/verification/verification'

const UpdateRejects = () => {
    const [isUpdating, setIsUpdating] = useState(false)
    const [eligibleForUpdate, setEligibleForUpdate] = useState(0)
    const [totalRejected, setTotalRejected] = useState(0)

    useEffect(() => {
        fetchCounts()
    }, [])

    const fetchCounts = async () => {
        const counts = await getRejectedRequestsCounts()
        setEligibleForUpdate(counts.eligibleForUpdate)
        setTotalRejected(counts.totalRejected)
    }

    const handleBulkUpdate = async () => {
        setIsUpdating(true)
        try {
            const result = await bulkUpdateRejectedRequests()
            if (result.success) {
                console.log('Updated successfully')
                setEligibleForUpdate(result.eligibleForUpdate)
                setTotalRejected(result.totalRejected)
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            console.error('Error updating rejected requests:', error)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleBulkUpdate}
                disabled={isUpdating || eligibleForUpdate === 0}
                style={{ background: '#fff', color: '#000', padding: '2rem', cursor: 'pointer' }}
            >
                {isUpdating
                    ? 'Updating...'
                    : `Update ${eligibleForUpdate} Rejected Requests out of ${totalRejected}.`}
            </button>
        </div>
    )
}

export default UpdateRejects