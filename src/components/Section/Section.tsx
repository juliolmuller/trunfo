import { Breakpoint, Paper, PaperProps, Typography } from '@mui/material'

import { mergeSx } from '~/helpers'

export interface SectionProps extends PaperProps {
  fullWidth?: boolean
  maxWidth?: Breakpoint | 'inherit' | 'auto' | number
  title?: string
}

export function Section({
  children,
  fullWidth,
  maxWidth = 'auto',
  sx = {},
  title,
  ...props
}: SectionProps) {
  return (
    <Paper
      elevation={6}
      sx={mergeSx(
        {
          width: fullWidth ? 1 : 'auto',
          maxWidth,
          my: 3,
          px: 3,
          py: 4,
        },
        sx,
      )}
      {...props}
    >
      {title && (
        <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  )
}
