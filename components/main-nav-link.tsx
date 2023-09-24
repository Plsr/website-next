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
        'text-zinc-200 p-2 text-sm font-medium font-title hover:text-rose-500 hover:underline hover:underline-offset-4',
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
