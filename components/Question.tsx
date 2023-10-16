'use client'

import { Button, CircularProgress, Input, Typography, Box } from '@mui/joy';
import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await askQuestion(value);
    setValue('');
    setAnswer(response);
    setLoading(false);
  };

  return (
    <Box>
        <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 1}}>
        <Input
          value={value}
          onChange={onChange}
          variant="outlined"
          disabled={loading}
          placeholder="Ask a question..."
          size='lg'
          sx={{ width: '400px'}}
        />
        </Box>
        <Box>
        <Button
          disabled={loading}
          type="submit"
          variant="solid"
          color="primary"
        >
          Ask
        </Button>
          {loading && <CircularProgress size='sm' sx={{ ml: 2 }} />}
        </Box>
      </form>
  
      {answer && (
        <Typography level="body-lg" sx={{ my: 2}}>
          {answer}
        </Typography>
      )}
    </Box>
  );
};

export default Question;
