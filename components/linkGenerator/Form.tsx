import React, { useEffect, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import validUrl from 'valid-url'
import { notReachable } from '../../utility/notReachable'
import { Preloader } from './Preloader'

type State =
  | {
      type: 'notRequested'
      url: string
    }
  | {
      type: 'error'
      description: string
      url: string
    }
  | {
      type: 'loading'
      url: string
    }
  | {
      type: 'loaded'
      url: string
      shortUrl: string
    }

export const Form = (): JSX.Element => {
  const [state, setState] = useState<State>({
    type: 'notRequested',
    url: '',
  })

  const onSubmit = () => {
    if (!validUrl.isWebUri(state.url)) {
      return setState({
        ...state,
        type: 'error',
        description: 'Entered URL is invalid',
      })
    }

    setState({ type: 'loading', url: state.url })
  }

  useEffect(() => {
    switch (state.type) {
      case 'notRequested':
      case 'error':
      case 'loaded':
        break

      case 'loading':
        setTimeout(
          () =>
            setState({
              type: 'loaded',
              url: state.url,
              shortUrl: 'not implemented',
            }),
          1000
        )
        break

      default:
        return notReachable(state)
    }
  }, [state])

  switch (state.type) {
    case 'notRequested':
    case 'error':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <TextField
            fullWidth
            type={'url'}
            label="Enter a long URL to make a short version"
            variant="outlined"
            value={state.url}
            error={state.type === 'error'}
            helperText={state.type === 'error' && state.description}
            onChange={(event) =>
              setState({
                type: 'notRequested',
                url: event.target.value,
              })
            }
          />
          <Button variant="contained" fullWidth onClick={onSubmit}>
            Shortify URL
          </Button>
        </Stack>
      )

    case 'loading':
      return <Preloader />

    case 'loaded':
      return <Typography color={'red'}>Not implemented yet</Typography>

    default:
      return notReachable(state)
  }
}
