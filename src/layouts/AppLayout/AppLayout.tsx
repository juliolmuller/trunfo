import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Loading from '~/components/Loading'
import { useAuth } from '~/helpers'

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
    <Stack height="inherit">
      <AppBar onOpenDrawer={handleDrawerOpen} />
      <Drawer open={isDrawerOpen} onClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 1,
          px: [1, 2, 3],
          mt: 4,
          mb: [4, 6],
        }}
      >
        <DrawerHeader />
        {isLoading ? <Loading /> : <Outlet />}
      </Box>
    </Stack>
  )
}

export default AppLayout
