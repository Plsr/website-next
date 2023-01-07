import Link from 'next/link'
import { ReactNode } from 'react'
import { clsx } from 'clsx'

export default function MainNavLink({
  href,
  as,
  children,
  lastOfType = false,
}: props) {
  return (
    <Link
      href={href}
      as={as}
      className={clsx(
        'text-slate-800 py-2 px-4 rounded-xl font-medium  font-headline hover:text-blue-500 hover:bg-blue-50 transition ease-in-out duration-200',
        lastOfType ? 'mr-0' : 'mr-2 md:mr-8'
      )}
    >
      {children}
    </Link>
  )
}

type props = {
  href: string
  as?: string
  children: ReactNode
  lastOfType?: boolean
}
