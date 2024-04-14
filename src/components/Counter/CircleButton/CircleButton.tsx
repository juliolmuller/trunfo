import { alpha, IconButton, Paper, SvgIconProps } from '@mui/material'
import { ReactElement } from 'react'

export interface CircleButtonProps {
  children: ReactElement<SvgIconProps>
  color: 'error' | 'success'
  size?: 'small' | 'big'
  onClick: () => void
}

export function CircleButton({ children, color, size = 'small', onClick }: CircleButtonProps) {
  return (
    <Paper
      sx={(theme) => ({
        display: 'inline',
        borderRadius: '50%',
        bgcolor: alpha(theme.palette[color].light, 0.25),
      })}
      role="button"
      onClick={() => onClick()}
    >
      <IconButton sx={{ fontSize: size === 'small' ? 24 : 64 }} color={color}>
        {children}
      </IconButton>
    </Paper>
  )
}
