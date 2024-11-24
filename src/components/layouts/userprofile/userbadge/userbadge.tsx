"use client";

import React from 'react';
import styles from "../userprofile.module.scss";
import Icon from "@/components/atoms/icons";

interface Post {
  id: string;
  imageUrl: string;
  createdAt: string;
  caption?: string;
  link?: string;
}

interface User {
  verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED'
  name: string;
  image: string | null;
  username: string;
  about?: string;
  location?: string;
  instagram?: string;
  behance?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
  dribbble?: string;
  posts: Post[];
}

interface UserBadgeProps {
  user: User;
}

export default function UserBadge({ user }: UserBadgeProps) {
  const getLastUpdateText = () => {
    if (user.posts.length === 0) {
      return "No posts";
    }

    const lastPostDate = new Date(Math.max(...user.posts.map(post => new Date(post.createdAt).getTime())));
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastPostDate.getTime()) / 1000);

    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', width: '100%', maxWidth: '40rem', flexDirection: 'column', gap: '1rem'}}>
      <div className={styles.userbadge}>
        <h4 className={styles.username}>
          {user.username}
          {user.verificationStatus === 'VERIFIED' && (
            <Icon name="verified" size={10} />
          )}
        </h4>

        <img
          src={user.image || "/avatar.png"}
          draggable="false"
          loading="lazy"
          className={styles.avatar}
          alt={`Avatar of ${user.username}`}
        />

        <h3 className={styles.name}>{user.name}</h3>

        {user.location && <p className={styles.location}>{user.location}</p>}

        <h3 className={styles.intro}>
          {user.about}
        </h3>
        <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <div className={styles.creatordata}>
            <div className={styles.creator}>
              {/* <div className={styles.socials}>
                {user.instagram && (
                  <a href={user.instagram} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                    <Icon name="instagram" size={31} fill="#fafafa" />
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                    <Icon name="linkedin" size={30} />
                  </a>
                )}
                {user.behance && (
                  <a href={user.behance} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                    <Icon name="behance" size={34} fill="#fafafa" />
                  </a>
                )}
                {user.dribbble && (
                  <a href={user.dribbble} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                    <Icon name="dribbble" size={30} fill="#fafafa" />
                  </a>
                )}
                {user.x && (
                  <a href={user.x} target="_blank" rel="noopener noreferrer" className={styles.sociallink}>
                    <Icon name="x" size={27.8} fill="#fafafa" />
                  </a>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.lastupdate}>
        Last update <span style={{opacity: 0.4, fontWeight: 500}}>{getLastUpdateText()}</span>
      </div>
    </div>
  );
}

