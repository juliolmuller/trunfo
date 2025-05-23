import { Menu as MenuIcon } from '@mui/icons-material';
import { Container, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { type ReactNode } from 'react';

export interface AppBarProps {
  onOpenDrawer: () => void;
}

export function AppBar({ onOpenDrawer }: AppBarProps): ReactNode {
  return (
    <MuiAppBar position="relative" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar component={Container}>
        <Typography component="div" noWrap variant="h6" sx={{ flexGrow: 1 }}>
          Trunfo
        </Typography>

        <IconButton
          color="inherit"
          edge="end"
          onClick={() => onOpenDrawer()}
          aria-label="abrir menu hambúrguer"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}
