'use client'
import React from 'react'
import styles from './settingslayout..module.scss'
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
// import { auth } from "@/auth"

export default function SettingsLayout()  {
    const { data: session, status } = useSession()
    // const session = await auth()

    const getFirstName = (name: string | null | undefined) => {
        if (!name) return ''
        return name.split(' ')[0]
    }

    return (
        <div className={styles.settingscontainer}>
            <div className={styles.settingswraper}>

                {status === 'authenticated' && session?.user ? (

                    <div className={styles.usersessiondata}>
                        <div className={styles.subwraper}>
                            {session.user.image ? (
                                <img
                                    src={session.user.image} draggable="false"
                                    className={styles.avatar}
                                />
                            ) : (
                                <div className={styles.avatarFallback}>
                                    {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                                </div>
                            )}

                            <p className={styles.subhead}>
                                supriyomahato
                                <svg xmlns="http://www.w3.org/2000/svg" height="10" className={styles.verifiedicon} viewBox="0 0 45 43" fill="none">
                                    <path d="M42.3824 16.5932C42.0249 16.0311 41.7262 15.4337 41.4911 14.8105C41.286 14.17 41.1578 13.5074 41.109 12.8367C41.0811 11.2136 40.6116 9.62883 39.7508 8.25253C38.6981 7.00451 37.3264 6.06562 35.7821 5.53598C35.1518 5.29274 34.5475 4.98702 33.9781 4.62339C33.4842 4.19824 33.0296 3.72944 32.6198 3.22267C31.6448 1.89891 30.3227 0.870596 28.7997 0.25144C27.2576 -0.112949 25.6464 -0.0616844 24.1306 0.400002C22.7766 0.718195 21.3673 0.718195 20.0133 0.400002C18.471 -0.0770814 16.8285 -0.128412 15.2594 0.25144C13.7208 0.863839 12.3833 1.8927 11.3968 3.22267C10.9736 3.73133 10.5047 4.20019 9.99606 4.62339C9.42669 4.98702 8.82236 5.29274 8.1921 5.53598C6.64002 6.0622 5.26065 7.00135 4.20216 8.25253C3.36375 9.63528 2.91631 11.2197 2.90756 12.8367C2.85885 13.5074 2.73061 14.17 2.52554 14.8105C2.2878 15.4191 1.98916 16.0022 1.63417 16.5507C0.677289 17.9148 0.112134 19.5149 0 21.1774C0.119722 22.8252 0.684532 24.4096 1.63417 25.7615C1.99733 26.3054 2.29644 26.8893 2.52554 27.5018C2.7102 28.1591 2.81704 28.8358 2.84389 29.518C2.86966 31.1414 3.3394 32.7268 4.20216 34.1022C5.25482 35.3502 6.62649 36.2891 8.17087 36.8188C8.80114 37.062 9.40547 37.3677 9.97483 37.7313C10.4835 38.1545 10.9524 38.6234 11.3756 39.1321C12.344 40.4622 13.6681 41.492 15.1957 42.1033C15.7943 42.2855 16.4164 42.3784 17.0421 42.3792C18.0006 42.3487 18.9534 42.2207 19.886 41.9972C21.2376 41.6593 22.6516 41.6593 24.0033 41.9972C25.5493 42.456 27.1889 42.4999 28.7572 42.1245C30.2848 41.5132 31.6089 40.4834 32.5774 39.1533C33.0006 38.6446 33.4694 38.1758 33.9781 37.7526C34.5475 37.3889 35.1518 37.0832 35.7821 36.84C37.3264 36.3103 38.6981 35.3714 39.7508 34.1234C40.6135 32.748 41.0833 31.1626 41.109 29.5392C41.1359 28.857 41.2427 28.1803 41.4274 27.5231C41.6651 26.9144 41.9638 26.3314 42.3188 25.7828C43.2947 24.4315 43.8819 22.8387 44.0166 21.1774C43.8969 19.5296 43.3321 17.9451 42.3824 16.5932ZM32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="#0075FF" />
                                    <path d="M32.0044 18.4396L21.3928 29.0511C21.1955 29.25 20.9608 29.4079 20.7022 29.5157C20.4436 29.6234 20.1662 29.6789 19.886 29.6789C19.6058 29.6789 19.3284 29.6234 19.0698 29.5157C18.8112 29.4079 18.5765 29.25 18.3792 29.0511L12.0122 22.6842C11.8144 22.4863 11.6574 22.2514 11.5503 21.9929C11.4432 21.7343 11.3881 21.4572 11.3881 21.1774C11.3881 20.6122 11.6126 20.0702 12.0122 19.6705C12.4119 19.2709 12.9539 19.0464 13.5191 19.0464C14.0843 19.0464 14.6263 19.2709 15.0259 19.6705L19.886 24.5518L28.9907 15.4259C29.3903 15.0263 29.9323 14.8018 30.4975 14.8018C31.0627 14.8018 31.6047 15.0263 32.0044 15.4259C32.404 15.8256 32.6285 16.3676 32.6285 16.9328C32.6285 17.4979 32.404 18.04 32.0044 18.4396Z" fill="white" />
                                </svg>
                            </p>
                        </div>

                        <div className={styles.header}>

                            <div className={styles.mydata}>
                                <div className={styles.plan}>
                                    <p className={styles.sectionsubhead}>Subscription</p>
                                    <h1 className={styles.sectionhead}>Burner Freemium</h1>
                                </div>

                                <div className={styles.plandetails}>
                                    <button className={styles.btn}>
                                        Subscribe Pro
                                    </button>
                                </div>

                            </div>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Edit account
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>

                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Purchase history
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Contact us
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button className={styles.editbtn}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Delete data
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                            <button onClick={() => signOut()} className={styles.logoutbtn} style={{ margin: '1rem 0rem' }}>
                                <div className={styles.subwraper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                    Logout
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="26" viewBox="0 0 107 107" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.8 36.2783L58.0534 52.2117L42.8972 68.2422L46.8805 72.2256L66.3115 52.3088L46.9777 32.1006L42.8 36.2783Z" fill="white" />
                                </svg>
                            </button>

                        </div>

                        <div className={styles.userdata}>
                            <p className={styles.email}>
                                {session.user.email}
                            </p>
                        </div>

                    </div>
                ) : (
                    <a href="/api/auth/signin">Sign in</a>
                )}

            </div>
        </div>
    )
}
