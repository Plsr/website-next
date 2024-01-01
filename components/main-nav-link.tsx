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
        'text-base-400 font-medium font-title hover:text-accent-500',
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
