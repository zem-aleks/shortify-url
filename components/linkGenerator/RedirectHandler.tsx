import React, { useEffect } from 'react'
import { Button, LinearProgress, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { notReachable } from '../../utility/notReachable'

export type RedirectState =
  | {
      type: 'found'
      url: string
    }
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

  console.log(redirectState)

  useEffect(() => {
    switch (redirectState.type) {
      case 'found':
        window.location.href = redirectState.url
        break

      case 'notFound':
      case 'error':
        break

      default:
        return notReachable(redirectState)
    }
  }, [redirectState])

  switch (redirectState.type) {
    case 'found':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <Typography>Redirecting...</Typography>
          <LinearProgress />
          <Link href="/" passHref>
            <Button fullWidth variant={'contained'}>
              Create Shortify URL
            </Button>
          </Link>
        </Stack>
      )

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
