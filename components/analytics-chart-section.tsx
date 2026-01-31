'use client'

import { useEffect, useState } from 'react'

import { getLogger } from 'lib/logger'

import { AnalyticsChart } from './analytics-chart'
import { TimeRangeSelector } from './time-range-selector'

const log = getLogger()

type ChartData = {
  date: string
  views: number
}

type TimeRange = 7 | 30 | 90

interface AnalyticsChartSectionProps {
  initialData: ChartData[]
  initialRange: TimeRange
}

export function AnalyticsChartSection({
  initialData,
  initialRange,
}: AnalyticsChartSectionProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange)
  const [chartData, setChartData] = useState<ChartData[]>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/analytics/pageviews?days=${selectedRange}`,
        )
        const data = await response.json()
        setChartData(data)
      } catch (error) {
        log.error('Error fetching chart data:', String(error))
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedRange !== initialRange) {
      fetchData()
    }
  }, [selectedRange, initialRange])

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Pageviews Over Time</h2>
      <TimeRangeSelector
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
      />
      <div className="mt-4">
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-base-500">Loading...</p>
          </div>
        ) : (
          <AnalyticsChart data={chartData} />
        )}
      </div>
    </div>
  )
}
