# InkLink V2 - Quick Start Guide

## What's Different from V1?

V2 is a complete architectural upgrade with better organization, animations, and user experience.

| Feature | V1 | V2 |
|---------|----|----|
| **Header Structure** | Monolithic component | Modular subcomponents |
| **Theme Support** | ❌ | ✅ Light/Dark/System |
| **Mobile Menu** | Inline dropdown | Full-screen drawer |
| **Language Switcher** | Simple button toggle | Dropdown with flags |
| **Accessibility** | Basic | Enhanced with ARIA |
| **Animations** | Minimal | Smooth transitions |
| **TypeScript** | Basic types | Better types |
| **Code Organization** | Single file | 7 organized files |

---

## V2 Component Tree

```
Header.tsx (Main)
├── Logo.tsx
├── DesktopNav.tsx (md+)
├── AuthButtons.tsx (sm+)
├── LanguageSwitcher.tsx
├── ThemeSwitcher.tsx
└── MobileMenu.tsx (<md)
    ├── MobileNav
    └── MobileAuth
```

---

## Key Files to Know

### Contexts (State Management)
| File | Purpose | Provider |
|------|---------|----------|
| `context/LanguageContext.tsx` | Language switching (EN/AM) | `<LanguageProvider>` |
| `context/ThemeContext.tsx` | Theme management (Light/Dark/System) | `<ThemeProvider>` |

### Header Components
| File | Purpose | Export |
|------|---------|--------|
| `components/Header.tsx` | Main orchestrator | `<Header />` |
| `components/Header/Logo.tsx` | InkLink logo | `<Logo />` |
| `components/Header/DesktopNav.tsx` | Desktop navigation | `<DesktopNav />` |
| `components/Header/NavLink.tsx` | Single nav link | `<NavLink />` |
| `components/Header/AuthButtons.tsx` | Login/Signup buttons | `<AuthButtons />` |
| `components/Header/MobileMenu.tsx` | Mobile drawer | `<MobileMenu />` |
| `components/Header/LanguageSwitcher.tsx` | Language dropdown | `<LanguageSwitcher />` |
| `components/Header/ThemeSwitcher.tsx` | Theme dropdown | `<ThemeSwitcher />` |

### App Structure
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers |
| `app/page.tsx` | Home page (hero + features) |
| `app/explore/page.tsx` | Story explorer (placeholder) |
| `app/my-stories/page.tsx` | Author dashboard (placeholder) |
| `app/bookmarks/page.tsx` | Saved stories (placeholder) |
| `app/login/page.tsx` | Login form (placeholder) |
| `app/signup/page.tsx` | Sign up form (placeholder) |

---

## Using Hooks in Components

### Language Hook
```typescript
'use client'
import { useLanguage } from '@/context/LanguageContext'

export function MyComponent() {
  const { language, setLanguage, t, isAmharic } = useLanguage()
  
  return (
    <div dir={isAmharic ? 'rtl' : 'ltr'}>
      <h1>{t('nav.home')}</h1>
      <button onClick={() => setLanguage('am')}>Amharic</button>
    </div>
  )
}
```

### Theme Hook
```typescript
'use client'
import { useTheme } from '@/context/ThemeContext'

export function MyComponent() {
  const { theme, isDark, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

---

## Understanding the Layout

```
layout.tsx (Root)
├── <ThemeProvider>          ← Theme context wraps everything
│   └── <LanguageProvider>   ← Language context
│       ├── <Header />       ← Sticky navigation
│       └── <main>           ← Page content
└── </html>
```

**Important:** ThemeProvider must wrap LanguageProvider for proper dark mode support!

---

## Mobile Responsive Design

### Breakpoints Used

| Breakpoint | Size | What Shows |
|------------|------|-----------|
| Mobile | < 640px | Logo (no text), Mobile Menu, Theme+Lang dropdowns |
| Tablet | 640px - 768px | Logo text, Auth buttons visible |
| Desktop | 768px+ | Full Header with Desktop Nav |

### Key Classes

```typescript
// Hide on mobile, show on desktop
className="hidden md:flex"

// Show only on mobile
className="md:hidden"

// Show on tablet and up
className="hidden sm:inline"

// Show only on mobile
className="sm:hidden"
```

---

## How Translations Work

All translations are stored in `context/LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    // ...
  },
  am: {
    'nav.home': 'ቤት',
    'nav.explore': 'ስሄድ',
    // ...
  }
}
```

Use `t()` hook to get translations:
```typescript
const { t } = useLanguage()
<h1>{t('nav.home')}</h1>  // Shows "Home" or "ቤት"
```

### Adding a New Translation

1. Open `context/LanguageContext.tsx`
2. Find the `translations` object
3. Add to both `en` and `am`:
   ```typescript
   'nav.my-new-item': 'My New Item',  // English
   'nav.my-new-item': 'የኔ አዲስ ንጥል',  // Amharic
   ```
4. Use in your component:
   ```typescript
   <h1>{t('nav.my-new-item')}</h1>
   ```

---

## How Dark Mode Works

The theme system uses:
1. **localStorage** - Persists user preference
2. **System preference** - Falls back to OS setting if "system" selected
3. **HTML class** - Adds/removes "dark" class on `<html>`
4. **CSS variables** - Tailwind uses CSS custom properties

### How to Style for Dark Mode

```typescript
// Tailwind dark mode class
className="bg-white dark:bg-slate-950"
className="text-slate-900 dark:text-white"

// Or use design tokens
className="bg-background text-foreground"
```

The `dark:` prefix automatically applies when the "dark" class is on `<html>`.

---

## Active Link Detection

NavLink automatically detects if it's the current page:

```typescript
// In components/Header/NavLink.tsx
const pathname = usePathname()
const active = isActive !== undefined ? isActive : pathname === href
```

Example:
- On `/explore` page: NavLink to `/explore` will be highlighted
- On other pages: NavLink to `/explore` will be normal

To override:
```typescript
<NavLink href="/custom" isActive={true}>
  Always Active
</NavLink>
```

---

## Color Scheme (Modern Blue)

### Primary Colors
- **Blue-600:** `hsl(217 100% 50%)` - Primary buttons, brand color
- **Blue-700:** `hsl(217 91% 60%)` - Hover state
- **Blue-400:** `hsl(217 91% 60%)` - Dark mode brand

### Neutral Colors
- **Slate-50:** Light background
- **Slate-900:** Dark text
- **Slate-950:** Dark background
- **Slate-200/800:** Borders

### Semantic Colors
- **Green:** Success
- **Red:** Destructive/Error
- **Amber:** Warning
- **Blue:** Primary/Info

---

## Building a New Page

### Step 1: Create Page File
```typescript
// app/my-page/page.tsx
'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function MyPage() {
  const { t } = useLanguage()
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1>{t('nav.my-page')}</h1>
    </div>
  )
}
```

### Step 2: Add Translation
```typescript
// context/LanguageContext.tsx
translations: {
  en: {
    'nav.my-page': 'My Page',
  },
  am: {
    'nav.my-page': 'የኔ ገጽ',
  }
}
```

### Step 3: Add to Navigation
```typescript
// components/Header.tsx
const navItems = [
  // ... existing items
  { label: t('nav.my-page'), href: '/my-page' },
]
```

---

## Tips & Best Practices

### 1. Always Use 'use client' for Context
```typescript
'use client'  // ← Must be at top
import { useLanguage } from '@/context/LanguageContext'
```

### 2. Get Language Props Correctly
```typescript
// ✅ Good
const { language, isAmharic, t } = useLanguage()

// ❌ Bad - Destructure everything and use what you need
```

### 3. Apply RTL Direction
```typescript
// For Amharic content
<div dir={isAmharic ? 'rtl' : 'ltr'}>
  Content here
</div>
```

### 4. Use Semantic Classes
```typescript
// ✅ Good
className="text-slate-600 dark:text-slate-400"

// ❌ Bad
className="text-#4b5563"
```

### 5. Mobile-First Approach
```typescript
// ✅ Good - start with mobile, enhance for desktop
className="flex flex-col md:flex-row"

// ❌ Bad - hiding on desktop
className="hidden md:flex flex-row"
```

---

## Debugging

### Language not changing?
1. Check language dropdown in header
2. Open DevTools → Application → localStorage
3. Look for `language` key
4. Clear and try again

### Theme not applying?
1. Check DevTools → Elements → `<html>` element
2. Look for `class="dark"` attribute
3. DevTools → Application → localStorage
4. Look for `theme` key

### Active link not highlighting?
1. Check page URL in address bar
2. Verify href in Header.tsx matches the route
3. Use browser DevTools to inspect NavLink element

---

## Common Issues & Fixes

### "useLanguage must be used within LanguageProvider"
**Problem:** Using language hook outside provider
**Solution:** Wrap component in `LanguageProvider` or move to child component

### "document is not defined"
**Problem:** Server component using client code
**Solution:** Add `'use client'` at top of file

### Mobile menu not closing
**Problem:** Click handler not firing
**Solution:** Verify event propagation isn't blocked, check z-index stacking

### Dark mode not working
**Problem:** ThemeProvider not in layout
**Solution:** Ensure layout.tsx has both `<ThemeProvider>` and `<LanguageProvider>`

---

## What to Build Next

Now that the navigation is solid, you can build:

1. **Login/Signup Pages** - User authentication forms
2. **Story Explorer** - Feed/grid to browse stories
3. **Story Reader** - Display story with AI summaries
4. **Author Dashboard** - CRUD for stories
5. **Admin Panel** - Moderation and analytics

Pick one and let's continue! 🚀

