import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
}

export const MainPageWrapper = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Shortify URL</title>
        <meta
          name="description"
          content="Shortify URL app that replaces URL with shorter URL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}
