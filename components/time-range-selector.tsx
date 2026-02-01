import Link from 'next/link'

type TimeRange = 7 | 30 | 90

interface TimeRangeSelectorProps {
  selectedRange: TimeRange
}

export function TimeRangeSelector({ selectedRange }: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = [7, 30, 90]

  return (
    <div
      className="not-prose flex gap-2"
      role="group"
      aria-label="Time range selection"
    >
      {ranges.map((range) => (
        <Link
          key={range}
          href={`?days=${range}`}
          scroll={false}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors no-underline ${
            selectedRange === range
              ? 'bg-base-400 !text-white hover:bg-base-300 hover:!text-white hover:!no-underline'
              : 'bg-base-900 !text-white hover:bg-base-800 hover:!text-white hover:!no-underline'
          }`}
          aria-current={selectedRange === range ? 'true' : undefined}
        >
          {range} days
        </Link>
      ))}
    </div>
  )
}
