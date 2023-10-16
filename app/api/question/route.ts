import { db } from '@/drizzle/db'
import { journalEntries } from '@/drizzle/schema'
import { qa } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  const { question } = await request.json()
  const user = await getUserFromClerkID()
  // const entries = await prisma.journalEntry.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     content: true,
  //     createdAt: true,
  //   },
  // })

  const entries = await db
    .select({
      id: journalEntries.id,
      content: journalEntries.content,
      createdAt: journalEntries.createdAt,
    })
    .from(journalEntries)
    .where(eq(journalEntries.userId, user[0].id))

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}
