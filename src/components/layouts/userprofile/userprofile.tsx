"use client";

import React, { useState, useEffect } from "react";
import styles from "./userprofile.module.scss";
import { useSession } from "next-auth/react";
import UserPosts from "./userposts/userposts";
import UserBadge from "./userbadge/userbadge";
import toast from 'react-hot-toast';

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

  useEffect(() => {
    const persistedMessage = localStorage.getItem('userProfileMessage');
    if (persistedMessage) {
      toast.success(persistedMessage);
      localStorage.removeItem('userProfileMessage');
    }
  }, []);

  const handlePostDelete = (postId: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      posts: prevUser.posts.filter((post) => post.id !== postId),
    }));
  };

  const handleMessageSet = (newMessage: string) => {
    toast.success(newMessage);
    localStorage.setItem('userProfileMessage', newMessage);
  };

  const isCurrentUser = session?.user?.email === user.email;

  return (
    <div className={styles.displaycontainer}>
      <section className={styles.displaywraper}>
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

