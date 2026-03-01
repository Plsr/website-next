'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ViewTransition } from 'react'

export default function Header() {
  const pathname = usePathname()
  const isRootPage = pathname === '/'

  return (
    <header className="w-full py-4 text-base-800 dark:text-base-50 md:sticky md:top-0 md:h-screen md:w-52 md:py-12">
      <div className="flex flex-row items-center justify-between gap-4 md:flex-col md:items-start md:justify-start md:gap-8">
        {!isRootPage && (
          <Link
            href="/"
            className="text-base-300 transition-all hover:text-accent-600"
          >
            <h1 className="sr-only">Chris Jarling</h1>
            <ViewTransition name="avatar">
              <Image
                src="/dithered.png"
                alt="Chris Jarling"
                width={48}
                height={48}
                className="h-12 w-12 rounded-lg border border-base-900 grayscale-50 transition-all hover:grayscale-0"
              />
            </ViewTransition>
          </Link>
        )}
        <nav className="ml-auto md:ml-0 md:w-full">
          <div className="flex items-center justify-center gap-2 md:w-full md:flex-col md:items-stretch">
            <NavLink href="/about" active={pathname === '/about'}>
              About
            </NavLink>
            <NavLink href="/now" active={pathname === '/now'}>
              Now
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}

type NavLinkProps = {
  children: React.ReactNode
  active?: boolean
} & LinkProps

const NavLink = ({ children, active = false, ...rest }: NavLinkProps) => {
  return (
    <Link
      className={clsx(
        'font-title rounded-full px-4 py-2 text-base-500 transition-all hover:bg-base-800 hover:text-base-200 md:w-full md:rounded-lg md:text-left',
        active && 'bg-base-900 text-base-100',
      )}
      {...rest}
    >
      {children}
    </Link>
  )
}
