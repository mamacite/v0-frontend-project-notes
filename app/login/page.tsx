'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn } from '@/lib/auth'
import { BookOpen } from 'lucide-react'

export default function LoginPage() {
  const { t, isAmharic } = useLanguage()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn({ email, password })
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">InkLink</h1>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'ግባ' : 'Welcome Back'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'ታሪክ ዓለም ውስጥ ይገቡ' : 'Sign in to your account'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ኢሜይል' : 'Email'}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAmharic ? 'ኢሜይል ውሰድ' : 'Enter your email'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ስሌት' : 'Password'}
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isAmharic ? 'ስሌት ውሰድ' : 'Enter your password'}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
            {loading ? (isAmharic ? 'ገባ...' : 'Signing in...') : isAmharic ? 'ግባ' : 'Sign In'}
          </Button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'መያዣ የለዎ?' : "Don't have an account?"}{' '}
            <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              {isAmharic ? 'ተመዝገብ' : 'Sign up'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
