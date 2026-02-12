'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Menu, X, Globe } from 'lucide-react'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'am' : 'en')
  }

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.explore'), href: '/explore' },
    { label: t('nav.my-stories'), href: '/my-stories' },
    { label: t('nav.bookmarks'), href: '/bookmarks' },
  ]

  const authItems = [
    { label: t('nav.login'), href: '/login' },
    { label: t('nav.signup'), href: '/signup' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold text-blue-600 dark:text-blue-400">
              {t('app.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle language"
              title={language === 'en' ? 'Switch to Amharic' : 'Switch to English'}
            >
              <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {authItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.label === t('nav.signup') ? 'default' : 'outline'}
                    className={
                      item.label === t('nav.signup')
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              {authItems.map((item) => (
                <Link key={item.href} href={item.href} className="flex-1">
                  <Button
                    variant={item.label === t('nav.signup') ? 'default' : 'outline'}
                    className={`w-full ${
                      item.label === t('nav.signup')
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
