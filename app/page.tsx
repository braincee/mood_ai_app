import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { Button, Typography, Box } from '@mui/joy'

const Home = async () => {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Typography level='h1' sx={{ mb: 4, color: 'white' }}>
          The best Journal app, period.
        </Typography>
        <Typography
          level='h4'
          sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.6)' }}
        >
          This is the best app for tracking your mood throughout your life. All
          you have to do is be honest.
        </Typography>
        <div>
          <Link href={href}>
            <Button
              variant='outlined'
              sx={{
                backgroundColor: '#3498db',
                fontSize: '1.6rem',
                color: 'white',
              }}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </Box>
    </Box>
  )
}

export default Home
