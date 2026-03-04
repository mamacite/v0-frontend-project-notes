'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AuthButtonsProps {
  authItems: { label: string; href: string; variant?: 'default' | 'outline' }[]
}

export function AuthButtons({ authItems }: AuthButtonsProps) {
  return (
    <div className="hidden sm:flex items-center gap-2">
      {authItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={item.variant || 'outline'}
            className={`${
              item.variant === 'default' ? 'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
            }`}
            size="sm"
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
