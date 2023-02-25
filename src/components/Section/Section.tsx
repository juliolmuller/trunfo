import Paper, { PaperProps } from '@mui/material/Paper'
import { Breakpoint } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { mergeSx } from '~/helpers'

export interface SectionProps extends PaperProps {
  fullWidth?: boolean
  maxWidth?: Breakpoint | 'inherit' | 'auto' | number
  title?: string
}

function Section({
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
      sx={mergeSx({
        width: fullWidth ? 1 : 'auto',
        maxWidth,
        my: 3,
        px: 3,
        py: 4,
      }, sx)}
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

export default Section
