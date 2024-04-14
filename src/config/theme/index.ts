import { createTheme, ThemeOptions } from '@mui/material'

import { components } from './components'
import { palette } from './palette'

const commonThemeOptions: ThemeOptions = {
  components,
  palette,
}

export const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...commonThemeOptions.palette,
    mode: 'dark',
  },
})

export const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    ...commonThemeOptions.palette,
    mode: 'light',
  },
})
