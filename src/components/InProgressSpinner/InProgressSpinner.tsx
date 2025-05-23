import { Box, type SxProps, type Theme, Typography } from '@mui/material';
import { type ReactNode } from 'react';

import { Loading } from '~/components';
import { mergeSx } from '~/helpers';

export interface InProgressSpinnerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export function InProgressSpinner({ children, sx = [] }: InProgressSpinnerProps): ReactNode {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          m: 2,
        },
        ...mergeSx(sx),
      ]}
    >
      <Loading margin="none" size={40} />

      {children && (
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {children}
        </Typography>
      )}
    </Box>
  );
}
