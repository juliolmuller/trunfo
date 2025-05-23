import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Logout as SignOutIcon,
} from '@mui/icons-material';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
} from '@mui/material';
import { type ReactNode } from 'react';

import { useAuth, useTheme } from '~/helpers';

import { DrawerHeader } from '../DrawerHeader';

export interface DrawerProps {
  onClose: () => void;
  open: boolean;
}

export function Drawer({ open, onClose }: DrawerProps): ReactNode {
  const { isAuthenticated, signOut } = useAuth();
  const theme = useTheme();

  return (
    <MuiDrawer anchor="right" open={open} onClose={() => onClose()}>
      <DrawerHeader>
        <IconButton onClick={() => onClose()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem>
          <ListItemButton onClick={theme.toggleThemeMode}>
            <ListItemIcon>{theme.isDark ? <LightModeIcon /> : <DarkModeIcon />}</ListItemIcon>
            <ListItemText primary={theme.isDark ? 'Tema Claro' : 'Tema Escuro'} />
          </ListItemButton>
        </ListItem>

        {isAuthenticated && (
          <ListItem>
            <ListItemButton onClick={signOut}>
              <ListItemIcon>
                <SignOutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </MuiDrawer>
  );
}
