import { AnalyticsChart } from 'components/analytics-chart'
import { TimeRangeSelector } from 'components/time-range-selector'
import { getAnalyticsOverview, getPageViewsOverTime } from 'data/events.dto'
import { formatDistanceToNow } from 'date-fns'

export const dynamic = 'force-dynamic'

type TimeRange = 7 | 30 | 90

interface PageProps {
  searchParams: Promise<{ days?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const daysParam = params.days
  const days = daysParam ? parseInt(daysParam, 10) : 30
  const selectedRange: TimeRange =
    days === 7 || days === 30 || days === 90 ? days : 30

  const { pageViews, totalCount } = await getAnalyticsOverview()
  const chartData = await getPageViewsOverTime(selectedRange)

  return (
    <div className="prose prose-invert">
      <h1>Analytics Page</h1>
      <p>Total Page Views: {totalCount}</p>

      <h2>Last 20 Page Views</h2>
      <ul>
        {pageViews.map((view) => (
          <li key={view.id}>
            {view.url}
            {view.os && <span className="ml-2 text-base-400">[{view.os}]</span>}
            {view.country && (
              <span className="ml-2 text-base-400">({view.country})</span>
            )}
            <span className="ml-2 text-base-500">
              {formatDistanceToNow(view.createdAt, { addSuffix: true })}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Pageviews Over Time</h2>
        <TimeRangeSelector selectedRange={selectedRange} />
        <div className="mt-4">
          <AnalyticsChart data={chartData} />
        </div>
      </div>
    </div>
  )
}
