import Link from 'next/link'
import { ReactNode } from 'react'

export default function MainNavLink({ href, as, children }: props) {
  return (
    <Link
      href={href}
      as={as}
      className="px-4 transition-colors ease-in-out duration-300 py-2 rounded hover:text-yellow-200 hover:bg-slate-700"
    >
      {children}
    </Link>
  )
}

type props = {
  href: string
  as?: string
  children: ReactNode
}
