'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function ExplorePage() {
  const { t, language } = useLanguage()
  const isAmharic = language === 'am'

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      dir={isAmharic ? 'rtl' : 'ltr'}
    >
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {t('nav.explore')}
      </h1>
      <p className="text-slate-600 dark:text-slate-400">
        {isAmharic
          ? 'ታሪክ ምዕራፍ በውስጥ ስሄድ ...'
          : 'Explore page coming soon...'}
      </p>
    </div>
  )
}
