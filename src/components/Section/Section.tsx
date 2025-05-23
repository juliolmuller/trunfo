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
      elevation={6}
      {...props}
    >
      {title && (
        <Typography
          sx={{
            mb: 4,
            textAlign: 'center',
          }}
          variant="h5"
        >
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
