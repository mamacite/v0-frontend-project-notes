# InkLink Frontend - Quick Start Guide

## Project Status
✅ MVP Complete - All core reader and author features are built and ready to use.

## How to Run

```bash
# Install dependencies (auto-installed)
pnpm install

# Development server
pnpm dev

# Open in browser
http://localhost:3000
```

## Key Features Now Available

### For Readers
- Browse and search all published stories
- View story details with comments
- Like and bookmark stories
- Read stories in English or Amharic
- Switch between light and dark modes

### For Authors
- Create and edit stories in bilingual format
- Manage story library (view, edit, delete)
- Publish stories publicly
- Track story metrics (views, likes, comments)

### General
- Secure authentication with Supabase
- Fully bilingual interface (English/Amharic)
- Dark mode support
- Mobile-responsive design
- Professional UI with modern aesthetics

## Page Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Home page with intro | No |
| `/login` | User login | No |
| `/signup` | User registration | No |
| `/explore` | Browse stories | No |
| `/bookmarks` | View bookmarks | Yes |
| `/my-stories` | Author's stories | Yes |
| `/story/[id]` | Read story | No |
| `/story/new` | Write new story | Yes |

## Testing the App

### Sign Up Test Flow
1. Go to `/signup`
2. Fill in: Email, Password, Full Name, Username, Role
3. Click "Sign Up"
4. You'll be redirected to login page
5. Login with your credentials

### Reader Test Flow
1. Go to `/explore`
2. Search for or browse stories
3. Click on a story to read
4. Like, bookmark, and comment (after login)

### Author Test Flow
1. Login with author account
2. Go to `/my-stories`
3. Click "Write Story"
4. Fill in bilingual content and publish
5. View published story

## Code Organization

### Key Files to Know
- `lib/auth.ts` - All authentication functions
- `context/LanguageContext.tsx` - Language switching
- `context/ThemeContext.tsx` - Dark mode system
- `app/layout.tsx` - Root layout with providers

### Adding New Pages
1. Create folder in `/app/page-name`
2. Add `page.tsx` file
3. Update `Header.tsx` navigation if needed
4. Use `useLanguage()` hook for translations

### Modifying Database
1. Update schema in `/scripts/`
2. Create new migration file
3. Execute with SystemAction
4. Update type definitions as needed

## Important Notes

### Database Access
- All database queries use Supabase client from `lib/auth.ts`
- RLS (Row Level Security) can be configured in Supabase console
- Tables are already created - don't recreate them

### Authentication
- Uses Supabase built-in auth
- Passwords are securely hashed by Supabase
- Session management is automatic
- User profiles stored in `user_profiles` table

### Bilingual Support
- Use `useLanguage()` hook to get current language
- Access `t()` function for translations
- RTL layout automatically applied for Amharic
- Add translations to context file as needed

### Styling
- Tailwind CSS with custom design tokens
- Dark mode uses `dark:` prefix
- Mobile-first responsive design
- Color variables in `globals.css`

## Troubleshooting

### "User not found" error
- User profile wasn't created during signup
- Check `user_profiles` table in Supabase
- Verify auth.users exists in Supabase

### Bilingual text not showing
- Check `LanguageContext.tsx` has translation key
- Verify `isAmharic` flag is being used correctly
- Add `dir="rtl"` to containers for Amharic text

### Styles not applying
- Check component has `className` (not `class`)
- Verify Tailwind classes are spelled correctly
- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild with `pnpm dev`

### Database errors
- Check Supabase project is active
- Verify environment variables are set
- Ensure tables exist in database
- Check RLS policies if queries fail

## Next Steps for Enhancement

1. **Add API Routes** - Create `/api` folder with route handlers
2. **Implement Admin Panel** - Moderate content and manage users
3. **AI Integration** - Add story summarization with Gemini
4. **Profile Pages** - Show author profiles with followers
5. **Analytics** - Track story views and user engagement
6. **Notifications** - Real-time alerts for interactions

## Deployment

Ready to deploy to Vercel:
1. Push code to GitHub
2. Connect GitHub to Vercel project
3. Set environment variables in Vercel Settings
4. Deploy with one click

## Support

For issues or questions:
1. Check `FRONTEND_BUILD_COMPLETE.md` for full documentation
2. Review Supabase docs: https://supabase.com/docs
3. Check shadcn/ui components: https://ui.shadcn.com
4. Next.js documentation: https://nextjs.org/docs

---

**You're all set!** The frontend is ready to go. Start testing and building on top of this solid foundation.
