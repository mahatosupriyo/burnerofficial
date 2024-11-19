'use client'

import { useState } from 'react'
import styles from './user.module.scss'
import { getUsers, type User, type GetUsersParams } from '@/app/actions/admin/user'

type SortField = GetUsersParams['sortField']
type SortOrder = GetUsersParams['sortOrder']

interface UsersTableProps {
  initialUsers: User[]
  initialTotalPages: number
}

const UsersTable = ({ initialUsers, initialTotalPages }: UsersTableProps) => {
  const [users, setUsers] = useState(initialUsers)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = async (params: GetUsersParams) => {
    setIsLoading(true)
    try {
      const { users: newUsers, totalPages: newTotalPages } = await getUsers(params)
      setUsers(newUsers)
      setTotalPages(newTotalPages)
      setCurrentPage(params.page || 1)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSort = async (field: SortField) => {
    const newSortOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(newSortOrder)
    await fetchUsers({ sortField: field, sortOrder: newSortOrder, page: 1 })
  }

  const handlePageChange = async (page: number) => {
    await fetchUsers({ sortField, sortOrder, page })
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('username')}>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name || 'N/A'}</td>
              <td>{user.email || 'N/A'}</td>
              <td>{user.username || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ''}
            disabled={isLoading}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default UsersTable