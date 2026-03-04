'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export function Logo() {
  const { t } = useLanguage()

  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
      {/* Logo Icon */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-600/50 transition-all duration-300">
        <span className="text-white font-bold text-lg">I</span>
      </div>

      {/* Logo Text */}
      <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
        {t('app.title')}
      </span>
    </Link>
  )
}
