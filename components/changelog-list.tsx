'use client'

import {
  CalendarIcon,
  CodeBracketIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { format } from 'date-fns'
import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ReleasesResponseData } from '../lib/github'

type ChangelogListProps = {
  changelogEntries: ReleasesResponseData[]
}

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
}
export const ChangelogList = ({ changelogEntries }: ChangelogListProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <>
      <motion.ul
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={controls}
      >
        {changelogEntries.map((entry, index) => (
          <motion.li key={entry.id} variants={variants}>
            <ChangelogEntry entry={entry} latest={index === 0} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  )
}

type ChangelogEntryProps = {
  entry: ReleasesResponseData
  latest?: boolean
}

const ChangelogEntry = ({ entry, latest = false }: ChangelogEntryProps) => {
  return (
    <div className="bg-neutral-800 p-4 rounded-xl mb-8">
      <h3 className=" text-neutral-200 flex items-center mb-2">
        <div
          className={clsx(
            'font-semibold font-headline',
            latest && 'text-lg',
            !latest && 'text-sm'
          )}
        >
          {entry.name}
        </div>{' '}
        {latest && (
          <span className=" text-xs ml-2 px-2 py-1 pb-0.5 rounded-xl bg-rose-500 text-neutral-50">
            latest
          </span>
        )}
      </h3>
      <p className="text-sm text-neutral-300">{entry.body}</p>
      <div className="flex mt-4">
        <p className="text-xs text-neutral-400 mr-4 flex">
          <UserCircleIcon className="inline h-3 w-3 mr-1" />
          {entry.author.login}
        </p>
        <p className="text-xs text-neutral-400 mr-4 flex">
          <CalendarIcon className="inline h-3 w-3 mr-1" />
          {format(new Date(entry.created_at.toString()), 'do MMMM, yyyy')}
        </p>
        <p className="text-xs text-indigo-500 flex underline">
          <Link
            href={`https://github.com/Plsr/website-next/commit/${entry.target_commitish}`}
          >
            <CodeBracketIcon className="inline h-3 w-3 mr-1" />
            {entry.target_commitish.slice(0, 8)}
          </Link>
        </p>
      </div>
    </div>
  )
}
