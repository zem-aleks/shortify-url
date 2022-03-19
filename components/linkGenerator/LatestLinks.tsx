import React from 'react'
import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import { LoadableData } from '../hooks/useLoadableData'
import { notReachable } from '../../utility/notReachable'
import { ShortifyUrlInput } from './ShortifyUrlInput'
import { OpenInNew } from '@mui/icons-material'
import { ShortifyUrl } from '../../models/ShortifyUrl'

type Msg = {
  type: 'onReloadButtonClicked'
}

type Props = {
  linksState: LoadableData<ShortifyUrl[], undefined>
  onMsg: (msg: Msg) => void
}

const LatestLinksTemplate: React.FC = ({ children }) => {
  return (
    <Stack flexDirection={'column'} gap={2}>
      <Typography variant={'h1'} component={'h2'} align={'center'}>
        Latest URLs
      </Typography>
      {children}
    </Stack>
  )
}

export const LatestLinks = ({
  linksState,
  onMsg,
}: Props): JSX.Element | null => {
  switch (linksState.type) {
    case 'error':
      return (
        <LatestLinksTemplate>
          <Typography>Something went wrong: {linksState.error}</Typography>
          <Button
            fullWidth
            onClick={() => onMsg({ type: 'onReloadButtonClicked' })}
          >
            Reload
          </Button>
        </LatestLinksTemplate>
      )

    case 'loading':
      return (
        <LatestLinksTemplate>
          <LinearProgress />
        </LatestLinksTemplate>
      )

    case 'loaded':
      return (
        <LatestLinksTemplate>
          {linksState.data.length === 0 && (
            <Card>
              <CardContent>
                <Typography variant={'h6'} align={'center'}>
                  No URLs added yet
                </Typography>
              </CardContent>
            </Card>
          )}

          {linksState.data.map((shortifyUrl) => (
            <Card key={shortifyUrl.code}>
              <CardContent>
                <Stack
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  sx={{ marginBottom: 2 }}
                  gap={2}
                >
                  <Link
                    href={shortifyUrl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography sx={{ overflowWrap: 'anywhere' }}>
                      {shortifyUrl.url}
                      <OpenInNew fontSize={'small'} />
                    </Typography>
                  </Link>

                  <Typography
                    sx={{ fontSize: 14, minWidth: '16rem' }}
                    color="text.secondary"
                    align={'right'}
                  >
                    Creation Requests: {shortifyUrl.creationRequestsCount} /
                    Visits: {shortifyUrl.visitsCount}
                  </Typography>
                </Stack>

                <ShortifyUrlInput shortifyUrl={shortifyUrl} />
              </CardContent>
            </Card>
          ))}
        </LatestLinksTemplate>
      )

    default:
      return notReachable(linksState)
  }
}
