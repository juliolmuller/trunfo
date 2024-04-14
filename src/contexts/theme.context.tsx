import {
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
  Theme,
  useTheme as useMuiTheme,
} from '@mui/material'
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
          <CssBaseline />

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
