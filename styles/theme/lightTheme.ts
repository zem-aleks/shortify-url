import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

theme.typography.h1 = {
  fontSize: '2rem',
}

theme.typography.h2 = {
  fontSize: '1.5rem',
}

export default theme
