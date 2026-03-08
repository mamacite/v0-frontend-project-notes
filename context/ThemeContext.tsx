'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const saved = (localStorage.getItem('theme') as Theme) || 'system'
      setThemeState(saved)

      const html = document.documentElement
      if (saved === 'dark' || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark')
        setIsDark(true)
      } else {
        html.classList.remove('dark')
        setIsDark(false)
      }
    } catch (error) {
      console.error('Failed to initialize theme:', error)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    try {
      localStorage.setItem('theme', newTheme)
    } catch (error) {
      console.error('Failed to save theme preference:', error)
    }

    const html = document.documentElement
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark')
      setIsDark(true)
    } else {
      html.classList.remove('dark')
      setIsDark(false)
    }
  }

  return <ThemeContext.Provider value={{ theme, setTheme, isDark }}>{children}</ThemeContext.Provider>
}

// Default context to prevent hydration errors
const defaultContext: ThemeContextType = {
  theme: 'system',
  setTheme: () => {},
  isDark: false,
}

export function useTheme() {
  const context = useContext(ThemeContext)
  // Return default context if provider not found instead of throwing
  return context || defaultContext
}
