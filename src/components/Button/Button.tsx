import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

import { mergeSx } from '~/utils'

export type ButtonProps = MuiButtonProps

function Button({
  color = 'error',
  size = 'large',
  sx = {},
  variant = 'contained',
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      color={color}
      variant={variant}
      size={size}
      sx={mergeSx({ borderRadius: '1.5rem' }, sx)}
      {...props}
    />
  )
}

export default Button
