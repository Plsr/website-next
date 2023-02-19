import {
  ArrowRightIcon,
  ArrowSmallRightIcon,
  ArrowUturnRightIcon,
  ChevronDoubleRightIcon,
  LinkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { BlogPostHeadline } from './blog-post-headline'
import { PostMetadata } from './post-metadata'

type NoteHeadlineProps = {
  id: string
  date: string
  link?: string
  headline?: string
}

export const NoteHeadline = ({
  id,
  date,
  headline,
  link,
}: NoteHeadlineProps) => {
  if (headline && !link) {
    return (
      <Link href={`/note/${id}`}>
        <div className={clsx('flex flex-col mb-8')}>
          <PostMetadata>{date}</PostMetadata>
          <BlogPostHeadline title={headline} large={false} />
        </div>
      </Link>
    )
  }

  if (link) {
    return (
      <a href={link}>
        <div className="flex flex-row items-center">
          <ArrowUturnRightIcon className="w-4 h-4 mr-2" />
          <BlogPostHeadline title={headline || link} large={false} />
        </div>
      </a>
    )
  }

  return null
}
