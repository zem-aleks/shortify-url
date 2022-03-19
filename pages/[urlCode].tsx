import type { NextPage } from 'next'
import React from 'react'

import { PageTemplate } from '../components/ui'
import { MainPageWrapper } from '../components/ui/MainPageWrapper'
import { RedirectHandler } from '../components/linkGenerator'
import { Paper } from '@mui/material'

const ShortifyUrlPage: NextPage = () => {
  return (
    <MainPageWrapper>
      <PageTemplate title={'Welcome to Shortify URL'}>
        <Paper sx={{ padding: 3, margin: 2 }}>
          <RedirectHandler />
        </Paper>
      </PageTemplate>
    </MainPageWrapper>
  )
}

export default ShortifyUrlPage
