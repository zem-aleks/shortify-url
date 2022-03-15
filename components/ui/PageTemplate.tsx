import React, { ReactNode } from 'react'
import { Box, Container, Paper, Typography } from '@mui/material'

type Props = {
  title?: JSX.Element | string
  children: ReactNode
}

export const PageTemplate = ({ title, children }: Props): JSX.Element => {
  return (
    <Box component={'main'} py={4}>
      <Container maxWidth="lg">
        {Boolean(title) && (
          <Typography variant={'h1'} component={'h1'} align={'center'}>
            {title}
          </Typography>
        )}
        <Paper sx={{ padding: 3, margin: 2 }}>{children}</Paper>
      </Container>
    </Box>
  )
}
