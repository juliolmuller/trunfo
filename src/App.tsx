import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import { theme } from '~/config'
import Routes from '~/routes'

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* <== kickstart a simple and consistent baseline to build upon. */}
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>)
}

export default App
