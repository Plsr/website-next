import Markdoc from '@markdoc/markdoc'
import { ReadingNote } from 'data/articles.dto'
import { format } from 'date-fns'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  article: ReadingNote
}

export const ArticleFeedItem = async ({ article }: Props) => {
  const { node } = await article.entry.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    return null
  }
  const renderable = Markdoc.transform(node)

  return (
    <article className="mb-16">
      <a
        href={article.entry.link}
        className="group flex items-center gap-2 mb-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkIcon className="w-4 h-4 text-base-500 group-hover:text-accent-500 transition-colors shrink-0" />
        <h2 className="text-2xl font-title text-base-200 group-hover:text-accent-500 transition-colors">
          {article.entry.title}
        </h2>
      </a>

      <time className="text-sm text-base-600 block mb-4">
        {format(new Date(article.entry.createdAt), 'do LLL, yyyy')}
      </time>

      <div className="prose prose-invert prose-img:rounded-lg mb-4">
        {Markdoc.renderers.react(renderable, React)}
      </div>

      <Link
        href={`/library/articles/${article.slug.toLowerCase()}`}
        className="text-sm text-base-600 hover:text-accent-500 transition-colors"
      >
        Permalink
      </Link>
    </article>
  )
}
