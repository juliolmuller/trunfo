import { Menu as MenuIcon } from '@mui/icons-material';
import { Container, IconButton, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import { type ReactNode } from 'react';

export interface AppBarProps {
  onOpenDrawer: () => void;
}

export function AppBar({ onOpenDrawer }: AppBarProps): ReactNode {
  return (
    <MuiAppBar sx={{ bgcolor: 'primary.main' }} position="relative">
      <Toolbar component={Container}>
        <Typography sx={{ flexGrow: 1 }} component="div" noWrap variant="h6">
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
