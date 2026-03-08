'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Edit, Trash2 } from 'lucide-react'

interface AuthorStory {
  id: string
  title_en: string
  title_am: string
  status: string
  views_count: number
  likes_count: number
  created_at: string
}

export default function MyStoriesPage() {
  const { t, isAmharic } = useLanguage()
  const router = useRouter()
  const [stories, setStories] = useState<AuthorStory[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchUserStories()
  }, [])

  const fetchUserStories = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        router.push('/login')
        return
      }

      setUser(authUser)

      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('author_id', authUser.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setStories(data || [])
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm(isAmharic ? 'ታሪክ ደምሳሳ?' : 'Delete this story?')) return
    
    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', storyId)

      if (error) throw error
      setStories(stories.filter(s => s.id !== storyId))
    } catch (error) {
      console.error('Error deleting story:', error)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white" dir={isAmharic ? 'rtl' : 'ltr'}>
              {t('nav.my-stories')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2" dir={isAmharic ? 'rtl' : 'ltr'}>
              {isAmharic ? 'እርስዎ ታሪክ ሙሉ' : 'All your stories'}
            </p>
          </div>
          <Link href="/story/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {t('nav.write')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Stories List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <p className="text-center text-slate-600 dark:text-slate-400">{isAmharic ? 'ይጠብቁ...' : 'Loading...'}</p>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-400" dir={isAmharic ? 'rtl' : 'ltr'}>
              {isAmharic ? 'ታሪክ ጻፍዋል ዚ አይደለም' : "You haven't written any stories yet"}
            </p>
            <Link href="/story/new" className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block">
              {t('nav.write')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {stories.map(story => (
              <div key={story.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1" dir={isAmharic ? 'rtl' : 'ltr'}>
                    {isAmharic ? story.title_am : story.title_en}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium">
                      {story.status}
                    </span>
                    <span>{story.views_count} {isAmharic ? 'ተቀብሞ' : 'views'}</span>
                    <span>{story.likes_count} {isAmharic ? 'ወደ' : 'likes'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/story/${story.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      {isAmharic ? 'ከተወጉ' : 'Edit'}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(story.id)}
                    className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
