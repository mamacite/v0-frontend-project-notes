'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { supabase } from '@/lib/auth'
import { BookOpen, Heart, MessageSquare, Search } from 'lucide-react'

interface Story {
  id: string
  title_en: string
  title_am: string
  description_en: string
  description_am: string
  cover_image_url: string
  category: string
  author_id: string
  views_count: number
  likes_count: number
  comments_count: number
  read_time_minutes: number
}

export default function ExplorePage() {
  const { t, isAmharic } = useLanguage()
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = [
    { value: 'all', label: isAmharic ? 'ሁሉም' : 'All' },
    { value: 'fiction', label: isAmharic ? 'ልብወለድ' : 'Fiction' },
    { value: 'romance', label: isAmharic ? 'ወንጌል' : 'Romance' },
    { value: 'mystery', label: isAmharic ? 'ምስጢር' : 'Mystery' },
    { value: 'adventure', label: isAmharic ? 'ጀብድ' : 'Adventure' },
    { value: 'fantasy', label: isAmharic ? 'ምናት' : 'Fantasy' },
  ]

  useEffect(() => {
    fetchStories()
  }, [])

  useEffect(() => {
    let filtered = stories
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(s =>
        s.title_en.toLowerCase().includes(query) ||
        s.title_am.includes(query) ||
        s.description_en.toLowerCase().includes(query)
      )
    }
    
    setFilteredStories(filtered)
  }, [stories, selectedCategory, searchQuery])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setStories(data || [])
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'ታሪክ ስሄድ' : 'Explore Stories'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6" dir={isAmharic ? 'rtl' : 'ltr'}>
            {isAmharic ? 'ብዙ ታሪክ ዓለም ውስጥ ስሄድ' : 'Discover amazing stories from authors around the world'}
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder={t('nav.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.value)}
                className={selectedCategory === cat.value ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">{isAmharic ? 'ይጠብቁ...' : 'Loading...'}</p>
          </div>
        ) : filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">{isAmharic ? 'ታሪክ አልተገኘም' : 'No stories found'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(story => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                  {/* Cover Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-950 flex items-center justify-center">
                    {story.cover_image_url ? (
                      <img src={story.cover_image_url} alt={story.title_en} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="w-12 h-12 text-blue-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 uppercase font-semibold mb-1">
                        {story.category}
                      </p>
                      <h3
                        className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 text-balance"
                        dir={isAmharic ? 'rtl' : 'ltr'}
                      >
                        {isAmharic ? story.title_am : story.title_en}
                      </h3>
                    </div>

                    <p
                      className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2"
                      dir={isAmharic ? 'rtl' : 'ltr'}
                    >
                      {isAmharic ? story.description_am : story.description_en}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {story.read_time_minutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {story.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {story.comments_count}
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
