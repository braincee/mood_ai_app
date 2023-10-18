import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { Box } from '@mui/joy'
import { db } from '@/drizzle/db'
import { journalEntries } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

const getEntry = async (id: number) => {
  const user = await getUserFromClerkID()
  const entry = await db
    .select()
    .from(journalEntries)
    .where(
      and(eq(journalEntries.userId, user[0].id), eq(journalEntries.id, id))
    )
  // .include('analysis')
  // .first()

  return entry
}

const EntryPage = async ({ params }: { params: { id: number } }) => {
  const entry = await getEntry(params.id)

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Editor entry={entry} />
    </Box>
  )
}

export default EntryPage
