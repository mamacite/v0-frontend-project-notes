import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import { Header } from '@/components/Header'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InkLink - Where Stories Come to Life',
  description: 'Discover, read, and share stories on InkLink. A bilingual platform for storytellers and readers.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Header />
          <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
}
