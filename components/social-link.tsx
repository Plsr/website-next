import { ReactNode, type JSX } from 'react'

type SocialLinkProps = {
  children: ReactNode | ReactNode[]
} & JSX.IntrinsicElements['a']

export const SocialLink = ({ children, ...linkProps }: SocialLinkProps) => {
  return (
    <a {...linkProps}>
      <span className="hover:bg-rose-bud-50 hover:text-neutral-900 transition duration-400 border border-rose-bud-50 rounded py-2 px-4 text-sm text-indigo-bud-50">
        {children}
      </span>
    </a>
  )
}
