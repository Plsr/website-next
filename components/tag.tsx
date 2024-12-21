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
        #{name} {timesUsed && <>({timesUsed}) </>}
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
        'rounded-full bg-base-200 px-4 py-2 text-sm transition-all dark:bg-base-800 dark:text-base-300',
        hover &&
          'hover:bg-base-300 hover:dark:bg-base-700 hover:dark:text-base-200'
      )}
    >
      {children}
    </span>
  )
}

Tag.Pill = TagPill
