import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

type TagProps = {
  name: string
  timesUsed?: number
}

export const Tag = ({ name, timesUsed }: TagProps) => {
  return (
    <Link href={`/tags/${name}`}>
      <TagPill>
        #{name} {timesUsed && <TimesUsed count={timesUsed} />}
      </TagPill>
    </Link>
  )
}

type TagPillProps = {
  children: ReactNode | ReactNode[]
  hover?: boolean
}

const TagPill = ({ children, hover = true }: TagPillProps) => {
  return (
    <span className="bg-accent-500/40 px-3 py-1 rounded-full text-xs text-accent-200">
      {children}
    </span>
  )
}

type TimesUsedProps = {
  count: number
}

const TimesUsed = ({ count }: TimesUsedProps) => {
  return <>({count})</>
}

Tag.Pill = TagPill
