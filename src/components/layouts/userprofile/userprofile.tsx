
import React from 'react'
import styles from './userprofile.module.scss'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

import { redirect } from 'next/navigation'
import PostCard from '@/components/molecules/banner/postcard'
import Icon from '@/components/atoms/icons'

export default async function UserProfile() {

    const session = await auth()

    if (!session || session.user.role !== "ADMIN") {
        redirect('/auth')
    }

    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

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


                <div className={styles.content}>
                    <div className={styles.contentwraper}>
                        <div className={styles.userbadge}>
                            <h4 className={styles.username}>
                                supriyomahato
                                <Icon name='verified' size={10}/>
                            </h4>

                            <h3 className={styles.intro}>
                                <span style={{ paddingLeft: '50%' }}></span>
                                Supriyo is a Design Engineer based in India. He is a Top LinkedIn Design voice.

                                As a visionary Design Engineer, Supriyo Mahato continues to shape the design landscape with his unique perspective and relentless pursuit of excellence.
                            </h3>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>

                                <div className={styles.creatordata}>
                                    <div className={styles.creator}>

                                        <div style={{ width: '100%' }}>
                                            <img src={session.user.image || 'avatar.png'} draggable="false" className={styles.avatar} />
                                        </div>

                                        <div className={styles.socials}>
                                            <div className={styles.sociallink}>

                                                <Icon
                                                    name='instagram'
                                                    size={20}
                                                    fill='#fafafa'
                                                />

                                                Instagram
                                            </div>

                                            <div className={styles.sociallink}>

                                                <Icon
                                                    name='linkedin'
                                                    size={20}
                                                />

                                                LinkedIn
                                            </div>

                                            <div className={styles.sociallink}>
                                                <Icon
                                                    name='behance'
                                                    size={20}
                                                    fill='#fafafa'
                                                />
                                                Behance
                                            </div>

                                            <div className={styles.sociallink}>

                                                <Icon
                                                    name='dribbble'
                                                    size={20}
                                                    fill='#fafafa'
                                                />

                                                Dribbble
                                            </div>


                                            <div className={styles.sociallink}>

                                                <Icon
                                                    name='x'
                                                    size={20}
                                                    fill='#fafafa'
                                                />

                                                X (twitter)
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <PostCard />
                    </div>


                </div>

            </section>
        </div>
    )
}
