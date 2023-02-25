import { Components } from '@mui/material/styles'

const componentsDefaults: Components = {
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backdropFilter: 'blur(3px)',
      },
    },
  },

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

  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
  },
}

export default componentsDefaults
