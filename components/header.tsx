import Link, { LinkProps } from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="py-4 px-4 mx-auto max-w-2xl text-base-800 dark:text-base-50 flex justify-between items-center">
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="dark:hover:text-accent-600 dark:text-base-300 transition-all"
        >
          <h1 className="-mb-1 font-bold">Chris Jarling</h1>
        </Link>
        <span className="text-base-500 font-light">Fullstack Engineer</span>
      </div>
      <nav>
        <div className="gap-2 flex justify-center items-center">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/now">Now</NavLink>
          <NavLink href="/digital-garden">Wiki</NavLink>
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
      className="transition-all dark:text-base-500 hover:dark:bg-base-800 hover:dark:text-base-200 px-4 py-2 rounded-full"
      {...rest}
    >
      {children}
    </Link>
  )
}
