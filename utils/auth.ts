import type { User } from '@clerk/nextjs/api'
import { prisma } from './db'
import { auth } from '@clerk/nextjs'
import { db } from '@/drizzle/db'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = auth()

  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId as string))
  // const user = await prisma.user.findUniqueOrThrow({
  //   where: {
  //     clerkId: userId as string,
  //   },
  //   select,
  // })
  return user
}

export const syncNewUser = async (clerkUser: User) => {
  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     clerkId: clerkUser.id,
  //   },
  // })

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUser.id))

  if (!existingUser) {
    const email = clerkUser.emailAddresses[0].emailAddress
    // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

    await db.insert(users).values({
      clerkId: clerkUser.id,
      email,
    })

    // await prisma.user.create({
    //   data: {
    //     clerkId: clerkUser.id,
    //     email,
    //     account: {
    //       create: {
    //         // stripeCustomerId: customerId,
    //         // stripeSubscriptionId: subscriptionId,
    //       },
    //     },
    //   },
    // })
  }
}
