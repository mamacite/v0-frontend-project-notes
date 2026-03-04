# InkLink Navigation System v2 - Architecture Guide

## Overview
V2 features a completely refactored, component-driven architecture with improved maintainability, performance, and user experience.

---

## What's New in V2

### 1. **Theme System**
- **Location:** `context/ThemeContext.tsx`
- **Features:**
  - Light/Dark/System theme support
  - Persisted to localStorage
  - Smooth transitions between themes
  - Dropdown menu selector in header

### 2. **Improved Header Structure**
The header is now broken into modular subcomponents for better organization:

```
components/Header.tsx (Main orchestrator)
├── Header/Logo.tsx (Logo with hover effects)
├── Header/DesktopNav.tsx (Desktop navigation menu)
├── Header/NavLink.tsx (Individual nav link with active state)
├── Header/AuthButtons.tsx (Login/Signup buttons)
├── Header/MobileMenu.tsx (Mobile drawer menu)
├── Header/LanguageSwitcher.tsx (Language dropdown)
└── Header/ThemeSwitcher.tsx (Theme dropdown)
```

### 3. **Enhanced Language Context**
- `isAmharic` property for easier RTL checks
- Automatic HTML lang/dir attributes update
- Expanded translations with theme labels
- Better TypeScript typing

### 4. **Mobile Drawer Menu**
- Full-screen overlay menu (replaces inline menu)
- Smooth slide-in/out animations
- Prevents body scroll when open
- Better touch targets and spacing
- Organized with section headers

### 5. **Dropdowns for Settings**
- Language switcher as dropdown (not button toggle)
- Theme switcher with 3 options (Light/Dark/System)
- Better discoverability and UX

### 6. **Improved Accessibility**
- ARIA labels on all interactive elements
- Screen reader text for icon buttons
- Semantic HTML structure
- Keyboard navigation support

### 7. **Visual Enhancements**
- Backdrop blur effect on header
- Smooth transitions and animations
- Better hover states on all buttons
- Active nav link highlighting
- Logo gradient effect on hover
- Better shadow and border styling

---

## File Structure

```
project/
├── context/
│   ├── LanguageContext.tsx (Enhanced v2)
│   └── ThemeContext.tsx (NEW in v2)
├── components/
│   ├── Header.tsx (Refactored main component)
│   └── Header/
│       ├── Logo.tsx (NEW - Logo component)
│       ├── DesktopNav.tsx (NEW - Desktop navigation)
│       ├── NavLink.tsx (NEW - Individual nav link)
│       ├── AuthButtons.tsx (NEW - Auth button group)
│       ├── MobileMenu.tsx (NEW - Mobile drawer)
│       ├── LanguageSwitcher.tsx (NEW - Dropdown)
│       └── ThemeSwitcher.tsx (NEW - Dropdown)
└── app/
    ├── layout.tsx (Updated with ThemeProvider)
    ├── page.tsx (Home page)
    ├── globals.css (Enhanced colors)
    ├── explore/page.tsx
    ├── my-stories/page.tsx
    ├── bookmarks/page.tsx
    ├── login/page.tsx
    └── signup/page.tsx
```

---

## Component Documentation

### Header.tsx (Main Orchestrator)
Combines all header subcomponents into a single, organized header. Acts as the container and coordinator.

**Props:** None (uses context)

**Key Features:**
- Sticky positioning with backdrop blur
- Responsive layout
- Automatic nav item configuration

### Logo.tsx
Displays the InkLink logo with hover effects.

**Props:** None (uses context for `t()`)

**Features:**
- Gradient text animation on hover
- Icon with gradient background
- Smooth transitions

### DesktopNav.tsx
Shows navigation menu on desktop screens only.

**Props:**
```typescript
navItems: Array<{ label: string; href: string }>
```

**Features:**
- Hidden on mobile (md: breakpoint)
- Active link highlighting
- Smooth hover states

### NavLink.tsx
Individual navigation link component with active state detection.

**Props:**
```typescript
href: string
children: ReactNode
onClick?: () => void
isActive?: boolean (auto-detects from pathname if not provided)
className?: string
```

**Features:**
- Auto active state detection using `usePathname()`
- Manual override possible
- Consistent styling with transitions

### AuthButtons.tsx
Login and Signup buttons for desktop screens.

**Props:**
```typescript
authItems: Array<{ label: string; href: string; variant?: 'default' | 'outline' }>
```

**Features:**
- Hidden on mobile (sm: breakpoint)
- Support for different button variants
- Shadow and hover effects on primary button

### MobileMenu.tsx
Full-screen drawer menu for mobile devices.

**Props:**
```typescript
navItems: Array<{ label: string; href: string }>
authItems: Array<{ label: string; href: string; variant?: 'default' | 'outline' }>
```

**Features:**
- Overlay backdrop with click-to-close
- Smooth slide animation
- Prevents body scroll when open
- Section headers for organization
- Auto-closes on nav item click
- Hidden on md: breakpoint and above

### LanguageSwitcher.tsx
Dropdown menu for language selection.

**Props:** None (uses context)

**Features:**
- Globe icon button
- Dropdown with flagged options
- Current language highlighted
- Smooth transitions

### ThemeSwitcher.tsx
Dropdown menu for theme selection (Light/Dark/System).

**Props:** None (uses context)

**Features:**
- Sun/Moon icon that animates
- Dropdown with 3 theme options
- Current theme highlighted
- Icon rotates based on theme

---

## Context Providers

### LanguageContext.tsx (Enhanced v2)
```typescript
{
  language: 'en' | 'am',
  setLanguage: (lang: Language) => void,
  t: (key: string) => string,
  isAmharic: boolean // NEW in v2
}
```

**New in V2:**
- `isAmharic` property for easier conditional logic
- Updates HTML `lang` and `dir` attributes
- Better TypeScript types

### ThemeContext.tsx (NEW in v2)
```typescript
{
  theme: 'light' | 'dark' | 'system',
  setTheme: (theme: Theme) => void,
  isDark: boolean
}
```

**Features:**
- Persists to localStorage
- Respects system preference if "system" selected
- Manages HTML class for dark mode

---

## Responsive Breakpoints

Using Tailwind CSS breakpoints:

| Size | Breakpoint | Changes |
|------|-----------|---------|
| Mobile | < 640px | Hamburger menu visible, desktop nav hidden |
| Tablet | 640px - 768px | Mix of both |
| Desktop | 768px+ | Full header with all components |

### Key Visibility Rules:
- **Logo Text:** Hidden on mobile, visible sm: and up
- **Desktop Nav:** Hidden on mobile, visible md: and up
- **Auth Buttons:** Hidden on mobile, visible sm: and up
- **Mobile Menu:** Visible on mobile, hidden md: and up
- **Theme/Language Switchers:** Always visible (compact icons)

---

## Translations (LanguageContext)

### English Translations
```
nav.home: 'Home'
nav.explore: 'Explore'
nav.my-stories: 'My Stories'
nav.bookmarks: 'Bookmarks'
nav.profile: 'Profile'
nav.admin: 'Admin'
nav.login: 'Login'
nav.signup: 'Sign Up'
nav.logout: 'Logout'
nav.search: 'Search stories...'
nav.notifications: 'Notifications'
nav.write: 'Write Story'
app.title: 'InkLink'
app.tagline: 'Where stories come to life'
theme.light: 'Light'
theme.dark: 'Dark'
theme.system: 'System'
```

### Amharic Translations
```
nav.home: 'ቤት'
nav.explore: 'ስሄድ'
nav.my-stories: 'የኔ ታሪክ'
nav.bookmarks: 'ምልክቶች'
nav.profile: 'ገለባ'
nav.admin: 'አስተዳዳሪ'
nav.login: 'ግባ'
nav.signup: 'ተመዝገብ'
nav.logout: 'ውጣ'
nav.search: 'ታሪክ ፈልግ...'
nav.notifications: 'ማስታወቂያ'
nav.write: 'ታሪክ ጻፍ'
app.title: 'InkLink'
app.tagline: 'ታሪክ አሌ'
theme.light: 'ብርሃን'
theme.dark: '암'
theme.system: 'ስርዓት'
```

---

## Usage Examples

### Using Language in Components
```typescript
'use client'
import { useLanguage } from '@/context/LanguageContext'

export function MyComponent() {
  const { t, language, isAmharic } = useLanguage()
  
  return (
    <div dir={isAmharic ? 'rtl' : 'ltr'}>
      <h1>{t('nav.home')}</h1>
    </div>
  )
}
```

### Using Theme in Components
```typescript
'use client'
import { useTheme } from '@/context/ThemeContext'

export function MyComponent() {
  const { theme, isDark, setTheme } = useTheme()
  
  return (
    <div>
      {isDark ? <DarkIcon /> : <LightIcon />}
    </div>
  )
}
```

---

## Styling System

### Color Scheme (Modern Blue)
**Light Mode:**
- Primary: Blue (#0076cc / hsl(217 100% 50%))
- Secondary: Light Blue (#3b99ff / hsl(217 91% 60%))
- Background: White
- Foreground: Dark Gray (0 0% 3.9%)

**Dark Mode:**
- Primary: Blue (#0076cc)
- Secondary: Light Blue (#3b99ff)
- Background: Very Dark Slate (#0f172a)
- Foreground: Light Gray (98%)

### Key Classes
- `text-blue-600 dark:text-blue-400` - Primary text
- `bg-blue-600 dark:bg-blue-700` - Primary button
- `hover:bg-slate-100 dark:hover:bg-slate-800` - Hover states
- `border-slate-200 dark:border-slate-800` - Borders
- `text-slate-600 dark:text-slate-400` - Secondary text

---

## Performance Optimizations

### In V2:
1. **Component Splitting:** Each subcomponent is isolated for easier memoization
2. **Context Optimization:** Separate Language and Theme contexts prevent unnecessary re-renders
3. **CSS Optimization:** Backdrop blur and transitions use hardware acceleration
4. **Mobile Menu:** Only renders when open, uses event delegation
5. **Lazy Loading:** Icon imports are tree-shakeable

---

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Dark mode support: CSS media queries + manual override
- RTL languages: Full support with `dir` attribute

---

## Adding New Pages

To add a new page and navigation item:

1. **Create the page:**
   ```typescript
   // app/new-page/page.tsx
   export default function NewPage() {
     return <h1>New Page</h1>
   }
   ```

2. **Add translation:**
   ```typescript
   // context/LanguageContext.tsx
   'nav.new-page': 'New Page',
   'nav.new-page': 'ስሪት ገጽ',
   ```

3. **Update navigation array in Header.tsx:**
   ```typescript
   const navItems = [
     // ... existing items
     { label: t('nav.new-page'), href: '/new-page' },
   ]
   ```

---

## Extending the System

### Adding a New Dropdown
```typescript
// components/Header/NewDropdown.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { YourIcon } from 'lucide-react'

export function NewDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg">
          <YourIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Items here */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

Then add it to `Header.tsx`:
```typescript
import { NewDropdown } from './Header/NewDropdown'

export function Header() {
  return (
    <header>
      {/* ... existing components ... */}
      <NewDropdown />
    </header>
  )
}
```

---

## Troubleshooting

### Language not persisting?
- Check localStorage in DevTools (Application tab)
- Ensure LanguageProvider wraps your app in layout.tsx
- Check browser privacy settings aren't blocking localStorage

### Theme not applying?
- Verify ThemeProvider is before LanguageProvider in layout.tsx
- Check HTML element has/doesn't have 'dark' class
- Clear browser cache and localStorage

### Mobile menu not closing?
- Ensure MobileMenu onClick handlers call `setIsOpen(false)`
- Check for event bubbling issues on parent divs
- Verify overlay backdrop onClick is functional

---

## Future Enhancements

Potential features to add:
- [ ] Search functionality with dropdown
- [ ] Notifications badge with dropdown
- [ ] User profile menu dropdown
- [ ] Keyboard shortcuts (Cmd+K for search)
- [ ] Animations using Framer Motion
- [ ] A/B testing for header layouts
- [ ] Analytics tracking for user interactions
- [ ] Progressive Web App (PWA) support

