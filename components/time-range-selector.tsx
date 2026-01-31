'use client'

type TimeRange = 7 | 30 | 90

interface TimeRangeSelectorProps {
  selectedRange: TimeRange
  onRangeChange: (range: TimeRange) => void
}

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
}: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = [7, 30, 90]

  return (
    <div className="flex gap-2" role="group" aria-label="Time range selection">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            selectedRange === range
              ? 'bg-accent-600 text-white hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600'
              : 'bg-base-200 text-base-900 hover:bg-base-300 dark:bg-base-800 dark:text-base-100 dark:hover:bg-base-700'
          }`}
          aria-pressed={selectedRange === range}
        >
          {range} days
        </button>
      ))}
    </div>
  )
}
