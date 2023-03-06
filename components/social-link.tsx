import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

type SocialLinkProps = {
  children: ReactNode | ReactNode[]
} & LinkProps

export const SocialLink = ({ children, ...linkProps }: SocialLinkProps) => {
  return (
    <Link {...linkProps}>
      <div className="hover:border-neutral-400 transition group flex flex-row items-center border border-zinc-500 rounded-lg py-2 px-4 text-xs text-zinc-300">
        {children}
        <ArrowUpRightIcon className="transition group-hover:scale-110 w-3 h-3 ml-2" />
      </div>
    </Link>
  )
}