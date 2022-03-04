import Box from '@mui/material/Box'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Loading from '~/components/Loading'
import { useAuth } from '~/hooks'

import AppBar from './AppBar'
import Drawer from './Drawer'
import DrawerHeader from './DrawerHeader'

function AppLayout() {
  const { isLoading } = useAuth()
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  function handleDrawerOpen() {
    setDrawerOpen(true)
  }

  function handleDrawerClose() {
    setDrawerOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', height: 'inherit' }}>
      <AppBar onOpenDrawer={handleDrawerOpen} />
      <Drawer open={isDrawerOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          p: 3,
        }}
      >
        <DrawerHeader />
        {isLoading ? <Loading /> : <Outlet />}
      </Box>
    </Box>
  )
}

export default AppLayout
