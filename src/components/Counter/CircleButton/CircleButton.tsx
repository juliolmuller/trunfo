import { alpha } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import { SvgIconProps } from '@mui/material/SvgIcon'
import { ReactElement } from 'react'

export interface CircleButtonProps {
  children: ReactElement<SvgIconProps>
  color: 'error' | 'success'
  onClick: () => void
}

function CircleButton({ children, color, onClick }: CircleButtonProps) {
  return (
    <Paper
      role="button"
      sx={(theme) => ({
        display: 'inline',
        borderRadius: '50%',
        bgcolor: alpha(theme.palette[color].light, 0.25),
      })}
      onClick={() => onClick()}
    >
      <IconButton color={color} sx={{ fontSize: 64 }}>
        {children}
      </IconButton>
    </Paper>
  )
}

export default CircleButton
