"use client"

import React, { useState } from 'react';
import styles from './userprofile.module.scss';
import PostCard from '@/components/molecules/banner/postcard';
import Icon from '@/components/atoms/icons';

interface Post {
    id: string;
    imageUrl: string;
    createdAt: string;
}

interface UserProfileProps {
    user: {
        verified: boolean;
        name: string;
        image: string | null;
        username: string;
        posts: Post[];
    };
}

export default function UserProfile({ user }: UserProfileProps) {
    const [visiblePosts, setVisiblePosts] = useState(3);
    const firstName = user.name.split(" ")[0];

    const loadMorePosts = () => {
        setVisiblePosts(prevVisible => prevVisible + 3);
    };

    return (
        <div className={styles.displaycontainer}>
            <section className={styles.displaywraper}>
                <div className={styles.content}>
                    <div className={styles.contentwraper}>
                        <div className={styles.userbadge}>
                            <h4 className={styles.username}>
                                {user.username}

                                {user.verified === true &&
                                    <Icon name='verified' size={10} />
                                }
                            </h4>

                            <h3 className={styles.intro}>
                                <span style={{ paddingLeft: '50%' }}></span>
                                {firstName} is a Design Engineer based in India. He is a Top LinkedIn Design voice.
                                As a visionary Design Engineer, Supriyo Mahato continues to shape the design landscape with his unique perspective and relentless pursuit of excellence.
                            </h3>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                                <div className={styles.creatordata}>
                                    <div className={styles.creator}>
                                        <div style={{ width: '100%' }}>
                                            <img
                                                src={user.image || '/avatar.png'}
                                                alt="User Avatar"
                                                draggable="false"
                                                className={styles.avatar}
                                            />
                                        </div>

                                        <div className={styles.socials}>
                                            <div className={styles.sociallink}>
                                                <Icon name='instagram' size={20} fill='#fafafa' />
                                                Instagram
                                            </div>

                                            <div className={styles.sociallink}>
                                                <Icon name='linkedin' size={20} />
                                                LinkedIn
                                            </div>

                                            <div className={styles.sociallink}>
                                                <Icon name='behance' size={20} fill='#fafafa' />
                                                Behance
                                            </div>

                                            <div className={styles.sociallink}>
                                                <Icon name='dribbble' size={20} fill='#fafafa' />
                                                Dribbble
                                            </div>

                                            <div className={styles.sociallink}>
                                                <Icon name='x' size={20} fill='#fafafa' />
                                                X (Twitter)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.componentwraper}>
                            <PostCard posts={user.posts} />
                            <div className={styles.userposts}>
                                <div className={styles.postwraper}>
                                    {user.posts.slice(0, visiblePosts).map((post) => (
                                        <div key={post.id} className={styles.post}>
                                            <img
                                                src={post.imageUrl}
                                                alt="Post image"
                                                draggable="false"
                                                className={styles.creation}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {visiblePosts < user.posts.length && (
                                    <div className={styles.loadMoreContainer}>
                                        <button
                                            onClick={loadMorePosts}
                                            className={styles.loadMoreButton}
                                        >
                                            <Icon name='downarrow' size={22} fill='#fafafa' />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}