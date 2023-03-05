import Link from 'next/link'
import { ReactNode } from 'react'

type ParagraphProps = {
  children: ReactNode | ReactNode[]
}

export const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="text-neutral-400 font-light mb-2">{children}</p>
}

type LinkProps = {
  href: string
  children: ReactNode | ReactNode[]
}

const ParagraphLink = ({ href, children }: LinkProps) => {
  return (
    <Link href={href} className="underline text-blue-500">
      {children}
    </Link>
  )
}

Paragraph.Link = ParagraphLink
