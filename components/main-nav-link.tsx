import Link from 'next/link'
import { ReactNode } from 'react'

export default function MainNavLink({ href, children }: props) {
  return (
    <Link
      href={href}
      className="px-4 transition-colors ease-in-out duration-300 py-2 rounded dark:hover:text-teal-400 hover:bg-blue-100 hover:text-teal-500 dark:hover:bg-slate-700"
    >
      { children }
    </Link>
  )
}

type props = {
  href: string,
  children: ReactNode
}
