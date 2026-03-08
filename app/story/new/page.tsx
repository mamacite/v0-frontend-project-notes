'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/auth'

export default function NewStoryPage() {
  const { t, isAmharic } = useLanguage()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAm: '',
    descriptionEn: '',
    descriptionAm: '',
    contentEn: '',
    contentAm: '',
    category: 'fiction',
    status: 'draft',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        router.push('/login')
        return
      }

      const { error } = await supabase.from('stories').insert({
        author_id: authUser.id,
        title_en: formData.titleEn,
        title_am: formData.titleAm,
        description_en: formData.descriptionEn,
        description_am: formData.descriptionAm,
        content_en: formData.contentEn,
        content_am: formData.contentAm,
        category: formData.category,
        status: formData.status,
        word_count: formData.contentEn.split(' ').length,
        read_time_minutes: Math.ceil(formData.contentEn.split(' ').length / 200),
      })

      if (error) throw error
      router.push('/my-stories')
    } catch (error: any) {
      console.error('Error creating story:', error)
      alert(error.message || 'Failed to create story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {isAmharic ? 'ታሪክ ጻፍ' : 'Write a New Story'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          {isAmharic ? 'እርስዎ ታሪክ ይጀምሩ' : 'Share your story with the world'}
        </p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg p-8 space-y-6">
          {/* English Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title (English)
            </label>
            <Input
              type="text"
              name="titleEn"
              value={formData.titleEn}
              onChange={handleChange}
              placeholder="Enter story title in English"
              required
              disabled={loading}
            />
          </div>

          {/* Amharic Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ርዕስ (አማርኛ)
            </label>
            <Input
              type="text"
              name="titleAm"
              value={formData.titleAm}
              onChange={handleChange}
              placeholder="ታሪክ ርዕስ አማርኛ ውሰድ"
              disabled={loading}
              dir="rtl"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ምድብ' : 'Category'}
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="fiction">Fiction</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="adventure">Adventure</option>
              <option value="fantasy">Fantasy</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* English Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description (English)
            </label>
            <textarea
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              placeholder="Brief description of your story"
              disabled={loading}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* Amharic Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ገለጻ (አማርኛ)
            </label>
            <textarea
              name="descriptionAm"
              value={formData.descriptionAm}
              onChange={handleChange}
              placeholder="ታሪክ ገለጻ አማርኛ"
              disabled={loading}
              rows={3}
              dir="rtl"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          {/* English Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Story Content (English)
            </label>
            <textarea
              name="contentEn"
              value={formData.contentEn}
              onChange={handleChange}
              placeholder="Write your story here..."
              disabled={loading}
              rows={12}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>

          {/* Amharic Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ታሪክ ይዘት (አማርኛ)
            </label>
            <textarea
              name="contentAm"
              value={formData.contentAm}
              onChange={handleChange}
              placeholder="ታሪክ አማርኛ ይጻፉ..."
              disabled={loading}
              rows={12}
              dir="rtl"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {isAmharic ? 'ሁኔታ' : 'Status'}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="draft">{isAmharic ? 'ረቂቅ' : 'Draft'}</option>
              <option value="published">{isAmharic ? 'ታተመ' : 'Published'}</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {loading ? (isAmharic ? 'ይጠብቁ...' : 'Saving...') : isAmharic ? 'ኖስ' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
            >
              {isAmharic ? 'ተመለስ' : 'Cancel'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
