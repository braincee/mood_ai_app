import { db } from '@/drizzle/db'
import { users } from '@/drizzle/schema'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { User } from '@prisma/client'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  // const match = await prisma.user.findUnique({
  //   where: {
  //     clerkId: user.id as string,
  //   },
  // })
  const match = await db.select().from(users).where(eq(users.clerkId, user.id))
  if (match.length === 0) {
    // await prisma.user.create({
    //   data: {
    //     clerkId: user.id,
    //     email: user?.emailAddresses[0].emailAddress,
    //   },
    // })

    await db.insert(users).values({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
