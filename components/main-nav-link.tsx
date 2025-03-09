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
        'text-base-300 px-3 transition-all py-2 rounded-lg font-medium font-title hover:bg-base-800',
        lastOfType ? 'mr-0' : 'mr-2 md:mr-8',
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
