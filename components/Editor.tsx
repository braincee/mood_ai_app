'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'
import {
  CircularProgress,
  Box,
  Textarea,
  Typography,
  List,
  ListItem,
  Grid,
} from '@mui/joy'

const Editor = ({ entry }: { entry: any }) => {
  const [value, setText] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, subject, summary, negative, color } = analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
        <Textarea
          value={value}
          onChange={(e) => setText(e.target.value)}
          sx={{
            width: '100%',
            padding: '8px',
            minHeight: '200px',
            boxSizing: 'border-box',
          }}
        />
        {isLoading && <CircularProgress size='sm' sx={{ borderTop: '2px' }} />}
      </Grid>
      <Grid xs={6}>
        <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.1)', p: 2 }}>
          <Box sx={{ backgroundColor: color, px: 6, py: 10 }}>
            <Typography level='title-lg'>Analysis</Typography>
          </Box>
          <List>
            {analysisData.map((item, index) => (
              <ListItem
                key={`${item.name}-${index}`}
                sx={{
                  px: 2,
                  py: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography level='body-lg'>{item.name}</Typography>
                <Typography level='body-lg'>{item.value}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Editor
