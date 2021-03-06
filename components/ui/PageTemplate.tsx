import React, { ReactNode } from 'react'
import { Box, Container, Typography } from '@mui/material'

type Props = {
  title?: JSX.Element | string
  children: ReactNode
}

export const PageTemplate = ({ title, children }: Props): JSX.Element => {
  return (
    <Box component={'main'} py={4}>
      <Container maxWidth="md">
        {Boolean(title) && (
          <Typography variant={'h1'} component={'h1'} align={'center'}>
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  )
}
