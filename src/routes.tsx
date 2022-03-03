import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useAuth } from '~/hooks'
import AppLayout from '~/layouts/AppLayout'
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
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
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
