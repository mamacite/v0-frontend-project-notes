'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { Header } from '@/components/Header'

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <main className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950">
          {children}
        </main>
      </LanguageProvider>
    </ThemeProvider>
  )
}
