import Link from 'next/link'

import { SeriesEntry } from '../lib/post-series'

type PostSeriesBlockProps = {
  seriesEntries: SeriesEntry[]
  activeEntryId: string
}

export const PostSeriesBlock = ({
  seriesEntries,
  activeEntryId,
}: PostSeriesBlockProps) => {
  if (seriesEntries.length === 1) return null

  const entryIsCurrent = (entryId: string) => {
    return entryId === activeEntryId
  }

  return (
    <div className="bg-neutral-800 rounded p-6 inline-block mt-8">
      <h3 className="italic text-neutral-300 mb-4">
        This post is part of a series. Here are the other parts:
      </h3>
      <ul className="list-disc ml-8">
        {seriesEntries.map((entry) => (
          <li key={entry.title} className="mb-2 last:mb-0">
            {entryIsCurrent(entry.id) ? (
              <p className="text-neutral-400 font-bold">
                {entry.title}{' '}
                <span className="font-normal">(currently reading)</span>
              </p>
            ) : (
              <Link
                className="text-indigo-500 hover:underline"
                href={entry.url}
              >
                {entry.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
