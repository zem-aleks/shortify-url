import type { NextPage } from 'next'
import Head from 'next/head'
import { PageTemplate } from '../components/ui'
import { Form as LinkGeneratorForm } from '../components/linkGenerator'

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

      <PageTemplate title={'Welcome to Shortify URL'}>
        <LinkGeneratorForm />
      </PageTemplate>
    </>
  )
}

export default Home
