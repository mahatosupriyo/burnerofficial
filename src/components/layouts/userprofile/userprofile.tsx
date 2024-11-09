"use client";

import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.scss";
import PostCard from "@/components/molecules/banner/postcard";
import Icon from "@/components/atoms/icons";
import { motion } from "framer-motion";
import Overlay from "@/components/molecules/overlay/overlay";
import { deletePost } from "@/app/actions/post/delete-post";
import { revalidatePath } from "next/cache";
import { useSession } from "next-auth/react";
import SuccessPopup from "@/app/success/successpop";

interface Post {
  id: string;
  imageUrl: string;
  createdAt: string;
  // caption: string;
  // link: string;
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
  const [visiblePosts, setVisiblePosts] = useState(3);
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
    setVisiblePosts((prevVisible) => prevVisible + 3);
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

              <h3 className={styles.intro}>
                <span style={{ paddingLeft: "50%" }}></span>

                {user.about}

              </h3>
              <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
                <div className={styles.creatordata}>
                  <div className={styles.creator}>
                    <div style={{ width: "100%" }}>
                      <img
                        src={user.image || "/avatar.png"}
                        alt="User Avatar"
                        draggable="false"
                        className={styles.avatar}
                      />
                    </div>
                    <div className={styles.socials}>
                      {user.instagram && (
                        <a href={user.instagram} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="instagram" size={20} fill="#fafafa" />
                          Instagram
                        </a>
                      )}
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="linkedin" size={20} />
                          LinkedIn
                        </a>
                      )}
                      {user.behance && (
                        <a href={user.behance} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="behance" size={20} fill="#fafafa" />
                          Behance
                        </a>
                      )}
                      {user.dribbble && (
                        <a href={user.dribbble} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="dribbble" size={20} fill="#fafafa" />
                          Dribbble
                        </a>
                      )}
                      {user.x && (
                        <a href={user.x} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="x" size={20} fill="#fafafa" />
                          X (Twitter)
                        </a>
                      )}
                      {/* {user.youtube && (
                        <a href={user.youtube} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                          <Icon name="youtube" size={20} fill="#fafafa" />
                          YouTube
                        </a>
                      )} */}
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

                          {/* {post.caption && <p className={styles.caption}>{post.caption}</p>} */}

                          <div className={styles.creatorwraper}>
                            <div className={styles.creator}>
                              <img
                                src={user.image || "/avatar.png"}
                                draggable="false"
                                loading="lazy"
                                className={styles.avatar}
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