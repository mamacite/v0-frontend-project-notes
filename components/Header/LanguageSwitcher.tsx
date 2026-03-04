'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg" title={`Current language: ${language === 'en' ? 'English' : 'Amharic'}`}>
          <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          <span className="sr-only">Language menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
          <span className="mr-2 text-base">🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('am')} className={language === 'am' ? 'bg-slate-100 dark:bg-slate-800' : ''}>
          <span className="mr-2 text-base">🇪🇹</span>
          Amharic
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
