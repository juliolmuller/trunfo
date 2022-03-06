import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { GameProvider } from '~/contexts'
import { useAuth } from '~/hooks'
import AppLayout from '~/layouts/AppLayout'
import GameFormPage from '~/pages/GameFormPage'
import HomePage from '~/pages/HomePage'
import LoginPage from '~/pages/LoginPage'

function PublicRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="*" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}

function AuthRoutes() {
  return (
    <GameProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="new" element={<GameFormPage />} />
        </Route>
      </Routes>
    </GameProvider>
  )
}

function Router() {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      {isAuthenticated ? <AuthRoutes /> : <PublicRouter />}
    </BrowserRouter>
  )
}

export default Router
