// import { auth } from "@/auth"
// import { getAvatarUrl } from "../actions/avatar"
// import AvatarUpload from "@/components/atoms/uploadavatar/uploadavatar"

// export default async function ProfilePage() {
//     const session = await auth()
//     if (!session?.user) {
//         return <div>Please log in to view your profile.</div>
//     }

//     const avatarUrl = await getAvatarUrl(session.user.image || 'defaultavatar.png')

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
//             <AvatarUpload currentAvatar={user.image} lastImageUpdate={user.lastImageUpdate} />
//         </div>
//     )
// }