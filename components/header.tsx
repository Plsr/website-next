'use client'

import Link, { LinkProps } from 'next/link'

export default function Header() {
  return (
    <div className="py-4 px-4 mx-auto w-full max-w-[760px] text-base-50 flex flex-col md:flex-row justify-between items-center">
      <div className="flex flex-col justify-center">
        <Link
          href="/"
          className="hover:text-accent-600 text-base-300 transition-all font-bold"
        >
          Chris Jarling
        </Link>
      </div>
      <nav>
        <div className="gap-2 flex justify-center items-center">
          <NavLink href="/posts">Archive</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/now">Now</NavLink>
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
      className="transition-all text-base-500 hover:text-base-200 hover:underline px-4 py-2"
      {...rest}
    >
      {children}
    </Link>
  )
}
