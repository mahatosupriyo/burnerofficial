import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getSignedImageUrl } from '@/app/actions/post';
import UserProfile from '@/components/layouts/userprofile/userprofile';
import NavBar from '@/components/navbar/navbar';
import styles from './username.module.scss'
import Controls from '@/components/molecules/controls/controls';

async function getUserData(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
        include: {
            posts: true,
        },
    });

    if (!user) {
        return null;
    }

    const postsWithSignedUrls = await Promise.all(
        user.posts.map(async (post) => {
            const signedImageUrl = await getSignedImageUrl(post.imageUrl);
            return {
                ...post,
                imageUrl: signedImageUrl,
                createdAt: post.createdAt.toISOString(), // Convert Date to string
            };
        })
    );

    return {
        ...user,
        posts: postsWithSignedUrls,
        name: user.name || 'Anonymous',
        username: user.username || 'anonymous',
        email: user.email || 'No email provided',
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