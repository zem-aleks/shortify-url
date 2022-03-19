import React, { useEffect } from 'react'
import { Button, LinearProgress, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { notReachable } from '../../utility/notReachable'
import { useLoadableData } from '../hooks/useLoadableData'
import { getShortifyUrlByCode } from '../api/fetchShortifyUrl'

export const RedirectHandler = (): JSX.Element | null => {
  const router = useRouter()
  const code = String(router.query.urlCode)
  const { state, reload } = useLoadableData(() => getShortifyUrlByCode(code))

  useEffect(() => {
    switch (state.type) {
      case 'loaded':
        window.location.href = state.data.url
        break

      case 'loading':
      case 'error':
        break

      default:
        return notReachable(state)
    }
  }, [state])

  switch (state.type) {
    case 'loading':
    case 'loaded':
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

    case 'error':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <Typography>Something went wrong</Typography>
          <Button fullWidth variant={'contained'} onClick={() => reload()}>
            Try again
          </Button>
          <Button
            fullWidth
            variant={'contained'}
            onClick={() => router.replace('/')}
          >
            Go home
          </Button>
        </Stack>
      )

    default:
      return notReachable(state)
  }
}
