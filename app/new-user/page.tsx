import { db } from '@/drizzle/db'
import { users } from '@/drizzle/schema'
import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  console.log(user)

  // const match = await prisma.user.findUnique({
  //   where: {
  //     clerkId: user.id as string,
  //   },
  // })
  const match = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user[0].id))

  if (!match) {
    // await prisma.user.create({
    //   data: {
    //     clerkId: user.id,
    //     email: user?.emailAddresses[0].emailAddress,
    //   },
    // })

    await db
      .insert(users)
      .values({
        clerkId: user[0].id,
        email: user[0].emailAddresses[0].emailAddress,
      })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser
