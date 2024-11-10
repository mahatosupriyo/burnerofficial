"use client";

import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.scss";
import Icon from "@/components/atoms/icons";
import { motion } from "framer-motion";
import Overlay from "@/components/molecules/overlay/overlay";
import { deletePost } from "@/app/actions/post/delete-post";
import { useSession } from "next-auth/react";
import SuccessPopup from "@/app/success/successpop";

interface Post {
  id: string;
  imageUrl: string;
  createdAt: string;
  caption?: string;
  link?: string;
}

interface User {
  verified: boolean;
  name: string;
  email: string;
  image: string | null;
  username: string;
  posts: Post[];
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

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user: initialUser }: UserProfileProps) {
  const { data: session } = useSession();

  const [user, setUser] = useState<User>(initialUser);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const persistedMessage = localStorage.getItem('userProfileMessage');
    if (persistedMessage) {
      setMessage(persistedMessage);
      setShowPopup(true);
      localStorage.removeItem('userProfileMessage');
    }
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) => prevVisible + 10);
  };

  const handleDelete = async (postId: string) => {
    setDeletingPostId(postId);
    setMessage(null);
    try {
      const result = await deletePost(postId);
      if (result.success) {
        setUser((prevUser) => ({
          ...prevUser,
          posts: prevUser.posts.filter((post) => post.id !== postId),
        }));
        setMessage(result.message);
        localStorage.setItem('userProfileMessage', result.message);
        setShowPopup(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setMessage(errorMessage);
      localStorage.setItem('userProfileMessage', errorMessage);
      setShowPopup(true);
    } finally {
      setDeletingPostId(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setMessage(null);
    localStorage.removeItem('userProfileMessage');
  };

  const isCurrentUser = session?.user?.email === user.email;

  return (
    <div className={styles.displaycontainer}>
      <section className={styles.displaywraper}>
        <SuccessPopup
          message={message}
          isVisible={showPopup}
          onClose={handleClosePopup}
        />
        <div className={styles.content}>
          <div className={styles.contentwraper}>
            <div className={styles.userbadge}>

              <h4 className={styles.username}>
                {user.username}
                {user.verified && <Icon name="verified" size={10} />}
              </h4>


              <img
                src={user.image || "/avatar.png"}
                draggable="false"
                loading="lazy"
                className={styles.avatar}
                alt={`Avatar of ${user.username}`}
              />



              <h3 className={styles.name}>{user.name}</h3>

              {user.location && <p className={styles.generatedbio}>{user.location}</p>}

              {/* 
              {(user.work || user.location) && (
                <p className={styles.generatedbio}>
                  I'm
                  {user.work && <> a {user.work}</>}
                  {user.location && <> from {user.location}</>}
                </p>
              )} */}


              <h3 className={styles.intro}>
                <span style={{ paddingLeft: "50%" }}></span>

                {user.about}

              </h3>
              <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <div className={styles.creatordata}>
                  <div className={styles.creator}>
                    <div className={styles.socials}>
                      {user.instagram && (
                        <a href={user.instagram} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="instagram" size={30} fill="#fafafa" />
                          {/* Instagram */}
                        </a>
                      )}
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="linkedin" size={30} />
                          {/* LinkedIn */}
                        </a>
                      )}
                      {user.behance && (
                        <a href={user.behance} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="behance" size={30} fill="#fafafa" />
                          {/* Behance */}
                        </a>
                      )}
                      {user.dribbble && (
                        <a href={user.dribbble} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="dribbble" size={30} fill="#fafafa" />
                          {/* Dribbble */}
                        </a>
                      )}
                      {user.x && (
                        <a href={user.x} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="x" size={30} fill="#fafafa" />
                          {/* X (Twitter) */}
                        </a>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.componentwraper}>
              {/* <PostCard posts={user.posts} /> */}
              <div className={styles.userposts}>
                <div className={styles.postwraper}>
                  {user.posts.slice(0, visiblePosts).map((post) => (
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
                                  {user.verified && <Icon name="verified" size={10} />}
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
                {visiblePosts < user.posts.length && (
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}