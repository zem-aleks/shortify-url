import type { NextPage } from 'next'
import { Paper, Stack } from '@mui/material'

import { PageTemplate } from '../components/ui'
import { Form as LinkGeneratorForm } from '../components/linkGenerator'
import { MainPageWrapper } from '../components/ui/MainPageWrapper'
import { LatestLinks } from '../components/linkGenerator/LatestLinks'

const Home: NextPage = () => {
  return (
    <MainPageWrapper>
      <PageTemplate title={'Welcome to Shortify URL'}>
        <Stack flexDirection={'column'} gap={2}>
          <Paper sx={{ padding: 3, margin: 2 }}>
            <LinkGeneratorForm />
          </Paper>
          <LatestLinks />
        </Stack>
      </PageTemplate>
    </MainPageWrapper>
  )
}

export default Home
