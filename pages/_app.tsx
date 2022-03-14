import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { EmotionCache } from '@emotion/cache'

import createEmotionCache from '../utility/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

type Props = AppProps & { emotionCache?: EmotionCache }

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
