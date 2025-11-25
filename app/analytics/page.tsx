import { getAnalyticsOverview } from 'data/events.dto'
import { formatDistanceToNow } from 'date-fns'

export const dynamic = 'force-dynamic'
export default async function Page() {
  const { pageViews, totalCount } = await getAnalyticsOverview()

  return (
    <div className="prose prose-invert">
      <h1>Analytics Page</h1>
      <p>Total Page Views: {totalCount}</p>

      <h2>Last 20 Page Views</h2>
      <ul>
        {pageViews.map((view) => (
          <li key={view.id}>
            {view.url} -{' '}
            {formatDistanceToNow(view.createdAt, { addSuffix: true })}
          </li>
        ))}
      </ul>
    </div>
  )
}
