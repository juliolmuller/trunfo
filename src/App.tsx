import { darkTheme, lightTheme } from '~/config'
import { AuthProvider, ThemeProvider } from '~/contexts'
import Routes from '~/routes'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider dark={darkTheme} light={lightTheme}>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
