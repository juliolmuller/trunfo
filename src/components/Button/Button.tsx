import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export type ButtonProps = MuiButtonProps

function Button({
  color = 'error',
  size = 'large',
  style = {},
  variant = 'contained',
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      color={color}
      variant={variant}
      size={size}
      style={{
        borderRadius: '1.5rem',
        ...style,
      }}
      {...props}
    />
  )
}

export default Button
