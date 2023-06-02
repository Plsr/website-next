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
    <span
      className={clsx(
        'bg-zinc-700 p-2 rounded-lg text-sm mr-4',
        hover && 'hover:bg-pink-500'
      )}
    >
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
