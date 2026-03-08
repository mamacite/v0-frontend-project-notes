'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { supabase } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, MessageSquare, Bookmark, Share2, BookOpen } from 'lucide-react'

interface Story {
  id: string
  title_en: string
  title_am: string
  content_en: string
  content_am: string
  author_id: string
  likes_count: number
  comments_count: number
  views_count: number
  category: string
  created_at: string
  user_profiles?: {
    full_name: string
    username: string
    avatar_url: string
  }
}

interface Comment {
  id: string
  content: string
  created_at: string
  user_id: string
  user_profiles?: {
    full_name: string
    username: string
  }
}

export default function StoryPage() {
  const { id } = useParams()
  const { t, isAmharic } = useLanguage()
  const [story, setStory] = useState<Story | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchStoryAndComments()
  }, [id])

  const fetchStoryAndComments = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      setUser(authUser)

      const { data: storyData, error: storyError } = await supabase
        .from('stories')
        .select('*, user_profiles(*)')
        .eq('id', id)
        .single()

      if (storyError) throw storyError
      setStory(storyData)

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*, user_profiles(*)')
        .eq('story_id', id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false })

      if (commentsError) throw commentsError
      setComments(commentsData || [])

      if (authUser) {
        const { data: likeData } = await supabase
          .from('likes')
          .select('*')
          .eq('story_id', id)
          .eq('user_id', authUser.id)
          .single()

        setIsLiked(!!likeData)

        const { data: bookmarkData } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('story_id', id)
          .eq('user_id', authUser.id)
          .single()

        setIsBookmarked(!!bookmarkData)
      }
    } catch (error) {
      console.error('Error fetching story:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleLike = async () => {
    if (!user) return
    try {
      if (isLiked) {
        await supabase.from('likes').delete().eq('story_id', id).eq('user_id', user.id)
        setStory(story ? { ...story, likes_count: story.likes_count - 1 } : null)
      } else {
        await supabase.from('likes').insert({ story_id: id, user_id: user.id })
        setStory(story ? { ...story, likes_count: story.likes_count + 1 } : null)
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const toggleBookmark = async () => {
    if (!user) return
    try {
      if (isBookmarked) {
        await supabase.from('bookmarks').delete().eq('story_id', id).eq('user_id', user.id)
      } else {
        await supabase.from('bookmarks').insert({ story_id: id, user_id: user.id })
      }
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newComment.trim()) return

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          story_id: id,
          user_id: user.id,
          content: newComment,
        })
        .select('*, user_profiles(*)')
        .single()

      if (error) throw error
      setComments([data, ...comments])
      setNewComment('')
      setStory(story ? { ...story, comments_count: story.comments_count + 1 } : null)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-12">{isAmharic ? 'ይጠብቁ...' : 'Loading...'}</div>
  }

  if (!story) {
    return <div className="text-center py-12">{isAmharic ? 'ታሪክ አልተገኘም' : 'Story not found'}</div>
  }

  const content = isAmharic ? story.content_am || story.content_en : story.content_en
  const title = isAmharic ? story.title_am : story.title_en

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 py-12">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase">
              {story.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-balance" dir={isAmharic ? 'rtl' : 'ltr'}>
            {title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-4 border-y border-slate-200 dark:border-slate-700">
            <div className="flex-1">
              <p className="font-semibold text-slate-900 dark:text-white">
                {story.user_profiles?.full_name}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                @{story.user_profiles?.username}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-6">
            <Button
              onClick={toggleLike}
              variant={isLiked ? 'default' : 'outline'}
              className={isLiked ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
            >
              <Heart className="w-4 h-4 mr-2" fill={isLiked ? 'currentColor' : 'none'} />
              {story.likes_count}
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              {story.comments_count}
            </Button>
            <Button onClick={toggleBookmark} variant={isBookmarked ? 'default' : 'outline'}>
              <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none mb-12">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg text-slate-900 dark:text-white whitespace-pre-wrap leading-relaxed" dir={isAmharic ? 'rtl' : 'ltr'}>
            {content}
          </div>
        </div>

        {/* Comments Section */}
        <section className="bg-white dark:bg-slate-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {isAmharic ? 'አስተያየት' : 'Comments'}
          </h2>

          {user ? (
            <form onSubmit={handleAddComment} className="mb-8">
              <Input
                placeholder={isAmharic ? 'አስተያየት ጻፍ...' : 'Add a comment...'}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {isAmharic ? 'ላኢ' : 'Post'}
              </Button>
            </form>
          ) : (
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {isAmharic ? 'አስተያየት ለላይ ግባ' : 'Sign in to comment'}
            </p>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {comment.user_profiles?.full_name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
