import React from 'react'
import { LinearProgress, Stack, Typography } from '@mui/material'

export const Preloader = (): JSX.Element => (
  <Stack flexDirection={'column'} gap={2}>
    <Typography>Please, wait. Magic is in progress :)</Typography>
    <LinearProgress />
  </Stack>
)
