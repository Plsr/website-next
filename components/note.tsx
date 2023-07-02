import { ArrowUturnRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { NotePost } from '../lib/entries'
import { BlogPostHeadline } from './blog-post-headline'
import { PostMetadata } from './post-metadata'
import { StyledArticleContent } from './styled-article-content'
import { Note as NoteType } from '.contentlayer/generated'
import { format } from 'date-fns'

type NoteProps = {
  note: NoteType
  asListItem?: boolean
}

export const Note = ({ note, asListItem = true }: NoteProps) => {
  const formattedNoteDate = format(new Date(note.date), 'do LLL, yyyy')

  if (!!note.link) {
    return (
      <LinkNote
        url={note.url}
        link={note.link}
        headline={note.headline}
        date={formattedNoteDate}
        content={note.body.html}
        showPermalink={asListItem}
      />
    )
  }

  if (!!note.headline) {
    return (
      <HeadlineNote
        url={note.url}
        headline={note.headline}
        date={formattedNoteDate}
        content={note.body.html}
        headlineLink={asListItem}
      />
    )
  }

  return (
    <InlineNote
      url={note.url}
      date={formattedNoteDate}
      content={note.body.html}
      showPermalink={asListItem}
    />
  )
}

type NoteBaseProps = {
  date: string
  url: string
  content: string
}

type LinkNoteProps = NoteBaseProps & {
  link: string
  headline?: string
  showPermalink: boolean
}

const LinkNote = ({
  link,
  headline,
  url,
  date,
  content,
  showPermalink,
}: LinkNoteProps) => {
  return (
    <>
      <a href={link} className="mb-4 block hover:text-blue-400 transition">
        <div className="flex flex-row items-center">
          <ArrowUturnRightIcon className="w-4 h-4 mr-2" />
          <BlogPostHeadline
            title={headline || link}
            large={false}
            className="border-b-2 border-b-blue-400 hover:text-blue-400 transition"
          />
        </div>
      </a>
      <StyledArticleContent contentHtml={content} />
      <NoteFooter url={url} date={date} showPermalink={showPermalink} />
    </>
  )
}

type HeadlineNoteProps = NoteBaseProps & {
  headline: string
  headlineLink: boolean
}
const HeadlineNote = ({
  url,
  date,
  headline,
  content,
  headlineLink,
}: HeadlineNoteProps) => {
  const headlineContent = () => (
    <div className={clsx('flex flex-col mb-8')}>
      <PostMetadata>{date}</PostMetadata>
      <BlogPostHeadline title={headline} large={false} />
    </div>
  )

  const headlineComponent = () =>
    headlineLink ? (
      <Link href={url}>{headlineContent()}</Link>
    ) : (
      headlineContent()
    )
  return (
    <>
      {headlineComponent()}
      <StyledArticleContent contentHtml={content} />
    </>
  )
}

type InlineNoteProps = NoteBaseProps & {
  showPermalink: boolean
}
const InlineNote = ({ date, url, content, showPermalink }: InlineNoteProps) => {
  return (
    <>
      <StyledArticleContent contentHtml={content} />
      <NoteFooter url={url} date={date} showPermalink={showPermalink} />
    </>
  )
}

type NoteFooterProps = {
  date: string
  url: string
  showPermalink: boolean
}
const NoteFooter = ({ date, url, showPermalink }: NoteFooterProps) => {
  return (
    <PostMetadata>
      <span>{date}</span>
      {showPermalink && (
        <>
          <span className="mx-2">-</span>
          <span>
            <Link href={url} className="hover:border-b-2 hover:border-blue-500">
              Permalink
            </Link>
          </span>
        </>
      )}
    </PostMetadata>
  )
}
