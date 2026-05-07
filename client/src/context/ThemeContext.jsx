import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'flux-theme'
const ThemeContext = createContext(null)

const isValidTheme = (theme) => theme === 'light' || theme === 'dark'

const getSavedTheme = () => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

const saveTheme = (theme) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore localStorage errors silently
  }
}

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = getSavedTheme()

  if (isValidTheme(savedTheme)) {
    return savedTheme
  }

  return getSystemTheme()
}

const applyTheme = (theme) => {
  const root = document.documentElement

  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = (event) => {
      const savedTheme = getSavedTheme()

      if (isValidTheme(savedTheme)) return

      setThemeState(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const setTheme = (nextTheme) => {
    if (!isValidTheme(nextTheme)) return

    saveTheme(nextTheme)
    setThemeState(nextTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}