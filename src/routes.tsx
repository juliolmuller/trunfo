import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from '~/hooks'

function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>You&rsquo;re not signed in</h1>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>You&rsquo;re signed in</h1>} />
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
