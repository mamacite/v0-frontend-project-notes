'use client'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { BookOpen, Sparkles, Users } from 'lucide-react'

export default function HomePage() {
  const { t, language } = useLanguage()
  const isAmharic = language === 'am'

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1
                className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                <span className="text-blue-600 dark:text-blue-400">{t('app.title')}</span>
              </h1>
              <p
                className="text-xl text-slate-600 dark:text-slate-300 text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {t('app.tagline')}
              </p>
              <p
                className="text-base text-slate-500 dark:text-slate-400 leading-relaxed text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic
                  ? 'ታሪክ አሚጁ ና ሮክን ያመቡ። ጻፉ፣ ይሁኑ እና ሌሎች አንብበው ዓለም ሙሉ።'
                  : 'Discover stories that inspire and entertain. Write, share, and connect with readers from around the world.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/explore">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    {isAmharic ? 'ስሄድ' : 'Start Exploring'}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
                    {isAmharic ? 'ታሪክ ጻፍ' : 'Write a Story'}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-950 rounded-2xl flex items-center justify-center">
                <div className="text-blue-600 dark:text-blue-400">
                  <BookOpen size={120} strokeWidth={1} opacity={0.6} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-balance"
              dir={isAmharic ? 'rtl' : 'ltr'}
            >
              {isAmharic ? 'ለምን InkLink?' : 'Why InkLink?'}
            </h2>
            <p
              className="text-lg text-slate-600 dark:text-slate-300 text-balance"
              dir={isAmharic ? 'rtl' : 'ltr'}
            >
              {isAmharic
                ? 'የታሪክ አሻንጉሊት የኛ መሠረት።'
                : 'Everything you need to discover and share amazing stories.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3
                className="text-xl font-semibold text-slate-900 dark:text-white text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic ? 'ብዛት ታሪክ' : 'Vast Library'}
              </h3>
              <p
                className="text-slate-600 dark:text-slate-400 text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic
                  ? 'ሺህ የሚቆጠሩ ታሪክ ወደ ፈለግህ።'
                  : 'Explore thousands of stories across all genres and languages.'}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3
                className="text-xl font-semibold text-slate-900 dark:text-white text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic ? 'AI ምኞቶች' : 'AI-Powered Tools'}
              </h3>
              <p
                className="text-slate-600 dark:text-slate-400 text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic
                  ? 'AI ድምጻዊ አገልግልዎ ወደ ምኖት።'
                  : 'Get AI summaries and text-to-speech for all stories.'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3
                className="text-xl font-semibold text-slate-900 dark:text-white text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic ? 'ማህበረሰብ' : 'Community'}
              </h3>
              <p
                className="text-slate-600 dark:text-slate-400 text-balance"
                dir={isAmharic ? 'rtl' : 'ltr'}
              >
                {isAmharic
                  ? 'ቦሌቦል ምናየ ስለ ታሪክ።'
                  : 'Connect with writers and readers who love stories.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center space-y-6">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white text-balance"
            dir={isAmharic ? 'rtl' : 'ltr'}
          >
            {isAmharic ? 'ዛሪ ጀምር' : 'Ready to Start?'}
          </h2>
          <p
            className="text-lg text-blue-100 text-balance"
            dir={isAmharic ? 'rtl' : 'ltr'}
          >
            {isAmharic
              ? 'ናብ ታሪክ ዓለም ይግባ።'
              : 'Join thousands of readers and writers on InkLink today.'}
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-600 font-semibold">
              {isAmharic ? 'ተመዝገብ አሁን' : 'Sign Up Now'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
