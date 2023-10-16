import { Box, Card, List, ListItem } from '@mui/joy';

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f0f0f0',
          transform: 'scale(1.05)',
        },
      }}
    >
    <Card>
        <List>
            <ListItem>{date}</ListItem>
            <ListItem>Summary</ListItem>
            <ListItem>Mood</ListItem>
        </List>
    </Card>
    
    </Box>
  );
};

export default EntryCard;
