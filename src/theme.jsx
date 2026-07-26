import { createContext, useContext, useMemo, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const ColorModeContext = createContext({ mode: 'light', toggle: () => {} })

export const useColorMode = () => useContext(ColorModeContext)

const STORAGE_KEY = 'playground:color-mode'

const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'
const DISPLAY = '"Space Grotesk", "Inter", system-ui, sans-serif'
const BODY = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif'

function getInitialMode() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function buildPalette(mode) {
  const light = mode === 'light'

  return {
    mode,
    primary: { main: light ? '#c5402a' : '#ff8a6b', contrastText: light ? '#ffffff' : '#1a1005' },
    text: {
      primary: light ? '#16181d' : '#f2f0ee',
      secondary: light ? '#6d6a66' : '#a19d98',
    },
    background: {
      default: light ? '#faf9f7' : '#0e0f12',
      paper: light ? '#ffffff' : '#16181d',
    },
    divider: light ? 'rgba(22, 24, 29, 0.11)' : 'rgba(242, 240, 238, 0.13)',
  }
}

/**
 * Global theme: colors, fonts and the default look of every MUI component.
 * Projects render inside it, so they inherit the Playground identity and work
 * in both light and dark mode for free.
 */
export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode)

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () =>
        setMode((current) => {
          const next = current === 'light' ? 'dark' : 'light'
          localStorage.setItem(STORAGE_KEY, next)
          return next
        }),
    }),
    [mode],
  )

  const theme = useMemo(() => {
    const palette = buildPalette(mode)

    return createTheme({
      palette,
      shape: { borderRadius: 10 },
      typography: {
        fontFamily: BODY,
        fontFamilyMono: MONO,
        h1: { fontFamily: DISPLAY, fontSize: 'clamp(2.4rem, 6vw, 3.4rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.05 },
        h2: { fontFamily: DISPLAY, fontSize: '1.7rem', fontWeight: 600, letterSpacing: '-0.025em' },
        h3: { fontFamily: DISPLAY, fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em' },
        h4: { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.02em' },
        h5: { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: '-0.015em' },
        h6: { fontFamily: DISPLAY, fontSize: '1.02rem', fontWeight: 600, letterSpacing: '-0.01em' },
        subtitle1: { lineHeight: 1.6 },
        body2: { lineHeight: 1.65 },
        overline: { fontFamily: MONO, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em' },
        button: { textTransform: 'none', fontWeight: 500, letterSpacing: 0 },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            'code, kbd, pre, samp': { fontFamily: MONO, fontSize: '0.9em' },
            '::selection': { background: palette.primary.main, color: palette.primary.contrastText },
          },
        },
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        MuiCard: { defaultProps: { variant: 'outlined' } },
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: { root: { borderRadius: 8, paddingInline: 16 } },
        },
        MuiChip: {
          styleOverrides: {
            root: { fontFamily: MONO, fontWeight: 500, fontSize: '0.74rem' },
            sizeSmall: { height: 22 },
          },
        },
        MuiOutlinedInput: { styleOverrides: { root: { backgroundColor: palette.background.paper } } },
        MuiTooltip: {
          defaultProps: { arrow: true },
          styleOverrides: { tooltip: { fontSize: '0.75rem' } },
        },
        MuiAlert: { styleOverrides: { root: { borderRadius: 10 } } },
      },
    })
  }, [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
