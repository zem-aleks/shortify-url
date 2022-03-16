import React, { useState } from 'react'
import { ContentCopy } from '@mui/icons-material'
import copy from 'copy-to-clipboard'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material'

import { notReachable } from '../../utility/notReachable'
import { Preloader } from './Preloader'
import { useLazyLoadableData } from '../hooks/useLazyLoadableData'
import { fetchShortifyUrl } from '../api/fetchShortifyUrl'

export const Form = (): JSX.Element => {
  const [url, setUrl] = useState<string>('')
  const { state, load, cancel } = useLazyLoadableData(fetchShortifyUrl)

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
            value={url}
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="shortify-url">Shortify URL</InputLabel>
            <OutlinedInput
              id="shortify-url"
              fullWidth
              type={'url'}
              value={state.data.shortifyUrl}
              label={'Shortify URL'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Copy shortify URL"
                    onClick={() => copy(state.data.shortifyUrl)}
                    edge="end"
                  >
                    <ContentCopy />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
