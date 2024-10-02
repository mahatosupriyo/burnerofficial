'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useClickAway } from 'react-use'
import { useDebounce } from 'use-debounce'
import { searchSitemapItems } from '@/app/actions/sitemap/sitemapsearch'
import styles from './searchbox.module.scss'
import Link from 'next/link'
import SearchItemSkeleton from './searchitemskeleton/searchitemskeleton'

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
                    <p></p>
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

                                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchicon} viewBox="0 0 39 39" fill="none">
                                                <path d="M25.8762 23.8695C27.1206 22.2102 27.8545 20.1538 27.8545 17.9273C27.8545 12.4531 23.4015 8 17.9273 8C12.4531 8 8 12.4531 8 17.9273C8 23.4015 12.4531 27.8545 17.9273 27.8545C20.1538 27.8545 22.2102 27.1171 23.8695 25.8762L28.2694 30.2761C28.5459 30.5526 28.9075 30.6909 29.2727 30.6909C29.6379 30.6909 29.9995 30.5526 30.2761 30.2761C30.8292 29.723 30.8292 28.826 30.2761 28.2694L25.8762 23.8695ZM17.9273 25.0182C14.0166 25.0182 10.8364 21.8379 10.8364 17.9273C10.8364 14.0166 14.0166 10.8364 17.9273 10.8364C21.8379 10.8364 25.0182 14.0166 25.0182 17.9273C25.0182 21.8379 21.8379 25.0182 17.9273 25.0182Z" fill="url(#paint0_linear_2942_54)" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_2942_54" x1="3.90303" y1="25.2895" x2="35.1737" y2="23.4313" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#AFA7A1" />
                                                        <stop offset="0.34243" stop-color="#FE4200" />
                                                        <stop offset="0.806666" stop-color="#FF805B" />
                                                        <stop offset="1" stop-color="#98B7C0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>

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
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.closeicon} fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="#1a1a1a" >
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.quicklinkicon} viewBox="0 0 105 105" fill="none">
                                                            <path d="M30.26 81C30.42 81 30.57 81 30.73 81C30.82 81 30.91 81 31.01 81H70.84C76.51 81 81.32 77.14 82.55 71.6L86.81 52.43C87.32 50.12 86.77 47.74 85.29 45.9C83.81 44.06 81.61 43 79.24 43H77V37C77 30.38 71.62 25 65 25H55.56C54.58 25 53.63 24.64 52.9 23.99L47.31 19.02C45.84 17.72 43.96 17 42 17H31C24.38 17 19 22.38 19 29V69.74C19 75.95 24.05 81 30.26 81ZM78.93 51L74.74 69.87C74.33 71.71 72.72 73 70.83 73H41.03C41.11 72.73 41.18 72.46 41.24 72.18L45.95 51H78.93ZM27 29C27 26.79 28.79 25 31 25H42L47.59 29.97C49.79 31.93 52.62 33 55.56 33H65C67.21 33 69 34.79 69 37V43H45.96C42.18 43 38.97 45.58 38.15 49.26L33.44 70.44C33.11 71.94 31.8 72.99 30.26 72.99C28.46 72.99 27 71.53 27 69.73V29Z"/>
                                                        </svg>
                                                        Freebies
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.quicklinkicon} viewBox="0 0 105 105" fill="none">
                                                            <path d="M77.46 34.31C75.01 33.06 73.28 33 68.01 33V32C68.01 28.92 68.01 27.22 67.49 25.52C66.32 21.68 63.33 18.69 59.49 17.52C57.87 17.03 55.7 17 52.01 17C48.32 17 46.15 17.02 44.53 17.52C40.69 18.69 37.7 21.68 36.53 25.52C36.01 27.22 36.01 28.92 36.01 32V33H35.81C31.93 33 29.13 33 26.56 34.31C24.29 35.47 22.47 37.28 21.31 39.55C20 42.12 20 44.84 20 49.8V64.2C20 69.15 20 71.88 21.31 74.45C22.47 76.72 24.28 78.54 26.55 79.69C29.12 81 31.84 81 36.8 81H67.2C72.15 81 74.88 81 77.45 79.69C79.72 78.53 81.54 76.72 82.69 74.45C84 71.88 84 69.16 84 64.2V49.8C84 44.85 84 42.12 82.69 39.55C81.53 37.28 79.72 35.46 77.45 34.31H77.46ZM44.01 32C44.01 29.84 44.01 28.41 44.18 27.84C44.57 26.56 45.56 25.56 46.82 25.18C47.53 25 50.11 25 52 25C53.89 25 56.48 25 57.16 25.17C58.44 25.56 59.44 26.55 59.83 27.84C60 28.41 60 29.84 60 32V33H44V32H44.01ZM76.01 64.2C76.01 67.67 76.01 69.96 75.57 70.82C75.19 71.57 74.57 72.19 73.82 72.57C72.96 73.01 70.67 73.01 67.2 73.01H36.8C33.33 73.01 31.04 73.01 30.18 72.57C29.42 72.18 28.82 71.58 28.43 70.82C27.99 69.96 27.99 67.67 27.99 64.2V49.8C27.99 46.33 27.99 44.04 28.43 43.18C28.82 42.42 29.42 41.82 30.18 41.43C31.04 40.99 33.14 40.99 35.8 40.99H67.2C72.42 40.99 73.04 41.03 73.82 41.43C74.57 41.81 75.19 42.43 75.57 43.18C76.01 44.04 76.01 46.33 76.01 49.8V64.2Z"/>
                                                            <path d="M62.0098 57H42.0098C39.7998 57 38.0098 58.79 38.0098 61C38.0098 63.21 39.7998 65 42.0098 65H62.0098C64.2198 65 66.0098 63.21 66.0098 61C66.0098 58.79 64.2198 57 62.0098 57Z"/>
                                                        </svg>
                                                        Jobs and internships
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.quicklinkicon} viewBox="0 0 105 105" fill="none">
                                                            <path d="M84.97 58.2C84.97 54.78 84.97 52.32 84.81 50.32C84.64 48.21 84.3 46.79 83.67 45.55C82.51 43.28 80.7 41.46 78.43 40.31C77.19 39.68 75.77 39.34 73.66 39.16C71.66 39 69.19 39 65.78 39H64.98V29.23C64.98 24.69 61.29 21 56.75 21C56.13 21 55.51 21.07 54.91 21.21L35.89 25.58C33.19 26.2 31.24 26.65 29.66 27.14C28 27.65 26.88 28.17 25.93 28.86C24.18 30.13 22.81 31.86 21.96 33.85C21.5 34.94 21.25 36.14 21.12 37.87C21.01 39.45 21 41.25 21 44.29V72.2C21 74.7 21 76.18 21.11 77.45C21.22 78.85 21.45 79.8 21.87 80.62C22.64 82.14 23.85 83.35 25.37 84.13C26.19 84.55 27.14 84.77 28.54 84.89C29.81 84.99 31.29 85 33.79 85H72.19C74.69 85 76.17 85 77.44 84.89C78.84 84.78 79.79 84.55 80.62 84.13C82.13 83.36 83.34 82.15 84.12 80.63C84.54 79.81 84.76 78.86 84.88 77.46C84.98 76.19 84.99 74.71 84.99 72.21V58.21L84.97 58.2ZM56.97 77H33.77C31.54 77 30.13 77 29.17 76.92C29.13 76.92 29.1 76.92 29.06 76.92C29.06 76.89 29.06 76.85 29.06 76.81C28.98 75.85 28.98 74.44 28.98 72.21V44.3C28.98 41.52 28.98 39.76 29.08 38.46C29.16 37.37 29.28 37.05 29.3 36.99C29.58 36.33 30.04 35.75 30.63 35.33C30.68 35.3 30.97 35.11 32.01 34.79C33.31 34.39 35.24 33.95 37.68 33.39L56.75 29.02C56.88 29.02 56.98 29.12 56.98 29.25V77.02L56.97 77ZM76.97 72.2C76.97 74.43 76.97 75.84 76.89 76.8C76.89 76.84 76.89 76.87 76.89 76.91C76.86 76.91 76.82 76.91 76.78 76.91C75.82 76.99 74.41 76.99 72.18 76.99H64.98V46.99H65.78C69.01 46.99 71.34 46.99 73.01 47.13C74.42 47.25 74.78 47.42 74.8 47.43C75.55 47.81 76.17 48.43 76.55 49.18C76.55 49.19 76.73 49.55 76.85 50.97C76.99 52.64 76.99 54.97 76.99 58.2V72.2H76.97Z"/>
                                                            <path d="M44.9697 43H40.9697C38.7597 43 36.9697 44.79 36.9697 47C36.9697 49.21 38.7597 51 40.9697 51H44.9697C47.1797 51 48.9697 49.21 48.9697 47C48.9697 44.79 47.1797 43 44.9697 43Z"/>
                                                            <path d="M44.9697 59H40.9697C38.7597 59 36.9697 60.79 36.9697 63C36.9697 65.21 38.7597 67 40.9697 67H44.9697C47.1797 67 48.9697 65.21 48.9697 63C48.9697 60.79 47.1797 59 44.9697 59Z"/>
                                                        </svg>
                                                        Campus ambassador
                                                    </div>

                                                    <div className={styles.quicklink}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.quicklinkicon} viewBox="0 0 105 105" fill="none">
                                                            <path d="M65.9997 77.6497L61.9997 32.6497C61.9068 31.5888 61.3964 30.6083 60.5806 29.9238C59.7648 29.2392 58.7105 28.9068 57.6497 28.9997C56.5888 29.0925 55.6083 29.6029 54.9238 30.4187C54.2392 31.2345 53.9068 32.2888 53.9997 33.3497L57.9997 78.3497C58.0874 79.3487 58.5473 80.2784 59.2881 80.9544C60.029 81.6305 60.9967 82.0035 61.9997 81.9997C62.1195 82.0096 62.2399 82.0096 62.3597 81.9997C62.8848 81.9544 63.3959 81.8058 63.8634 81.5624C64.3309 81.319 64.7457 80.9856 65.084 80.5814C65.4223 80.1772 65.6773 79.7101 65.8344 79.2069C65.9916 78.7038 66.0477 78.1746 65.9997 77.6497Z"/>
                                                            <path d="M84.9303 77.28L77.9303 39.28C77.8584 38.7433 77.6783 38.2269 77.4008 37.762C77.1234 37.297 76.7545 36.8932 76.3164 36.5751C75.8784 36.2569 75.3803 36.031 74.8523 35.911C74.3244 35.791 73.7775 35.7794 73.245 35.877C72.7124 35.9746 72.2052 36.1792 71.7541 36.4786C71.303 36.778 70.9173 37.1658 70.6205 37.6186C70.3237 38.0714 70.1219 38.5798 70.0273 39.1129C69.9327 39.6459 69.9474 40.1927 70.0703 40.72L77.0703 78.72C77.2387 79.6399 77.724 80.4717 78.442 81.0709C79.1599 81.6701 80.0652 81.9989 81.0003 82C81.2454 82.002 81.4901 81.9785 81.7303 81.93C82.7702 81.7356 83.6907 81.1372 84.2905 80.2657C84.8902 79.3942 85.1203 78.3207 84.9303 77.28Z"/>
                                                            <path d="M31 82H37C39.6522 82 42.1957 80.9464 44.0711 79.0711C45.9464 77.1957 47 74.6522 47 72V32C47 29.3478 45.9464 26.8043 44.0711 24.9289C42.1957 23.0536 39.6522 22 37 22H31C28.3478 22 25.8043 23.0536 23.9289 24.9289C22.0536 26.8043 21 29.3478 21 32V72C21 74.6522 22.0536 77.1957 23.9289 79.0711C25.8043 80.9464 28.3478 82 31 82ZM29 32C29 31.4696 29.2107 30.9609 29.5858 30.5858C29.9609 30.2107 30.4696 30 31 30H37C37.5304 30 38.0391 30.2107 38.4142 30.5858C38.7893 30.9609 39 31.4696 39 32V72C39 72.5304 38.7893 73.0391 38.4142 73.4142C38.0391 73.7893 37.5304 74 37 74H31C30.4696 74 29.9609 73.7893 29.5858 73.4142C29.2107 73.0391 29 72.5304 29 72V32Z"/>
                                                        </svg>
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
