import type { NextPage } from 'next'
import { Paper, Stack } from '@mui/material'

import { PageTemplate } from '../components/ui'
import { Form as LinkGeneratorForm } from '../components/linkGenerator'
import { MainPageWrapper } from '../components/ui/MainPageWrapper'
import { LatestLinks } from '../components/linkGenerator/LatestLinks'
import { useLoadableData } from '../components/hooks/useLoadableData'
import { getShortifyUrls } from '../components/api/fetchShortifyUrl'
import { notReachable } from '../utility/notReachable'
import { ShortifyUrl } from '../models/ShortifyUrl'
import { useCallback } from 'react'

const Home: NextPage = () => {
  const { state, reload } = useLoadableData<ShortifyUrl[], undefined>(
    getShortifyUrls
  )

  return (
    <MainPageWrapper>
      <PageTemplate title={'Welcome to Shortify URL'}>
        <Stack flexDirection={'column'} gap={2}>
          <Paper sx={{ padding: 3, margin: 2 }}>
            <LinkGeneratorForm
              onMsg={useCallback(
                (msg) => {
                  switch (msg.type) {
                    case 'onUrlCreated':
                      reload()
                      break

                    default:
                      return notReachable(msg.type)
                  }
                },
                [reload]
              )}
            />
          </Paper>
          <LatestLinks
            linksState={state}
            onMsg={(msg) => {
              switch (msg.type) {
                case 'onReloadButtonClicked':
                  reload()
                  break

                default:
                  return notReachable(msg.type)
              }
            }}
          />
        </Stack>
      </PageTemplate>
    </MainPageWrapper>
  )
}

export default Home
