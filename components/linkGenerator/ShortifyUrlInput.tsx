import React from 'react'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
} from '@mui/material'
import { ContentCopy, Link as LinkIcon } from '@mui/icons-material'
import { ShortifyUrl } from '../../models/ShortifyUrl'
import copy from 'copy-to-clipboard'
import { getShortifyUrl } from '../helpers/getShortifyUrl'

type Props = {
  shortifyUrl: ShortifyUrl
}

export const ShortifyUrlInput = ({
  shortifyUrl,
}: Props): JSX.Element | null => {
  const url = getShortifyUrl(shortifyUrl.code)
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="shortify-url">Shortify URL</InputLabel>
      <OutlinedInput
        id="shortify-url"
        fullWidth
        type={'url'}
        value={url}
        label={'Shortify URL'}
        color={'success'}
        startAdornment={
          <InputAdornment position="start" sx={{ marginLeft: 1 }}>
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <IconButton aria-label="Open URL" edge="start">
                <LinkIcon />
              </IconButton>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Copy shortify URL"
              onClick={() => copy(url)}
              edge="end"
            >
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
