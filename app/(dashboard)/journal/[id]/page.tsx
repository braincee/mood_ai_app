import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { Box } from '@mui/joy';

const getEntry = async (id) => {
    const user = await getUserFromClerkID()
    const entry = await prisma.journalEntry.findUnique({
      where: {
        userId_id: {
            userId: user.id,
            id,
          },
      },
      include: {
        analysis: true
    }
    })

    return entry
  }

const EntryPage = async({params}) => {
    const entry = await getEntry(params.id)
    
    return (
        <Box sx={{ width: '100%', height: '100%'}}>
               <Editor entry={entry}/>
        </Box>
    )
}

export default EntryPage