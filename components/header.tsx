import Link, { LinkProps } from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="py-4 mx-auto text-gray-800 dark:text-base-50 flex flex-col  md:flex-row justify-between items-start md:items-center gap-y-4 md:gap-y-0">
      <div className="flex flex-col justify-center">
        <Link href="/" className="transition-all group">
          <h1 className="-mb-1 font-bold text-lg ">Chris Jarling</h1>
          <small className="-mt-1 text-gray-400 opacity-0 group-hover:opacity-100 transition block">
            Go home
          </small>
        </Link>
      </div>
      <nav>
        <div className="gap-2 flex justify-center items-center transition-all">
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
      className="transition-all hover:bg-gray-100 dark:text-base-500 hover:dark:bg-base-800 hover:dark:text-base-200 px-4 py-1 rounded-full"
      {...rest}
    >
      {children}
    </Link>
  )
}
