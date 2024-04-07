import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export interface AppBarProps {
  onOpenDrawer: () => void
}

function AppBar({ onOpenDrawer }: AppBarProps) {
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
  )
}

export default AppBar
