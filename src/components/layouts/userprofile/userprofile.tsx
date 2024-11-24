"use client";

import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.scss";
import { deletePost } from "@/app/actions/post/delete-post";
import { useSession } from "next-auth/react";
import SuccessPopup from "@/app/success/successpop";
import UserPosts from "./userposts/userposts";
import UserBadge from "./userbadge/userbadge";

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

  const handlePostDelete = (postId: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.filter((post) => post.id !== postId),
    }));
  };

  const handleMessageSet = (newMessage: string) => {
    setMessage(newMessage);
    localStorage.setItem('userProfileMessage', newMessage);
    setShowPopup(true);
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
        <div className={styles.contentwraper}>
          <UserBadge user={user} />
          <div className={styles.componentwraper}>
            <UserPosts
              user={user}
              posts={user.posts}
              isCurrentUser={isCurrentUser}
              onPostDelete={handlePostDelete}
              onMessageSet={handleMessageSet}
            />
          </div>
        </div>
      </section>
    </div>
  );
}