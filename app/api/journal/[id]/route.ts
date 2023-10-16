import { analyze } from '@/utils/ai'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'


export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()
    const user = await getUserFromClerkID()
  
    const updateEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          id: params.id,
          userId: user.id,
        },
      },
      data: {
        content,
      }
    })

    const analysis = await analyze(updateEntry.content)

    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updateEntry.id
        },
        create: {
          userId: user.id,
          entryId: updateEntry.id,
          ...analysis,
        },
        update: analysis
    })

    console.log(updated)

    return NextResponse.json({data: {...updateEntry, analysis: updated}})
}