import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Box, Typography } from '@mui/joy';
import HistoryChart from '@/components/HistoryChart';

const getData = async () => {
  const user = await getUserFromClerkID();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore;
  }, 0);
  const average = analyses.length > 0 ? total / analyses.length : 0;

  return { analyses, average };
};

const History = async () => {
  const { analyses, average } = await getData();

  return (
    <Box sx={{ height: '100%', px: 6, py: 8 }}>
        <Typography variant="h5" mb={4}>{`Avg. Sentiment: ${average}`}</Typography>
      <Box sx={{ height: '100%', width: '100%' }}>
        <HistoryChart data={analyses} />
      </Box>
    </Box>
  );
};

export default History;
