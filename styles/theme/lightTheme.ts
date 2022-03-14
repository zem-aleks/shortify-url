import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

theme.typography.h1 = {
  fontSize: '2rem',
}

export default theme
