'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUp } from '@/lib/auth'
import { BookOpen } from 'lucide-react'

export default function SignupPage() {
  const { t, isAmharic } = useLanguage()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    username: '',
    role: 'reader' as const,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError(isAmharic ? 'ስሌት የማይመሳሰል' : 'Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        username: formData.username,
        role: formData.role,
      })
      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'Failed to sign up')
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
            {isAmharic ? 'ተመዝገብ' : 'Join InkLink'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'ታሪክ ዓለም ውስጥ ይግባ' : 'Create your account today'}
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ሙሉ ስም' : 'Full Name'}
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder={isAmharic ? 'ሙሉ ስም ውሰድ' : 'Enter your full name'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ጠቅላላ ስም' : 'Username'}
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder={isAmharic ? 'ጠቅላላ ስም ውሰድ' : 'Choose a username'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ኢሜይል' : 'Email'}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isAmharic ? 'ስሌት ውሰድ' : 'Create a password'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ስሌት አረጋግጥ' : 'Confirm Password'}
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={isAmharic ? 'ስሌት አረጋግጥ' : 'Confirm your password'}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ሚናዎ ምን ነው?' : 'I am a...'}
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="reader">{isAmharic ? 'ተንበባይ' : 'Reader'}</option>
              <option value="author">{isAmharic ? 'ደራሲ' : 'Author'}</option>
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2">
            {loading ? (isAmharic ? 'ተመዝገብ...' : 'Creating account...') : isAmharic ? 'ተመዝገብ' : 'Sign Up'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'አስቀድሞ መያዣ አለዎ?' : 'Already have an account?'}{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              {isAmharic ? 'ግባ' : 'Sign in'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
