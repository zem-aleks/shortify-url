import type { NextPage } from 'next'
import React from 'react'

import { PageTemplate } from '../components/ui'
import { MainPageWrapper } from '../components/ui/MainPageWrapper'
import { findUrlByCode, increaseUrlVisitsCount } from '../services/links'
import { RedirectHandler, RedirectState } from '../components/linkGenerator'
import { Paper } from '@mui/material'

type Props = RedirectState

const ShortifyUrlPage: NextPage<Props> = (props) => {
  return (
    <MainPageWrapper>
      <PageTemplate title={'Welcome to Shortify URL'}>
        <Paper sx={{ padding: 3, margin: 2 }}>
          <RedirectHandler redirectState={props} />
        </Paper>
      </PageTemplate>
    </MainPageWrapper>
  )
}

// This gets called on every request
export const getServerSideProps = async ({
  params,
}: {
  params: { urlCode: string }
}): Promise<{ props: Props }> => {
  try {
    const shortifyUrl = await findUrlByCode(params.urlCode)
    if (shortifyUrl) {
      await increaseUrlVisitsCount(shortifyUrl)
      return {
        props: {
          type: 'found',
          url: shortifyUrl.url,
        },
      }
    }

    return { props: { type: 'notFound' } }
  } catch (error) {
    return {
      props: {
        type: 'error',
        error: `${error}`,
      },
    }
  }
}

export default ShortifyUrlPage
