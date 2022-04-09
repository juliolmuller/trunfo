import Paper, { PaperProps } from '@mui/material/Paper'
import { Breakpoint } from '@mui/material/styles'

import { mergeSx } from '~/helpers'

export interface SectionProps extends PaperProps {
  fullWidth?: boolean
  maxWidth?: Breakpoint | 'inherit' | 'auto' | number
}

function Section({
  fullWidth,
  maxWidth = 'auto',
  sx = {},
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
    />
  )
}

export default Section
