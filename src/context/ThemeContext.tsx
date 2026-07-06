import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { colorThemes, DEFAULT_COLOR_THEME, type ColorThemeId } from '../data/colorThemes'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorThemeId
  toggleTheme: () => void
  setColorTheme: (color: ColorThemeId) => void
  colorThemes: typeof colorThemes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('wanderhive-theme') ?? localStorage.getItem('tripverse-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* ignore */
  }
  return 'dark'
}

function getInitialColorTheme(): ColorThemeId {
  try {
    const saved = localStorage.getItem('wanderhive-color') ?? localStorage.getItem('tripverse-color')
    if (saved && colorThemes.some(t => t.id === saved)) return saved as ColorThemeId
  } catch {
    /* ignore */
  }
  return DEFAULT_COLOR_THEME
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [colorTheme, setColorThemeState] = useState<ColorThemeId>(getInitialColorTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    try {
      localStorage.setItem('wanderhive-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme)
    try {
      localStorage.setItem('wanderhive-color', colorTheme)
    } catch {
      /* ignore */
    }
  }, [colorTheme])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  const setColorTheme = (color: ColorThemeId) => setColorThemeState(color)

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, toggleTheme, setColorTheme, colorThemes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
