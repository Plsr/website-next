import Link from 'next/link'
import { ReactNode } from 'react'

export default function MainNavLink({ href, as, children }: props) {
  return (
    <Link
      href={href}
      as={as}
      className="text-slate-800 py-2 px-4 rounded-xl font-medium  font-headline hover:text-blue-500 hover:bg-blue-50 transition ease-in-out duration-200"
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
