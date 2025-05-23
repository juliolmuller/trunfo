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
      sx={mergeSx(
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          m: 2,
        },
        sx,
      )}
    >
      <Loading margin="none" size={40} />

      {children && (
        <Typography sx={{ fontStyle: 'italic' }} variant="caption">
          {children}
        </Typography>
      )}
    </Box>
  );
}
