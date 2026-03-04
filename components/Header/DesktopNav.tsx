'use client'

import { NavLink } from './NavLink'

interface DesktopNavProps {
  navItems: { label: string; href: string }[]
}

export function DesktopNav({ navItems }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
