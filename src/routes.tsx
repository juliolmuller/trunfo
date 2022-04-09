import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { GameProvider } from '~/contexts'
import { useAuth } from '~/helpers'
import AppLayout from '~/layouts/AppLayout'
import GameFormPage from '~/pages/GameFormPage'
import GameMatchPage from '~/pages/GameMatchPage'
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
          <Route path="/new" element={<GameFormPage />} />
          <Route path="/game/:gameId" element={<GameMatchPage />} />
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
