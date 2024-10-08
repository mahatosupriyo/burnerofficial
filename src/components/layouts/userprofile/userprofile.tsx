"use client";

import React from 'react'
import { motion } from 'framer-motion'
import styles from './userprofile.module.scss'
import NavBar from '@/components/navbar/navbar'
import Link from 'next/link'
import Logo from '@/components/base/logo'

const UserProfile = () => {

    const dummyImages = [
        "https://images.unsplash.com/photo-1726609939114-78ca262451e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzZ8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1726931598787-00b60840177c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1726243204979-f5d58966aaa2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1714464703034-f74ec8163fc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1725904411459-fe8233df1424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1726915257451-a14bd105ca55?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1726994804363-5c7ce2255254?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1677560517139-1836389bf843?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1726742942147-1f87c0a19d0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1725714355048-6e96f31fb935?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0N3x8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1699566447802-0551b84a186d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2OHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1726853550443-20b90f727b9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
    ];


    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <header className={styles.header}>
                    <p className={styles.username}>
                        supriyomahato
                        <svg xmlns="http://www.w3.org/2000/svg" height="8.4" className={styles.verifiedicon} viewBox="0 0 45 43" fill="none">
                            <path d="M42.3824 16.5932C42.0249 16.0311 41.7262 15.4337 41.4911 14.8105C41.286 14.17 41.1578 13.5074 41.109 12.8367C41.0811 11.2136 40.6116 9.62883 39.7508 8.25253C38.6981 7.00451 37.3264 6.06562 35.7821 5.53598C35.1518 5.29274 34.5475 4.98702 33.9781 4.62339C33.4842 4.19824 33.0296 3.72944 32.6198 3.22267C31.6448 1.89891 30.3227 0.870596 28.7997 0.25144C27.2576 -0.112949 25.6464 -0.0616844 24.1306 0.400002C22.7766 0.718195 21.3673 0.718195 20.0133 0.400002C18.471 -0.0770814 16.8285 -0.128412 15.2594 0.25144C13.7208 0.863839 12.3833 1.8927 11.3968 3.22267C10.9736 3.73133 10.5047 4.20019 9.99606 4.62339C9.42669 4.98702 8.82236 5.29274 8.1921 5.53598C6.64002 6.0622 5.26065 7.00135 4.20216 8.25253C3.36375 9.63528 2.91631 11.2197 2.90756 12.8367C2.85885 13.5074 2.73061 14.17 2.52554 14.8105C2.2878 15.4191 1.98916 16.0022 1.63417 16.5507C0.677289 17.9148 0.112134 19.5149 0 21.1774C0.119722 22.8252 0.684532 24.4096 1.63417 25.7615C1.99733 26.3054 2.29644 26.8893 2.52554 27.5018C2.7102 28.1591 2.81704 28.8358 2.84389 29.518C2.86966 31.1414 3.3394 32.7268 4.20216 34.1022C5.25482 35.3502 6.62649 36.2891 8.17087 36.8188C8.80114 37.062 9.40547 37.3677 9.97483 37.7313C10.4835 38.1545 10.9524 38.6234 11.3756 39.1321C12.344 40.4622 13.6681 41.492 15.1957 42.1033C15.7943 42.2855 16.4164 42.3784 17.0421 42.3792C18.0006 42.3487 18.9534 42.2207 19.886 41.9972C21.2376 41.6593 22.6516 41.6593 24.0033 41.9972C25.5493 42.456 27.1889 42.4999 28.7572 42.1245C30.2848 41.5132 31.6089 40.4834 32.5774 39.1533C33.0006 38.6446 33.4694 38.1758 33.9781 37.7526C34.5475 37.3889 35.1518 37.0832 35.7821 36.84C37.3264 36.3103 38.6981 35.3714 39.7508 34.1234C40.6135 32.748 41.0833 31.1626 41.109 29.5392C41.1359 28.857 41.2427 28.1803 41.4274 27.5231C41.6651 26.9144 41.9638 26.3314 42.3188 25.7828C43.2947 24.4315 43.8819 22.8387 44.0166 21.1774C43.8969 19.5296 43.3321 17.9451 42.3824 16.5932ZM32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="#0075FF" />
                            <path d="M32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="white" />
                        </svg>
                    </p>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrmALnfcZNaxA9xmGx-datABxvszYAklOneA&s"
                        className={styles.avatar}
                        draggable="false"
                    />

                    <div className={styles.userbio}>
                        <h2 className={styles.name}>
                            Darshan Raval
                        </h2>
                        <p className={styles.bio}>
                            Singer and Composer From India
                        </p>
                    </div>

                </header>

                <section className={styles.feed}>
                    <h3 className={styles.sectionhead}>
                        Inspirations
                    </h3>

                    <div className={styles.gridcontainer}>
                        {dummyImages.map((image, index) => (
                            <div key={index} className={styles.griditem}>
                                <img src={image} className={styles.image} />
                            </div>
                        ))}
                    </div>
                    <motion.button
                        whileTap={{ opacity: 0.6 }}
                        className={styles.expandbtn}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.downarrow} viewBox="0 0 107 107" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M70.7222 42.8L54.7888 58.0534L38.7583 42.8972L34.7749 46.8805L54.6917 66.3115L74.8999 46.9777L70.7222 42.8Z" fill="white" />
                        </svg>
                    </motion.button>
                </section>

                <div className={styles.footer}>
                    <Logo width='70' />
                </div>

            </section>
        </div>
    )
}

export default UserProfile
