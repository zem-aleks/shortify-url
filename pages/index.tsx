import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Paper, Typography } from '@mui/material'

const Home: NextPage = () => {
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
      <Container maxWidth="lg">
        <Paper sx={{ padding: 3 }}>
          <Typography variant={'h1'} component={'h1'} align={'center'}>
            Welcome to Shortify URL
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default Home
