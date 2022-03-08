import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper'
import { Breakpoint } from '@mui/material/styles'

import { mergeSx } from '~/utils'

export interface PaperProps extends MuiPaperProps {
  fullWidth?: boolean
  maxWidth?: Breakpoint | number
}

function Paper({
  fullWidth,
  maxWidth,
  sx = {},
  ...props
}: PaperProps) {
  return (
    <MuiPaper
      elevation={6}
      sx={mergeSx((theme) => ({
        width: fullWidth ? '100%' : 'auto',
        maxWidth: typeof maxWidth === 'string'
          ? theme.breakpoints.values[maxWidth]
          : maxWidth ?? 'auto',
        my: 3,
        px: 3,
        py: 4,
      }), sx)}
      {...props}
    />
  )
}

export default Paper
