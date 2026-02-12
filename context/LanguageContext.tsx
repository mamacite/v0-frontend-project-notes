'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'am'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
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
    'app.title': 'InkLink',
    'app.tagline': 'Where stories come to life',
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
    'app.title': 'InkLink',
    'app.tagline': 'ታሪክ አሌ',
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
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
