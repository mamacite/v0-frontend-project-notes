# InkLink Frontend - Complete Project Guide

## 📋 Project Overview

**InkLink** is a digital publishing platform for Ethiopian writers and readers. It's a **Next.js-based web application** that enables writers to create, edit, publish, and monetize literary content while readers can discover and engage with stories.

### Key Mission
- Empower Ethiopian writers with a modern publishing platform
- Support Amharic and English languages
- Use AI tools to enhance writing and accessibility
- Enable monetization for authors
- Bridge traditional publishing and digital era

---

## 🏗️ System Architecture (3-Tier)

```
┌─────────────────────────────────────────────────┐
│   PRESENTATION TIER (CLIENT/FRONTEND)           │
│   - React/Next.js UI Components                 │
│   - Responsive Design (Mobile & Desktop)        │
│   - User Interfaces for All Roles               │
└─────────────────────────────────────────────────┘
                      ↓ (API Calls)
┌─────────────────────────────────────────────────┐
│   APPLICATION TIER (BACKEND/LOGIC)              │
│   - Node.js/Express API Server                  │
│   - Business Logic & Workflows                  │
│   - AI Integration (Gemini API)                 │
│   - Authentication & Authorization              │
└─────────────────────────────────────────────────┘
                      ↓ (Queries)
┌─────────────────────────────────────────────────┐
│   DATA TIER (DATABASE)                          │
│   - MongoDB NoSQL Database                      │
│   - Collections: Users, Stories, Reviews, etc.  │
│   - Secure Data Storage                         │
└─────────────────────────────────────────────────┘
```

---

## 👥 User Roles & Their Responsibilities

### 1. **Reader**
   - Browse and search for stories
   - Read stories (free & premium)
   - Rate, review, and like stories
   - Add stories to library/favorites
   - Direct messaging with authors
   - Listen to stories (Text-to-Speech)
   - Create account & manage profile

### 2. **Author/Writer**
   - Create and edit stories (with formatting tools)
   - Organize stories into chapters
   - Publish stories
   - Set premium/free pricing
   - Monitor views and ratings
   - Manage monetization (donations, premium access)
   - Use AI features (auto-summarization, content filtering)
   - Receive direct messages from readers
   - View earnings and analytics

### 3. **Super Admin**
   - Moderate all content (approve/reject stories)
   - Manage users (suspend, delete, ban)
   - Monitor payments and transactions
   - Manage platform guidelines
   - View system analytics
   - Control site settings

### 4. **Parent/Guardian** (Optional feature)
   - Monitor child's reading/writing activity
   - Set content restrictions
   - Manage kids' version access

---

## 🎯 Core Features to Build (Frontend)

### **Authentication & User Management**
- ✅ User Registration (with email verification)
- ✅ User Login with secure session
- ✅ Profile management (edit name, bio, avatar, language preference)
- ✅ Password reset functionality
- ✅ Role-based access control (Reader, Author, Admin)

### **For Readers**
- 📖 **Story Discovery**
  - Browse all published stories
  - Search stories (by title, author, genre, keywords)
  - Filter by language (Amharic/English)
  - Sort by trending, newest, most liked, highest rated
  
- 📖 **Reading Interface**
  - Display story content with chapters
  - Show story metadata (author, date published, rating)
  - Display story summary and cover image
  - Pagination for chapters
  
- ⭐ **Engagement Features**
  - Like/unlike stories
  - Write reviews and ratings
  - Add stories to library/favorites
  - Share stories with others
  
- 🎧 **Accessibility**
  - Text-to-Speech narration button
  - Adjust font size and reading preferences
  - Dark mode support
  
- 💬 **Communication**
  - Direct messaging with authors
  - Notification system for messages

### **For Authors**
- ✍️ **Writing Editor**
  - Rich text editor (formatting: bold, italic, underline, etc.)
  - Chapter management (add, edit, delete chapters)
  - Auto-save functionality
  - Word count display
  - Formatting toolbar
  
- 📤 **Publishing**
  - Publish story (set title, description, category, language)
  - Set story as free or premium (with pricing)
  - Upload cover image
  - Auto-generate summary using AI
  - Manual content review before publishing
  
- 📊 **Analytics & Monetization**
  - View story views, likes, reviews
  - Monitor earnings from premium access
  - See reader feedback and ratings
  - Manage monetization settings
  - View payment history
  
- 🛡️ **Content Protection**
  - AI-powered content filtering (auto-moderate)
  - Copyright protection info
  - Content moderation status

### **For Admins**
- 🔍 **Content Moderation Dashboard**
  - View pending stories for approval
  - Approve/reject stories with comments
  - Remove inappropriate content
  - View moderation history
  
- 👥 **User Management Panel**
  - View all users
  - Suspend/ban users
  - Delete user accounts
  - View user activity logs
  
- 💳 **Payment Management**
  - View all transactions
  - Monitor revenue
  - Handle payment issues
  
- ⚙️ **Settings & Guidelines**
  - Manage platform guidelines
  - Configure system settings
  - Manage language support

---

## 🤖 AI-Powered Features

### **Auto-Summarization**
- Generates summary when story is published
- Users can edit auto-generated summaries
- Powered by Gemini AI API

### **Content Moderation**
- Automatically screens content for inappropriate material
- Flags stories for admin review
- Supports both Amharic and English

### **Text-to-Speech (TTS)**
- Converts story text to audio
- Readers can listen while reading
- Supports multiple languages

### **Content Filtering**
- Protects young readers (kids version)
- Filters inappropriate content
- Shows content warnings if needed

---

## 📱 Key Frontend Pages & Components

### **Public Pages**
```
/ (Home)
  - Hero section with CTA
  - Featured/trending stories
  - Quick search bar
  - Browse categories
  
/stories
  - Story grid/list view
  - Advanced search & filters
  - Sorting options
  
/stories/:id
  - Full story reading page
  - Story details, author info
  - Reviews section
  - TTS player
  
/auth/register
  - User registration form
  - Email verification step
  
/auth/login
  - Login form
  - "Remember me" option
  - Password reset link
```

### **Reader Pages (Protected)**
```
/reader/library
  - Saved/liked stories
  - Reading history
  - Favorites
  
/reader/profile
  - Profile info
  - Edit profile
  - Reading preferences
  - Account settings
  
/reader/messages
  - Direct messages with authors
  - Message history
```

### **Author Pages (Protected)**
```
/author/dashboard
  - Overview of all stories
  - Quick stats (views, likes, earnings)
  
/author/stories
  - List of all author's stories
  - Add new story button
  
/author/editor/:id
  - Rich text editor for story
  - Chapter management
  - Save & preview
  - Publish workflow
  
/author/published/:id
  - View published story stats
  - Edit story details
  - Monitor engagement
  
/author/earnings
  - View earnings history
  - Payment details
  - Download reports
  
/author/settings
  - Monetization settings
  - Notification preferences
  - Language selection
```

### **Admin Pages (Protected)**
```
/admin/dashboard
  - System overview
  - Key metrics
  
/admin/moderation
  - Pending stories queue
  - Approve/reject interface
  - Moderation history
  
/admin/users
  - User list with search
  - User detail view
  - Suspend/ban actions
  
/admin/payments
  - Transaction history
  - Revenue reports
  
/admin/settings
  - Platform configuration
  - Guidelines management
```

---

## 🗄️ Database Collections (MongoDB)

### **Users Collection**
```
{
  _id: ObjectId
  email: string (unique)
  password: hashed_string
  firstName: string
  lastName: string
  avatar: url
  bio: string
  role: "reader" | "author" | "admin"
  language: "en" | "am" (Amharic)
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  isBanned: boolean
}
```

### **Stories Collection**
```
{
  _id: ObjectId
  title: string
  description: string
  content: string
  cover: url
  author: ObjectId (ref: Users)
  chapters: [{
    title: string
    content: string
    orderNumber: number
  }]
  category: string
  language: "en" | "am"
  isPremium: boolean
  price: number (if premium)
  summary: string (auto-generated by AI)
  status: "draft" | "pending" | "published" | "rejected"
  views: number
  createdAt: Date
  publishedAt: Date
}
```

### **Reviews Collection**
```
{
  _id: ObjectId
  storyId: ObjectId (ref: Stories)
  userId: ObjectId (ref: Users)
  rating: 1-5
  reviewText: string
  likes: number
  createdAt: Date
}
```

### **Likes Collection**
```
{
  _id: ObjectId
  storyId: ObjectId
  userId: ObjectId
  createdAt: Date
}
```

### **Messages Collection**
```
{
  _id: ObjectId
  senderId: ObjectId
  receiverId: ObjectId
  message: string
  isRead: boolean
  createdAt: Date
}
```

### **Payments Collection**
```
{
  _id: ObjectId
  userId: ObjectId
  storyId: ObjectId
  amount: number
  status: "pending" | "completed" | "failed"
  transactionId: string
  createdAt: Date
}
```

---

## 🔐 Authentication & Security

### **User Roles & Permissions**
- **Reader**: Can read stories, write reviews, save favorites
- **Author**: Can create/edit stories, publish, access analytics
- **Admin**: Full system access, moderation, user management
- **Role-Based Access Control (RBAC)**: Different routes protected by role

### **Security Features**
- Secure password hashing (bcrypt)
- JWT token-based authentication
- Session management
- HTTPS encryption
- Input validation & sanitization
- CORS protection
- Rate limiting on API endpoints

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 + React 19 + TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui components |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **AI** | Gemini API (summarization, content filtering, TTS) |
| **Authentication** | JWT + bcrypt |
| **Deployment** | Vercel (Frontend) + Render/Cloud (Backend) |
| **File Storage** | Cloud storage (AWS S3 or similar) |

---

## 📊 User Flow Examples

### **Reader Journey**
1. Register/Login → Browse Stories → Search/Filter → Read Story → Rate & Review → Save to Library → Message Author

### **Author Journey**
1. Register as Author → Dashboard → Create New Story → Write in Editor → AI Auto-Summary → Publish → Monitor Analytics → Manage Earnings

### **Admin Journey**
1. Login to Admin Panel → Moderation Queue → Review Pending Stories → Approve/Reject → View User Management → Handle Payments

---

## 🎨 Frontend Design Principles

- **Mobile-first responsive design**
- **Bilingual support (English & Amharic)**
- **Clean, intuitive interface**
- **Accessibility features (font size, dark mode, TTS)**
- **Fast loading times (optimized images, lazy loading)**
- **Consistent branding & typography**
- **Dark mode support**

---

## ⚡ Frontend Development Tips

### **Component Structure**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (home)
│   ├── (auth)/
│   ├── (reader)/
│   ├── (author)/
│   └── (admin)/
├── components/
│   ├── ui/ (shadcn components)
│   ├── shared/ (reusable across pages)
│   ├── reader/
│   ├── author/
│   └── admin/
├── hooks/ (custom React hooks)
├── lib/ (utilities, API calls)
├── types/ (TypeScript interfaces)
└── styles/ (global CSS)
```

### **Best Practices**
- Use **SWR or React Query** for data fetching
- Keep components **small and reusable**
- Use **TypeScript** for type safety
- Implement **error boundaries** for error handling
- Create **loading skeletons** for better UX
- Use **Image optimization** for covers and avatars
- Implement **pagination** for story lists

---

## 🚀 Next Steps for Frontend Development

1. **Set up project structure** (pages, components, hooks)
2. **Create authentication flow** (login, register, profile)
3. **Build story discovery pages** (home, browse, search)
4. **Build reading interface** (story page with chapters, TTS)
5. **Build author dashboard** (story management, editor)
6. **Build admin panel** (moderation, user management)
7. **Implement AI features UI** (summaries, TTS integration)
8. **Add notifications & messaging**
9. **Optimize for mobile** & accessibility
10. **Testing & deployment**

---

## 📝 Remember

- Focus on **user experience** - make it intuitive
- Support **bilingual interface** (Amharic/English switching)
- Ensure **accessibility** (WCAG compliance)
- Test on **mobile devices** early
- Keep **performance** in mind (optimize images, lazy load)
- Use **design tokens** for consistent styling
- Build **reusable components** to save time

Good luck building! 🎉
