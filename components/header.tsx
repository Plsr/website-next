import Link, { LinkProps } from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="mx-auto flex flex-col items-center justify-between gap-y-4 py-4 text-base-800 dark:text-base-100 md:flex-row md:gap-y-0">
      <div className="flex flex-col justify-center">
        <Link href="/" className="group relative transition-all">
          <h1 className="-mb-1 text-lg font-bold">Chris Jarling</h1>
          <small className="absolute block select-none text-base-400 opacity-0 transition md:group-hover:opacity-100">
            Go home
          </small>
        </Link>
      </div>
      <nav>
        <div className="flex items-center justify-center gap-2 transition-all">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/posts">Posts</NavLink>
          <NavLink href="/digital-garden">Garden</NavLink>
        </div>
      </nav>
    </div>
  )
}

type NavLinkProps = {
  children: React.ReactNode
} & LinkProps

const NavLink = ({ children, ...rest }: NavLinkProps) => {
  return (
    <Link
      className="rounded-lg px-4 py-1 transition-all hover:bg-base-100 dark:text-base-200 dark:hover:bg-base-700 hover:dark:bg-base-700 hover:dark:text-base-100"
      {...rest}
    >
      {children}
    </Link>
  )
}
