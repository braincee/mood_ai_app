import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import {Link, Box, Typography, Grid } from '@mui/joy';
import EntryCard from '@/components/EntryCard';
import NewEntryCard from '@/components/NewEntryCard';
import Question from '@/components/Question';

const getEntries = async () => {
  const user = await getUserFromClerkID();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <Box sx={{ p: 10, backgroundColor: 'rgba(173, 216, 230, 0.1)', height: '100%' }}>
      <Typography level="h4">
        Journal
      </Typography>
      <Box>
        <Question />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <NewEntryCard />
        </Grid>
        {entries.map((entry) => (
          <Grid key={entry.id} xs={2}>
            <Link href={`/journal/${entry.id}`}>
              <p style={{ textDecoration: 'none' }}>
                <EntryCard entry={entry} />
              </p>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JournalPage;
