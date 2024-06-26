import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Logout as SignOutIcon,
} from '@mui/icons-material'
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { useAuth, useTheme } from '~/helpers'

import { DrawerHeader } from '../DrawerHeader'

export interface DrawerProps {
  open: boolean
  onClose: () => void
}

export function Drawer({ open, onClose }: DrawerProps) {
  const { isAuthenticated, signOut } = useAuth()
  const theme = useTheme()

  return (
    <MuiDrawer anchor="right" open={open} onClose={() => onClose()}>
      <DrawerHeader>
        <IconButton onClick={() => onClose()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem button onClick={theme.toggleThemeMode}>
          <ListItemIcon>{theme.isDark ? <LightModeIcon /> : <DarkModeIcon />}</ListItemIcon>
          <ListItemText primary={theme.isDark ? 'Tema claro' : 'Tema escuro'} />
        </ListItem>
        {isAuthenticated && (
          <ListItem button onClick={signOut}>
            <ListItemIcon>
              <SignOutIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        )}
      </List>
    </MuiDrawer>
  )
}
