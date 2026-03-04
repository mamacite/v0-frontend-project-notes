'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Logo } from './Header/Logo'
import { DesktopNav } from './Header/DesktopNav'
import { AuthButtons } from './Header/AuthButtons'
import { LanguageSwitcher } from './Header/LanguageSwitcher'
import { ThemeSwitcher } from './Header/ThemeSwitcher'
import { MobileMenu } from './Header/MobileMenu'

export function Header() {
  const { t } = useLanguage()

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.explore'), href: '/explore' },
    { label: t('nav.my-stories'), href: '/my-stories' },
    { label: t('nav.bookmarks'), href: '/bookmarks' },
  ]

  const authItems = [
    { label: t('nav.login'), href: '/login', variant: 'outline' as const },
    { label: t('nav.signup'), href: '/signup', variant: 'default' as const },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav navItems={navItems} />

          {/* Right Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Auth Buttons (Desktop) */}
            <AuthButtons authItems={authItems} />

            {/* Mobile Menu */}
            <MobileMenu navItems={navItems} authItems={authItems} />
          </div>
        </div>
      </div>
    </header>
  )
}
