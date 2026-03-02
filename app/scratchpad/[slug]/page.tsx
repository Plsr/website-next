import { MarkdocRenderer } from 'components/markdoc-renderer'
import { getScratchpadEntry } from 'data/scratchpad.dto'
import { getLogger } from 'lib/logger'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = {
  params: Promise<{
    slug: string
  }>
}

const log = getLogger()
export const generateStaticParams = () => []

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params
  const entryData = await getScratchpadEntry(slug)

  if (!entryData) {
    log.error(`Scratchpad entry not found for slug: ${slug}`)
    return {}
  }

  const { formattedDate } = entryData
  const title = `Scratchpad - ${formattedDate}`

  return {
    title,
    description: 'A scratchpad note',
    openGraph: {
      title,
      description: 'A scratchpad note',
      images: [
        {
          url: 'https://www.chrisjarling.com/og.jpg',
          secureUrl: 'https://www.chrisjarling.com/og.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function ScratchpadEntry(props: Params) {
  const { slug } = await props.params
  const entryData = await getScratchpadEntry(slug)

  if (!entryData) {
    notFound()
  }

  const { formattedDate, renderableContent } = entryData

  return (
    <div className="mx-auto max-w-xl mb-16">
      <div className="mb-8">
        <Link
          href="/scratchpad"
          className="text-sm text-base-600 dark:text-base-400 hover:text-accent-600 dark:hover:text-accent-400"
        >
          ← Back to scratchpad
        </Link>
        <p className="mt-4 text-sm text-base-600 dark:text-base-400">
          {formattedDate}
        </p>
      </div>
      <MarkdocRenderer renderableContent={renderableContent} />
    </div>
  )
}
