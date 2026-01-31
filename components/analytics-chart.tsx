'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type ChartData = {
  date: string
  views: number
}

type AnalyticsChartProps = {
  data: ChartData[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4f4f4f" opacity={0.3} />
          <XAxis
            dataKey="date"
            stroke="#b0b0b0"
            tick={{ fill: '#b0b0b0' }}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }}
          />
          <YAxis stroke="#b0b0b0" tick={{ fill: '#b0b0b0' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#3d3d3d',
              border: '1px solid #5d5d5d',
              borderRadius: '4px',
              color: '#e7e7e7',
            }}
            labelStyle={{ color: '#e7e7e7' }}
            itemStyle={{ color: '#fcca4d' }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#fcca4d"
            strokeWidth={2}
            dot={{ fill: '#fcca4d', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
