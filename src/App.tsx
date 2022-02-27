import { darkTheme, lightTheme } from '~/config'
import { ThemeProvider } from '~/contexts'
import Routes from '~/routes'

function App() {
  return (
    <ThemeProvider dark={darkTheme} light={lightTheme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
