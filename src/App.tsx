import { StrictMode } from 'react'

import { darkTheme, lightTheme } from '~/config'
import { AuthProvider, ThemeProvider } from '~/contexts'
import { Router } from '~/routes'

export function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider dark={darkTheme} light={lightTheme}>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  )
}
