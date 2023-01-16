import Link from 'next/link'
import { useRouter } from 'next/router'
import { siteUrl } from '../lib/utill/site'
import { SeriesEntry } from '../lib/post-series'

type PostSeriesBlockProps = {
  seriesEntries: SeriesEntry[]
}

export const PostSeriesBlock = ({ seriesEntries }: PostSeriesBlockProps) => {
  const router = useRouter()

  if (seriesEntries.length === 1) return null

  const entryIsCurrent = (entryUrl: string) => {
    return entryUrl === `${siteUrl}${router.asPath}`
  }

  return (
    <div className="bg-blue-50 rounded p-6 inline-block mt-8">
      <h3 className="italic text-slate-500 mb-4">
        This post is part of a series. Here are the other parts:
      </h3>
      <ul className="list-disc ml-8">
        {seriesEntries.map((entry) => (
          <li key={entry.title} className="mb-2 last:mb-0">
            {entryIsCurrent(entry.url) ? (
              <p className="text-slate-600 font-bold">
                {entry.title}{' '}
                <span className="font-normal">(currently reading)</span>
              </p>
            ) : (
              <Link className="text-blue-500 hover:underline" href={entry.url}>
                {entry.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
