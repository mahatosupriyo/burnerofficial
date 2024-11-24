"use client"
import React, { useState } from 'react';
import styles from "../userprofile.module.scss";
import Icon from "@/components/atoms/icons";
import { motion } from "framer-motion";
import Overlay from "@/components/molecules/overlay/overlay";
import { deletePost } from "@/app/actions/post/delete-post";

interface Post {
    id: string;
    imageUrl: string;
    createdAt: string;
    caption?: string;
    link?: string;
}

interface User {
    verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'
    verified: boolean;
    name: string;
    email: string;
    image: string | null;
    username: string;
    about?: string;
    location?: string;
    work?: string;
    instagram?: string;
    behance?: string;
    x?: string;
    linkedin?: string;
    youtube?: string;
    dribbble?: string;
}

interface UserPostsProps {
    user: User;
    posts: Post[];
    isCurrentUser: boolean;
    onPostDelete: (postId: string) => void;
    onMessageSet: (message: string) => void;
}

export default function UserPosts({ user, posts, isCurrentUser, onPostDelete, onMessageSet }: UserPostsProps) {
    const [visiblePosts, setVisiblePosts] = useState(10);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

    const loadMorePosts = () => {
        setVisiblePosts((prevVisible) => prevVisible + 10);
    };

    const handleDelete = async (postId: string) => {
        setDeletingPostId(postId);
        try {
            const result = await deletePost(postId);
            if (result.success) {
                onPostDelete(postId);
                onMessageSet(result.message);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            onMessageSet(errorMessage);
        } finally {
            setDeletingPostId(null);
        }
    };

    return (
        <div className={styles.userposts}>

            <div className={styles.postwraper}>
                {posts.slice(0, visiblePosts).map((post) => (

                    <Overlay
                        key={post.id}
                        triggerButton={

                            <motion.div
                                className={styles.post}
                                whileTap={{ opacity: 0.6 }}
                                initial={{ opacity: 0.6, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={post.imageUrl}
                                    alt="Post image"
                                    draggable="false"
                                    className={styles.creation}
                                />
                            </motion.div>
                        }
                        overlayContent={
                            <div className={styles.overlayContent}>
                                <img
                                    src={post.imageUrl}
                                    alt={`Post by ${user.username}`}
                                    draggable="false"
                                    className={styles.selectedImage}
                                />

                                <div className={styles.captionwraper}>
                                    {post.caption && <p className={styles.caption}>{post.caption}</p>}
                                    {post.link &&
                                        <a href={post.link} target='_blank' className={styles.link}>
                                            <Icon name='link' fill='#fff' size={26} />
                                        </a>
                                    }
                                </div>

                                <div className={styles.creatorwraper}>
                                    <div className={styles.creator}>
                                        <img
                                            src={user.image || "/avatar.png"}
                                            draggable="false"
                                            loading="lazy"
                                            className={styles.creatoravatar}
                                            alt={`Avatar of ${user.username}`}
                                        />
                                        <div className={styles.creationdetails}>
                                            <p className={styles.username}>
                                                {user.username}
                                                {user.verificationStatus === 'VERIFIED' && <Icon name="verified" size={10} />}
                                            </p>
                                        </div>
                                    </div>

                                    {isCurrentUser && (
                                        <motion.button
                                            className={styles.deletebtn}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={() => handleDelete(post.id)}
                                            disabled={deletingPostId === post.id}
                                        >
                                            {deletingPostId === post.id ? (
                                                <div className={styles.loader}></div>
                                            ) : (
                                                "Delete"
                                            )}
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        }
                    />
                ))}
            </div>
            {visiblePosts < posts.length && (
                <div className={styles.loadMoreContainer}>
                    <button
                        onClick={loadMorePosts}
                        className={styles.loadMoreButton}
                    >
                        <Icon name="downarrow" size={22} fill="#fafafa" />
                    </button>
                </div>
            )}
        </div>
    );
}

