import React from 'react'
import { Button, LinearProgress, Stack, Typography } from '@mui/material'

type Msg = {
  type: 'onCancel'
}

type Props = {
  onMsg: (msg: Msg) => void
}

export const Preloader = ({ onMsg }: Props): JSX.Element => (
  <Stack flexDirection={'column'} gap={2}>
    <Typography>Please, wait. Magic is in progress :)</Typography>
    <LinearProgress />
    <Button
      variant="contained"
      fullWidth
      onClick={() => onMsg({ type: 'onCancel' })}
    >
      Cancel
    </Button>
  </Stack>
)
