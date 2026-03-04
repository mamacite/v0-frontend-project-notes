'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: ReactNode
  onClick?: () => void
  isActive?: boolean
  className?: string
}

export function NavLink({ href, children, onClick, isActive, className }: NavLinkProps) {
  const pathname = usePathname()
  const active = isActive !== undefined ? isActive : pathname === href

  return (
    <Link href={href} onClick={onClick}>
      <span
        className={cn(
          'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
          'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400',
          active && 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
          className
        )}
      >
        {children}
      </span>
    </Link>
  )
}
