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
        'transition-all dark:text-base-500  px-4 py-2 rounded-full text-sm',
        hover && 'hover:dark:bg-base-800 hover:dark:text-base-200',
        !hover && 'dark:bg-base-800 dark:text-base-100 '
      )}
    >
      {children}
    </span>
  )
}

Tag.Pill = TagPill
