import { UserButton } from '@clerk/nextjs';
import { Box, Typography, List, ListItem, Link } from '@mui/joy';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Journals', href: '/journal' },
  { name: 'History', href: '/history' },
];

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100vh',
          width: '200px',
          borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ px: 4, my: 4 }}>
          <Typography level="h4">MOOD</Typography>
        </Box>
        <List sx={{ px: 4 }}>
          {links.map((link) => (
            <ListItem key={link.name} sx={{ my: 4 }}>
              <Link href={link.href} underline="none" sx={{ fontSize: '20px'}}>
                {link.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ marginLeft: '200px', height: 'calc(100vh - 60px)' }}>
        <List sx={{ height: '60px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <ListItem sx={{ px: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <UserButton afterSignOutUrl="/" />
          </ListItem>
        </List>
        <Box sx={{ height: 'calc(100% - 60px)' }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
