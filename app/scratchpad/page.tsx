import { LoadMoreButton } from 'components/load-more-button'
import { ScratchpadFeedItem } from 'components/scratchpad-feed-item'
import { getPaginatedScratchpad } from 'data/scratchpad.dto'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scratchpad - Chris Jarling',
  description: 'Quick notes and thoughts',
}

type SearchParams = Promise<{
  page?: string
}>

export default async function ScratchpadPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const { entries, pagination } = await getPaginatedScratchpad(page)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Scratchpad</h1>

      {entries.length === 0 ? (
        <p className="text-base-600 dark:text-base-400">No entries yet.</p>
      ) : (
        <>
          <div className="space-y-8">
            {entries.map((entry) => (
              <ScratchpadFeedItem
                key={entry.slug}
                slug={entry.slug}
                timestamp={entry.entry.timestamp}
                content={entry.entry.content}
              />
            ))}
          </div>

          {pagination.hasNextPage && (
            <LoadMoreButton
              nextPage={pagination.currentPage + 1}
              basePath="/scratchpad"
            />
          )}
        </>
      )}
    </div>
  )
}
