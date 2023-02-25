import { CssBaseline, PaletteMode, StyledEngineProvider } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { Theme, useTheme as useMuiTheme } from '@mui/system'
import { createContext, ReactNode, useCallback, useContext } from 'react'

import { useLocalStorage } from '~/helpers'

export interface ThemeContextProps {
  isDark: boolean
  isLight: boolean
  mode: PaletteMode
  setThemeMode: (mode: PaletteMode) => void
  toggleThemeMode: () => void
}

export interface ThemeProviderProps {
  children: ReactNode
  light: Theme
  dark: Theme
}

export const ThemeContext = createContext({} as ThemeContextProps)

export function ThemeProvider({ children, dark, light }: ThemeProviderProps) {
  const [mode, setMode] = useLocalStorage<PaletteMode>('theme', 'light')
  const isLight = mode === 'light'
  const isDark = mode === 'dark'
  const actualTheme = isLight ? light : dark

  const toggleThemeMode = useCallback(() => {
    setMode(isLight ? 'dark' : 'light')
  }, [isLight, setMode])

  return (
    <ThemeContext.Provider
      value={{
        mode: mode as PaletteMode,
        isDark,
        isLight,
        setThemeMode: setMode,
        toggleThemeMode,
      }}
    >
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={actualTheme}>
          <CssBaseline /> {/* <== kickstart a simple and consistent baseline to build upon. */}
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): Theme & ThemeContextProps {
  const context = useContext(ThemeContext)
  const theme = useMuiTheme()

  return {
    ...context,
    ...theme,
  }
}
