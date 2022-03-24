import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SignOutIcon from '@mui/icons-material/Logout'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { useAuth, useTheme } from '~/hooks'

import DrawerHeader from '../DrawerHeader'

export interface DrawerProps {
  open: boolean
  onClose: () => void
}

function Drawer({ open, onClose }: DrawerProps) {
  const { isAuthenticated, signOut } = useAuth()
  const theme = useTheme()

  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={() => onClose()}
    >
      <DrawerHeader>
        <IconButton onClick={() => onClose()}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        <ListItem button onClick={theme.toggleThemeMode}>
          <ListItemIcon>
            {theme.isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
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

export default Drawer
