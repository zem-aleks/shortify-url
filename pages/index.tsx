import type { NextPage } from 'next'
import { PageTemplate } from '../components/ui'
import { Form as LinkGeneratorForm } from '../components/linkGenerator'
import { MainPageWrapper } from '../components/ui/MainPageWrapper'

const Home: NextPage = () => {
  return (
    <MainPageWrapper>
      <PageTemplate title={'Welcome to Shortify URL'}>
        <LinkGeneratorForm />
      </PageTemplate>
    </MainPageWrapper>
  )
}

export default Home
