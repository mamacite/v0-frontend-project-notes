-- InkLink Database Schema
-- Complete schema for the bilingual story platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'reader' CHECK (role IN ('reader', 'author', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  is_banned BOOLEAN DEFAULT FALSE,
  preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'am')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- STORIES TABLE
CREATE TABLE IF NOT EXISTS stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_am TEXT NOT NULL,
  description_en TEXT,
  description_am TEXT,
  content_en TEXT NOT NULL,
  content_am TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  cover_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_mature BOOLEAN DEFAULT FALSE,
  word_count INTEGER DEFAULT 0,
  read_time_minutes INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  bookmarks_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMP
);

-- STORY CHAPTERS TABLE (for multi-chapter stories)
CREATE TABLE IF NOT EXISTS story_chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title_en TEXT NOT NULL,
  title_am TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_am TEXT,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(story_id, chapter_number)
);

-- LIKES TABLE
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, story_id)
);

-- BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, story_id)
);

-- COMMENTS TABLE
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COMMENT LIKES TABLE
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, comment_id)
);

-- READING HISTORY TABLE
CREATE TABLE IF NOT EXISTS reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress_percentage INTEGER DEFAULT 0,
  UNIQUE(user_id, story_id)
);

-- STORY SUMMARIES TABLE (AI generated summaries)
CREATE TABLE IF NOT EXISTS story_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  summary_en TEXT NOT NULL,
  summary_am TEXT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(story_id)
);

-- MODERATION LOGS TABLE
CREATE TABLE IF NOT EXISTS moderation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id),
  story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('approved', 'rejected', 'flagged', 'banned_user', 'deleted_story')),
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AUTHOR EARNINGS TABLE
CREATE TABLE IF NOT EXISTS author_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL,
  total_reads INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(author_id, month_year)
);

-- AUTHOR FOLLOWERS TABLE
CREATE TABLE IF NOT EXISTS author_followers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, author_id)
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'follow', 'system')),
  related_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  story_id UUID REFERENCES stories(id) ON DELETE SET NULL,
  message_en TEXT NOT NULL,
  message_am TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_stories_author_id ON stories(author_id);
CREATE INDEX idx_stories_status ON stories(status);
CREATE INDEX idx_stories_category ON stories(category);
CREATE INDEX idx_stories_created_at ON stories(created_at);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_story_id ON likes(story_id);
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_story_id ON bookmarks(story_id);
CREATE INDEX idx_comments_story_id ON comments(story_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_reading_history_user_id ON reading_history(user_id);
CREATE INDEX idx_author_followers_author_id ON author_followers(author_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read public profile data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for stories table
CREATE POLICY "Anyone can view published stories" ON stories
  FOR SELECT USING (status = 'published' OR author_id = auth.uid()::text::uuid);

CREATE POLICY "Authors can update their own stories" ON stories
  FOR UPDATE USING (author_id = auth.uid()::text::uuid);

-- RLS Policies for comments table
CREATE POLICY "Anyone can read approved comments" ON comments
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT WITH CHECK (user_id = auth.uid()::text::uuid);

-- RLS Policies for bookmarks table
CREATE POLICY "Users can manage their own bookmarks" ON bookmarks
  FOR ALL USING (user_id = auth.uid()::text::uuid);

-- RLS Policies for likes table
CREATE POLICY "Users can manage their own likes" ON likes
  FOR ALL USING (user_id = auth.uid()::text::uuid);

-- RLS Policies for reading_history table
CREATE POLICY "Users can manage their own reading history" ON reading_history
  FOR ALL USING (user_id = auth.uid()::text::uuid);
