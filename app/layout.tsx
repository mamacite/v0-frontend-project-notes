import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { RootLayoutClient } from './RootLayoutClient'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InkLink - Where Stories Come to Life',
  description: 'Discover, read, and share stories on InkLink. A bilingual platform for storytellers and readers.',
  keywords: 'stories, reading, writing, bilingual, English, Amharic',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: true,
    minimumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
