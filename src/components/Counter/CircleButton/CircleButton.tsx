import { alpha } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { SvgIconProps } from '@mui/material/SvgIcon'
import { ReactElement } from 'react'

export interface CircleButtonProps {
  children: ReactElement<SvgIconProps>
  color: 'error' | 'success'
  size?: 'small' | 'big'
  onClick: () => void
}

function CircleButton({
  children,
  color,
  size = 'small',
  onClick,
}: CircleButtonProps) {
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
      <IconButton
        sx={{ fontSize: size === 'small' ? 24 : 64 }}
        color={color}
      >
        {children}
      </IconButton>
    </Paper>
  )
}

export default CircleButton
