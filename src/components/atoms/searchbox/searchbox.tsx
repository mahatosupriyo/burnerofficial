"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';
import styles from './searchbox.module.scss';

const SearchBox = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Create a reference for the input element
    const inputRef = useRef<HTMLInputElement>(null);

    // Create a reference for the overlay
    const overlayRef = useRef(null);

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    // Close overlay if click happens outside of it
    useClickAway(overlayRef, () => {
        if (isOpen) setIsOpen(false);
    });

    // Close overlay on "Escape" key press
    // Close overlay on "Escape" key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Focus on the input when the overlay opens
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

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
                Search
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className={styles.backgroundOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        />

                        <motion.div
                            className={styles.overlayContainer}
                            initial={{ opacity: 0, y: '-2%', scale: 0.9 }}
                            animate={{ opacity: 1, y: '0%', scale: 1 }}
                            exit={{ opacity: 0, y: '-2%', scale: 0.9 }}
                            transition={{ duration: 0.16 }}
                        >
                            <div className={styles.overlayContent} ref={overlayRef}>
                                <div
                                    className={styles.searchinput}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchicon} viewBox="0 0 39 39">
                                        <path d="M25.8762 23.8695C27.1206 22.2102 27.8545 20.1538 27.8545 17.9273C27.8545 12.4531 23.4015 8 17.9273 8C12.4531 8 8 12.4531 8 17.9273C8 23.4015 12.4531 27.8545 17.9273 27.8545C20.1538 27.8545 22.2102 27.1171 23.8695 25.8762L28.2694 30.2761C28.5459 30.5526 28.9075 30.6909 29.2727 30.6909C29.6379 30.6909 29.9995 30.5526 30.2761 30.2761C30.8292 29.723 30.8292 28.826 30.2761 28.2694L25.8762 23.8695ZM17.9273 25.0182C14.0166 25.0182 10.8364 21.8379 10.8364 17.9273C10.8364 14.0166 14.0166 10.8364 17.9273 10.8364C21.8379 10.8364 25.0182 14.0166 25.0182 17.9273C25.0182 21.8379 21.8379 25.0182 17.9273 25.0182Z" />
                                    </svg>
                                    <input
                                        spellCheck="false"
                                        ref={inputRef}
                                        type="text"
                                        className={styles.inputarea}
                                        placeholder='Search for series, chapters, ...'
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={{ opacity: 0, y: '-100%' }}
                    // transition={{ duration: 0.2 }}
                    ref={overlayRef}  // Attach the ref to the overlay
                >

                    <motion.button
                        className={styles.searchbox}
                        whileTap={{ opacity: 0.6 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchicon} viewBox="0 0 39 39">
                            <path d="M25.8762 23.8695C27.1206 22.2102 27.8545 20.1538 27.8545 17.9273C27.8545 12.4531 23.4015 8 17.9273 8C12.4531 8 8 12.4531 8 17.9273C8 23.4015 12.4531 27.8545 17.9273 27.8545C20.1538 27.8545 22.2102 27.1171 23.8695 25.8762L28.2694 30.2761C28.5459 30.5526 28.9075 30.6909 29.2727 30.6909C29.6379 30.6909 29.9995 30.5526 30.2761 30.2761C30.8292 29.723 30.8292 28.826 30.2761 28.2694L25.8762 23.8695ZM17.9273 25.0182C14.0166 25.0182 10.8364 21.8379 10.8364 17.9273C10.8364 14.0166 14.0166 10.8364 17.9273 10.8364C21.8379 10.8364 25.0182 14.0166 25.0182 17.9273C25.0182 21.8379 21.8379 25.0182 17.9273 25.0182Z" />
                        </svg>
                        Search
                    </motion.button>

                </motion.div>
            )} */}
        </>
    );
};

export default SearchBox;
