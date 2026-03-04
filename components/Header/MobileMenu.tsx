'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { NavLink } from './NavLink'

interface MobileMenuProps {
  navItems: { label: string; href: string }[]
  authItems: { label: string; href: string; variant?: 'default' | 'outline' }[]
}

export function MobileMenu({ navItems, authItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { isAmharic } = useLanguage()

  // Close menu when clicking outside or on a link
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 rounded-lg">
        {isOpen ? (
          <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        ) : (
          <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-64 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Navigation Items */}
          <div className="space-y-1">
            <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Navigation</h3>
            {navItems.map((item) => (
              <div key={item.href} onClick={() => setIsOpen(false)}>
                <NavLink href={item.href} className="block w-full text-left">
                  {item.label}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-slate-800" />

          {/* Auth Items */}
          <div className="space-y-2">
            {authItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block">
                <Button
                  variant={item.variant || 'outline'}
                  className={`w-full justify-start ${
                    item.variant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
