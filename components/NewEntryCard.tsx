'use client'

import { Card, Typography } from '@mui/joy';
import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';

const NewEntryCard = () => {
  const router = useRouter();

  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card  onClick={handleClick}  sx={{
        width: '300px',
        height: '100px',
        mt: 5,
        textAlign: 'center',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f0f0f0',
          transform: 'scale(1.05)',
        },
      }}>
      <Typography level='h4'>New Entry</Typography>
    </Card>
  );
};

export default NewEntryCard;
