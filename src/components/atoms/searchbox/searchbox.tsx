'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from 'react-use'
import { useDebounce } from 'use-debounce'
import { searchSitemapItems } from '@/app/actions/sitemap/sitemapsearch'
import styles from './searchbox.module.scss'
import Link from 'next/link'
import SearchItemSkeleton from './searchitemskeleton/searchitemskeleton'
import Icon from '../icons'

interface SitemapItem {
    id: string
    name: string
    label: string
    url: string
    thumbnail: string | null
    createdAt: Date
    updatedAt: Date
}

const SearchBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState<SitemapItem[]>([])
    const [search, setSearch] = useState('')
    const [debouncedSearch] = useDebounce(search, 300)
    const [error, setError] = useState<string | null>(null)
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [isInitialState, setIsInitialState] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    // Toggle the search overlay
    const toggleOverlay = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    // Click outside handler for closing overlay
    useClickAway(overlayRef, () => {
        if (isOpen) setIsOpen(false)
    })

    // Fetch items using the search query
    const fetchItems = useCallback(async (query: string) => {
        if (isRateLimited || query.trim() === '') return

        setIsLoading(true)
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
        } finally {
            setIsLoading(false)
            // Re-focus the input after fetch
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }
    }, [isRateLimited])

    // Handle the debounced search query
    useEffect(() => {
        if (debouncedSearch.trim() !== '') {
            fetchItems(debouncedSearch)
        } else {
            setItems([])
            setError(null)
            setIsInitialState(true)
            setIsLoading(false)
        }
    }, [debouncedSearch, fetchItems])

    // Handle opening the search box with `/` and closing with `Esc`
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === '/' && !isOpen) {
                setIsOpen(true)
                event.preventDefault()
            } else if (event.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    return (
        <>
            <motion.button
                className={styles.searchbox}
                whileTap={{ opacity: 0.6 }}
                onClick={toggleOverlay}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchicon} viewBox="0 0 39 39">
                    <path d="M25.8762 23.8695C27.1206 22.2102 27.8545 20.1538 27.8545 17.9273C27.8545 12.4531 23.4015 8 17.9273 8C12.4531 8 8 12.4531 8 17.9273C8 23.4015 12.4531 27.8545 17.9273 27.8545C20.1538 27.8545 22.2102 27.1171 23.8695 25.8762L28.2694 30.2761C28.5459 30.5526 28.9075 30.6909 29.2727 30.6909C29.6379 30.6909 29.9995 30.5526 30.2761 30.2761C30.8292 29.723 30.8292 28.826 30.2761 28.2694L25.8762 23.8695ZM17.9273 25.0182C14.0166 25.0182 10.8364 21.8379 10.8364 17.9273C10.8364 14.0166 14.0166 10.8364 17.9273 10.8364C21.8379 10.8364 25.0182 14.0166 25.0182 17.9273C25.0182 21.8379 21.8379 25.0182 17.9273 25.0182Z" />
                </svg>
                <div className={styles.searchboxContent}>
                    <p className={styles.shortcutKey}>/</p>
                </div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <div className={styles.presencecontainer}>
                        <motion.div
                            className={styles.backgroundOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.16 }}
                        />

                        <motion.div
                            className={styles.overlayContainer}
                            initial={{ opacity: 0, y: '-2%', scale: 0.96 }}
                            animate={{ opacity: 1, y: '0%', scale: 1 }}
                            exit={{ opacity: 0, y: '-2%', scale: 0.96 }}
                            transition={{ duration: 0.16 }}
                        >
                            <div className={styles.overlayContent} ref={overlayRef}>
                                <div className={styles.toplayer}>

                                    <div className={styles.inputbarwraper}>
                                        <div className={styles.mainsearch}>

                                            <Icon name='activesearch' size={24} />

                                            <input
                                                ref={inputRef}
                                                type="text"
                                                className={styles.inputcontainer}
                                                placeholder="Search"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                onFocus={() => setError(null)}
                                            />
                                        </div>
                                    </div>

                                    <button className={styles.closebtn} onClick={() => setIsOpen(false)}>
                                        <Icon name='close' size={16} fill='#333333' />
                                    </button>

                                </div>


                                <div className={styles.bottomlayer}>
                                    <div className={styles.drops}>
                                        {isLoading && <SearchItemSkeleton />}
                                        {error && <div className={styles.error}>{error}</div>}
                                        {isInitialState && items.length === 0 && (
                                            <div className={styles.empty} style={{ fontSize: '1.46rem', fontWeight: 500 }}>
                                                Popular

                                                <div className={styles.quicklinkscontainer}>
                                                    <div className={styles.quicklink}>
                                                        <Icon name='freebies' fill='#808080' size={24} />
                                                        Freebies
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <Icon name='job' fill='#808080' size={24} />
                                                        Jobs and internships
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <Icon name='campus' fill='#808080' size={24} />

                                                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.6rem', }}>
                                                            Campus ambassador <span className={styles.new}>NEW</span>
                                                        </div>
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <Icon name='store' fill='#808080' size={24} />
                                                        Store
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                        {!isLoading && items.length > 0 && (
                                            <div className={styles.dropswraper}>
                                                {items.map((item, index) => (
                                                    <Link href={item.url} key={item.id} className={styles.drop}>
                                                        <p className={styles.index}>{index + 1}</p>
                                                        {item.thumbnail ? (
                                                            <img
                                                                src={item.thumbnail}
                                                                alt={`Thumbnail for ${item.name}`}
                                                                className={styles.thumbnail}
                                                            />
                                                        ) : (
                                                            <div className={styles.placeholderthumb}>No Image</div>
                                                        )}
                                                        <div className={styles.seriesdetails}>
                                                            <div className={styles.toplayer}>
                                                                <h2 className={styles.seriestitle}>{item.name}</h2>
                                                                <p className={styles.subheading}>{item.label}</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>


                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default SearchBox
