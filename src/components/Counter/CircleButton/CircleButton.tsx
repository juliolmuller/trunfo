import { alpha, IconButton, Paper, type SvgIconProps } from '@mui/material';
import { type ReactElement, type ReactNode } from 'react';

export interface CircleButtonProps {
  children: ReactElement<SvgIconProps>;
  color: 'error' | 'success';
  onClick: () => void;
  size?: 'big' | 'small';
}

export function CircleButton({
  children,
  color,
  size = 'small',
  onClick,
}: CircleButtonProps): ReactNode {
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
      <IconButton sx={{ fontSize: size === 'small' ? 24 : 64 }} color={color} tabIndex={-1}>
        {children}
      </IconButton>
    </Paper>
  );
}
