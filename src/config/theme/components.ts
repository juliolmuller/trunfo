import { type Components } from '@mui/material';

export const components: Components = {
  MuiButton: {
    defaultProps: {
      size: 'large',
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        '&:active': {
          boxShadow: 'none',
          transform: 'scale(0.99)',
        },
      },
      sizeLarge: {
        borderRadius: '1.375rem',
        fontSize: '1rem',
      },
      sizeMedium: {
        borderRadius: '1.163rem',
        fontSize: '0.9rem',
      },
      sizeSmall: {
        borderRadius: '0.95rem',
        fontSize: '0.8rem',
      },
    },
  },

  MuiDialog: {
    defaultProps: {
      BackdropProps: {
        style: {
          backdropFilter: 'blur(3px)',
        },
      },
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
      disableInteractive: true,
      slotProps: {
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      },
    },
    styleOverrides: {
      tooltip: {
        maxWidth: 260,
        boxShadow: `
          0 1px 10px 0px rgba(0, 0, 0, 0.1),
          0 3px 4px 0px rgba(0, 0, 0, 0.1),
          0 1px 4px 0px rgba(0, 0, 0, 0.14)
        `,

        fontSize: '0.875rem',
        textAlign: 'center',
        textWrap: 'balance',
        userSelect: 'none',
      },
    },
  },
};
