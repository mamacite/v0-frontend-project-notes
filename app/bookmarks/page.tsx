'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/auth'
import Link from 'next/link'
import { BookOpen, Heart, MessageSquare } from 'lucide-react'

interface BookmarkedStory {
  id: string
  story_id: string
  created_at: string
  stories: {
    id: string
    title_en: string
    title_am: string
    description_en: string
    description_am: string
    category: string
    read_time_minutes: number
    likes_count: number
    comments_count: number
  }
}

export default function BookmarksPage() {
  const { t, isAmharic } = useLanguage()
  const router = useRouter()
  const [bookmarks, setBookmarks] = useState<BookmarkedStory[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchUserAndBookmarks()
  }, [])

  const fetchUserAndBookmarks = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        router.push('/login')
        return
      }

      setUser(authUser)

      const { data, error } = await supabase
        .from('bookmarks')
        .select('*, stories(*)')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookmarks(data || [])
    } catch (error) {
      console.error('Error fetching bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white" dir={isAmharic ? 'rtl' : 'ltr'}>
            {t('nav.bookmarks')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'እርስዎ ምልክት ታሪክ' : 'Your saved stories'}
          </p>
        </div>
      </section>

      {/* Bookmarks List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <p className="text-center text-slate-600 dark:text-slate-400">{isAmharic ? 'ይጠብቁ...' : 'Loading...'}</p>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
              {isAmharic ? 'ምልክት ታሪክ የለም' : 'No bookmarked stories yet'}
            </p>
            <Link href="/explore" className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
              {isAmharic ? 'ስሄድ' : 'Explore stories'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(bookmark => (
              <Link key={bookmark.id} href={`/story/${bookmark.story_id}`}>
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-blue-400" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 text-balance" dir={isAmharic ? 'rtl' : 'ltr'}>
                      {isAmharic ? bookmark.stories.title_am : bookmark.stories.title_en}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {bookmark.stories.read_time_minutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {bookmark.stories.likes_count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
