'use client'

import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ViewTransition } from 'react'

export default function Header() {
  const pathname = usePathname()
  const isRootPage = pathname === '/'

  return (
    <aside className="w-full px-4 py-4 md:w-56 md:shrink-0 md:px-8 md:py-8">
      <div className="flex flex-row items-center justify-between gap-4 md:sticky md:top-8 md:flex-col md:items-start md:justify-start">
        {!isRootPage && (
          <div className="flex flex-col justify-center">
            <Link
              href="/"
              className="hover:text-accent-600 text-base-300 transition-all"
            >
              <h1 className="-mb-1 font-bold hidden">Chris Jarling</h1>
              <ViewTransition name="avatar">
                <Image
                  src="/dithered.png"
                  alt="Chris Jarling"
                  width={48}
                  height={48}
                  className="rounded-lg border border-base-900 w-12 h-12 grayscale-50 hover:grayscale-0 transition-all"
                />
              </ViewTransition>
            </Link>
          </div>
        )}
        <nav aria-label="Main navigation">
          <div className="flex items-center gap-2 md:flex-col md:items-start">
            <NavLink href="/about" pathname={pathname}>
              About
            </NavLink>
            <NavLink href="/now" pathname={pathname}>
              Now
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  )
}

type NavLinkProps = {
  children: React.ReactNode
  pathname: string
} & LinkProps

const NavLink = ({ children, pathname, ...rest }: NavLinkProps) => {
  const isActive = pathname === rest.href

  return (
    <Link
      className={`font-title transition-all px-4 py-2 rounded-full md:w-full ${
        isActive
          ? 'bg-base-800 text-base-100'
          : 'text-base-500 hover:bg-base-800 hover:text-base-200'
      }`}
      {...rest}
    >
      {children}
    </Link>
  )
}
