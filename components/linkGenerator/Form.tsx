import React, { useEffect, useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'

import { notReachable } from '../../utility/notReachable'
import { Preloader } from './Preloader'
import { useLazyLoadableData } from '../hooks/useLazyLoadableData'
import { fetchShortifyUrl } from '../api/fetchShortifyUrl'
import { ShortifyUrlInput } from './ShortifyUrlInput'
import { ShortifyUrl } from '../../models/ShortifyUrl'

type Msg = {
  type: 'onUrlCreated'
  shortifyUrl: ShortifyUrl
}

type Props = {
  onMsg: (msg: Msg) => void
}

export const Form = ({ onMsg }: Props): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const { state, load, cancel } = useLazyLoadableData(fetchShortifyUrl)

  useEffect(() => {
    switch (state.type) {
      case 'notRequested':
      case 'error':
      case 'loading':
        break

      case 'loaded':
        onMsg({ type: 'onUrlCreated', shortifyUrl: state.data })
        break

      default:
        return notReachable(state)
    }
  }, [onMsg, state])

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
            value={url}
            error={state.type === 'error'}
            helperText={state.type === 'error' && state.error}
            onChange={(event) => setUrl(event.target.value)}
          />
          <Button variant="contained" fullWidth onClick={() => load({ url })}>
            Shortify URL
          </Button>
        </Stack>
      )

    case 'loading':
      return (
        <Preloader
          onMsg={(msg) => {
            switch (msg.type) {
              case 'onCancel':
                cancel()
                break

              default:
                return notReachable(msg.type)
            }
          }}
        />
      )

    case 'loaded':
      return (
        <Stack flexDirection={'column'} gap={2}>
          <TextField
            fullWidth
            type={'url'}
            label="Enter a long URL to make a short version"
            variant="outlined"
            color={'success'}
            value={url}
          />

          <ShortifyUrlInput shortifyUrl={state.data} />

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setUrl('')
              cancel()
            }}
          >
            Shortify another URL
          </Button>
        </Stack>
      )

    default:
      return notReachable(state)
  }
}
