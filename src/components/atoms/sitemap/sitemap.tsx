'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { searchSitemapItems } from '@/app/actions/sitemap/sitemapsearch'
import styles from './sitemap.module.scss'

interface SitemapItem {
  id: string
  name: string
  label: string
  url: string
  createdAt: Date
  updatedAt: Date
}

export function Sitemap() {
  const [items, setItems] = useState<SitemapItem[]>([])
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)
  const [error, setError] = useState<string | null>(null)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [isInitialState, setIsInitialState] = useState(true)

  const fetchItems = useCallback(async (query: string) => {
    if (isRateLimited) return

    try {
      const result = await searchSitemapItems(query)
      if ('error' in result) {
        setError(result.error)
        setItems([])
      } else {
        setError(null)
        setItems(result.items)
      }
      setIsInitialState(false)
    } catch (error) {
      if (error instanceof Response && error.status === 429) {
        setIsRateLimited(true)
        setError('You have exceeded the search limit. Please try again later.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
      setItems([])
      setIsInitialState(false)
    }
  }, [isRateLimited])

  useEffect(() => {
    if (debouncedSearch.trim() !== '') {
      fetchItems(debouncedSearch)
    } else {
      setItems([])
      setError(null)
      setIsInitialState(true)
    }
  }, [debouncedSearch, fetchItems])

  return (
    <div className={styles.sitemap}>
      <h2 className={styles.title}>Sitemap</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sitemap..."
          className={styles.searchInput}
          aria-label="Search sitemap"
          disabled={isRateLimited}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {!error && isInitialState && (
        <div className={styles.empty}>Search something.</div>
      )}
      {!error && !isInitialState && items.length === 0 && (
        <div className={styles.empty}>No results found.</div>
      )}
      {items.length > 0 && (
        <ul className={styles.itemList}>
          {items.map((item: SitemapItem) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.label}>{item.label}</span>
              <a href={item.url} className={styles.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}