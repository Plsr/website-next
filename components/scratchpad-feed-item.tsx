import Markdoc, { Node } from '@markdoc/markdoc'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'

import { MarkdocRenderer } from './markdoc-renderer'

type ScratchpadFeedItemProps = {
  slug: string
  timestamp: string
  content: () => Promise<{ node: Node }>
}

export async function ScratchpadFeedItem({
  slug,
  timestamp,
  content,
}: ScratchpadFeedItemProps) {
  const parsedTimestamp = parseISO(timestamp)
  const formattedDate = format(parsedTimestamp, "do LLL, yyyy 'at' HH:mm")

  const { node } = await content()
  const renderableContent = Markdoc.transform(node)

  return (
    <article className="mb-8">
      <Link
        href={`/scratchpad/${slug}`}
        className="text-sm text-base-600 dark:text-base-400 hover:text-accent-600 dark:hover:text-accent-400"
      >
        {formattedDate}
      </Link>
      <div className="mt-2 prose dark:prose-invert">
        <MarkdocRenderer renderableContent={renderableContent} />
      </div>
    </article>
  )
}
