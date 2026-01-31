# Analytics Charts Feature Spec

## Overview

Add time-series visualization to the analytics page to understand pageview trends over time.

## Goal

Answer the question: "How many total pageviews did I get on a given day and what are the trends over time?"

## In Scope (MVP)

### UI Components

- **Line chart** showing total pageviews per day
- **Time range selector** with three fixed options:
  - Last 7 days
  - Last 30 days
  - Last 90 days
- Chart displays below existing analytics page content

### Data Layer

- New repository method to aggregate pageviews by day for a given date range
- New DTO function to fetch aggregated data
- Return format: array of `{ date: string, views: number }`

### Technical

- Use **Recharts** for visualization
- Server-side data aggregation (SQL GROUP BY)
- Static rendering with `force-dynamic` (same as current page)

## Explicitly Out of Scope

These are intentionally deferred to future iterations:

- Custom date range picker (only fixed 7/30/90 day ranges)
- Multiple chart types (bar, pie, etc.)
- Additional metrics (unique visitors, bounce rate, etc.)
- Chart interactivity beyond basic tooltips
- Data export functionality
- Bot filtering improvements
- Country name display improvements
- Error handling improvements in existing code
- Real-time updates
- Comparison views (this period vs last period)
- Filtering by page/country/OS
- Mobile optimization beyond responsive layout

## Implementation Overview

### Database Query

```sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as views
FROM events
WHERE created_at >= NOW() - INTERVAL 'X days'
GROUP BY DATE(created_at)
ORDER BY date ASC
```

### New Files

- `components/analytics-chart.tsx` - Client component with Recharts line chart
- Update `data/events.repo.ts` - Add `getPageViewsByDay(days: number)` method
- Update `data/events.dto.ts` - Add `getPageViewsOverTime(days: number)` function
- Update `app/analytics/page.tsx` - Add chart component and time range selector

### Component Structure

```
<div>
  <TimeRangeSelector /> // Client component with 7/30/90 day buttons
  <AnalyticsChart data={chartData} /> // Client component with Recharts
</div>
```

## Success Criteria

- Can see daily pageview counts as a line chart
- Can switch between 7, 30, and 90 day views
- Chart loads within 2 seconds for 90 days of data
- Responsive layout (works on mobile)

## Future Considerations

(Not building now, but keeping in mind for later)

- More time ranges (6 months, 1 year, all time)
- Breakdown by top pages
- Geographic visualization
- Device/OS breakdowns
