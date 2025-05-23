import { type Breakpoint, Paper, type PaperProps, Typography } from '@mui/material';
import { type ReactNode } from 'react';

import { mergeSx } from '~/helpers';

export interface SectionProps extends PaperProps {
  fullWidth?: boolean;
  maxWidth?: 'auto' | 'inherit' | Breakpoint | number;
  title?: string;
}

export function Section({
  children,
  fullWidth,
  maxWidth = 'auto',
  sx = {},
  title,
  ...props
}: SectionProps): ReactNode {
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
  );
}
