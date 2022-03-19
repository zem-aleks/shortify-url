import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { notReachable } from '../../utility/notReachable'

export type RedirectState =
  | {
      type: 'notFound'
    }
  | {
      type: 'error'
      error: string
    }

type Props = {
  redirectState: RedirectState
}

export const RedirectHandler = ({
  redirectState,
}: Props): JSX.Element | null => {
  const router = useRouter()
  switch (redirectState.type) {
    case 'notFound':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <Typography>
            Your URL is not found at Shortify URL. Would you like to create it?
          </Typography>
          <Link href="/" passHref>
            <Button fullWidth variant={'contained'}>
              Create Shortify URL
            </Button>
          </Link>
        </Stack>
      )

    case 'error':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <Typography>Something went wrong</Typography>
          <Button
            fullWidth
            variant={'contained'}
            onClick={() => router.reload()}
          >
            Try again
          </Button>
        </Stack>
      )

    default:
      return notReachable(redirectState)
  }
}
