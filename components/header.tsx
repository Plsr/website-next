import Link, { LinkProps } from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="py-4 px-4 mx-auto w-full max-w-3xl text-base-800 dark:text-base-50 flex flex-col  md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-y-0">
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="dark:hover:text-accent-600 dark:text-base-300 transition-all"
        >
          <h1 className="-mb-1 font-bold">Chris Jarling</h1>
        </Link>
        <span className="text-base-500 font-light">Engineering Manager</span>
      </div>
      <nav>
        <div className="gap-2 flex justify-center items-center">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/now">Now</NavLink>
          {/* <NavLink href="/digital-garden">Garden</NavLink> */}
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
      className="transition-all dark:text-base-500 dark:hover:bg-base-800 dark:hover:text-base-200 px-4 py-2 rounded-full"
      {...rest}
    >
      {children}
    </Link>
  )
}
