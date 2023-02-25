import { StrictMode } from 'react'

import { darkTheme, lightTheme } from '~/config'
import { AuthProvider, ThemeProvider } from '~/contexts'
import Routes from '~/routes'

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider dark={darkTheme} light={lightTheme}>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  )
}

export default App
