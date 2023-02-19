import { ArrowUturnRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { NotePost } from '../lib/entries'
import { BlogPostHeadline } from './blog-post-headline'
import { PostMetadata } from './post-metadata'
import { StyledArticleContent } from './styled-article-content'

type NoteProps = {
  note: NotePost
  asListItem?: boolean
}

export const Note = ({ note, asListItem = true }: NoteProps) => {
  if (!!note.link) {
    return (
      <LinkNote
        id={note.id}
        link={note.link}
        headline={note.headline}
        date={note.formattedDate}
        content={note.contentHtml}
        showPermalink={asListItem}
      />
    )
  }

  if (!!note.headline) {
    return (
      <HeadlineNote
        id={note.id}
        headline={note.headline}
        date={note.formattedDate}
        content={note.contentHtml}
        headlineLink={asListItem}
      />
    )
  }

  return (
    <InlineNote
      id={note.id}
      date={note.formattedDate}
      content={note.contentHtml}
      showPermalink={asListItem}
    />
  )
}

type NoteBaseProps = {
  date: string
  id: string
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
  id,
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
      <NoteFooter id={id} date={date} showPermalink={showPermalink} />
    </>
  )
}

type HeadlineNoteProps = NoteBaseProps & {
  headline: string
  headlineLink: boolean
}
const HeadlineNote = ({
  id,
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
      <Link href={`/note/${id}`}>{headlineContent()}</Link>
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
const InlineNote = ({ date, id, content, showPermalink }: InlineNoteProps) => {
  return (
    <>
      <StyledArticleContent contentHtml={content} />
      <NoteFooter id={id} date={date} showPermalink={showPermalink} />
    </>
  )
}

type NoteFooterProps = {
  date: string
  id: string
  showPermalink: boolean
}
const NoteFooter = ({ date, id, showPermalink }: NoteFooterProps) => {
  return (
    <PostMetadata>
      <span>{date}</span>
      {showPermalink && (
        <>
          <span>
            <Link
              href={`/note/${id}`}
              className="hover:border-b-2 hover:border-blue-500"
            >
              {' '}
              - Permalink
            </Link>
          </span>
        </>
      )}
    </PostMetadata>
  )
}
