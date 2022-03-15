import React from 'react'
import { Button, Stack, TextField } from '@mui/material'

export const Form = (): JSX.Element => {
  return (
    <Stack flexDirection={'column'} gap={2}>
      <TextField
        fullWidth
        label="Enter a long URL to make a short version"
        variant="outlined"
      />
      <Button variant="contained" fullWidth>
        Shortify URL
      </Button>
    </Stack>
  )
}
