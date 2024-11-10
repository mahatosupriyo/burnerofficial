import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getSignedImageUrl } from '@/app/actions/post';
import UserProfile from '@/components/layouts/userprofile/userprofile';
import NavBar from '@/components/navbar/navbar';
import styles from './username.module.scss'
import Controls from '@/components/molecules/controls/controls';
import { getAvatarUrl } from '../actions/avatar';

async function getUserData(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            posts: true,
            about: true,
        },
    });

    if (!user) {
        return null;
    }

    const avatarUrl = await getAvatarUrl(user.image || 'defaultavatar.png')

    const postsWithSignedUrls = await Promise.all(
        user.posts.map(async (post) => {
            const signedImageUrl = await getSignedImageUrl(post.imageUrl);
            return {
                ...post,
                imageUrl: signedImageUrl,
                caption: post.caption || '',
                link: post.link || '',
                createdAt: post.createdAt.toISOString(), // Convert Date to string
            };
        })
    );

    // Extract about information
    const aboutInfo = user.about?.[0] || {};

    return {
        ...user,
        posts: postsWithSignedUrls,
        name: user.name || 'Anonymous',
        username: user.username || 'anonymous',
        email: user.email || 'No email provided',
        image: avatarUrl || '/defaultavatar.jpg',
        about: aboutInfo.about || '',
        location: aboutInfo.location || '',
        work: aboutInfo.work || '',
        instagram: aboutInfo.instagram || '',
        behance: aboutInfo.behance || '',
        x: aboutInfo.x || '',
        linkedin: aboutInfo.linkedin || '',
        youtube: aboutInfo.youtube || '',
        dribbble: aboutInfo.dribbble || '',
    };
}

export default async function UserPage({ params }: { params: { username: string } }) {
    const user = await getUserData(params.username);

    if (!user) {
        notFound();
    }

    return (
        <div className={styles.wraper}>
            <NavBar />
            <div className={styles.container}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <UserProfile user={user} />
                    <Controls />
                </div>
            </div>
        </div>
    );
}