import { auth } from '@/auth' 
import UpdateAboutForm from '@/components/layouts/settings/editabout/editaboutform'
import prisma from '@/lib/prisma'

export default async function ProfilePage() {
    const session = await auth()

  
  if (!session || !session.user) {
    return <div>Please sign in to view this page</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { about: true }
  })

  const initialData = user?.about?.[0] || {}
  

  return (
    <div>
      <h1>Update Your Profile</h1>
      <UpdateAboutForm userId={session.user.id} initialData={initialData} />
    </div>
  )
}