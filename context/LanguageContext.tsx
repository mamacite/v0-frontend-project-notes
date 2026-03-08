'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'am'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isAmharic: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.my-stories': 'My Stories',
    'nav.bookmarks': 'Bookmarks',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Logout',
    'nav.search': 'Search stories...',
    'nav.notifications': 'Notifications',
    'nav.write': 'Write Story',
    'app.title': 'InkLink',
    'app.tagline': 'Where stories come to life',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',
  },
  am: {
    'nav.home': 'ቤት',
    'nav.explore': 'ስሄድ',
    'nav.my-stories': ' የኔ ታሪክ',
    'nav.bookmarks': 'ምልክቶች',
    'nav.profile': 'ገለባ',
    'nav.admin': 'አስተዳዳሪ',
    'nav.login': 'ግባ',
    'nav.signup': 'ተመዝገብ',
    'nav.logout': 'ውጣ',
    'nav.search': 'ታሪክ ፈልግ...',
    'nav.notifications': 'ማስታወቂያ',
    'nav.write': 'ታሪክ ጻፍ',
    'app.title': 'InkLink',
    'app.tagline': 'ታሪክ አሌ',
    'theme.light': 'ብርሃን',
    'theme.dark': '암',
    'theme.system': 'ስርዓት',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved language from localStorage
    try {
      const saved = localStorage.getItem('language') as Language | null
      if (saved && (saved === 'en' || saved === 'am')) {
        setLanguageState(saved)
        document.documentElement.lang = saved
        document.documentElement.dir = saved === 'am' ? 'rtl' : 'ltr'
      }
    } catch (error) {
      console.error('Failed to load language preference:', error)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
    } catch (error) {
      console.error('Failed to save language preference:', error)
    }
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'am' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  // Always provide context, even before mount, to avoid context errors
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isAmharic: language === 'am' }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Default context to prevent hydration errors
const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  isAmharic: false,
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  // Return default context if provider not found instead of throwing
  return context || defaultContext
}
