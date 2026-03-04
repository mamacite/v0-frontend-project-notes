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
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'en' || saved === 'am')) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'am' ? 'rtl' : 'ltr'
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isAmharic: language === 'am' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
