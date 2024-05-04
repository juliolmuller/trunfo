import { Box, SxProps, Theme, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { Loading } from '~/components'
import { mergeSx } from '~/helpers'

export type InProgressSpinnerProps = {
  children: ReactNode
  sx?: SxProps<Theme>
}

export function InProgressSpinner({ children, sx = [] }: InProgressSpinnerProps) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          m: 2,
        },
        ...mergeSx(sx),
      ]}
    >
      <Loading margin="none" size={40} />

      {children && (
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {children}
        </Typography>
      )}
    </Box>
  )
}
