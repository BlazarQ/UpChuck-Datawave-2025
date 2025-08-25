"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// Hardcoded projection: 36 months, savings grows by 35k/month
const HARD_CODED_DATA = Array.from({ length: 36 }, (_, i) => ({
  period: `Month ${i + 1}`,
  savings: 35000 * (i + 1),
  target: 3000000, // flat target line
}))

export default function ForecastChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Financial Forecast</h2>
      <p className="text-sm mb-4">
        36-month projection based on ₱45k monthly income, ₱10k expenses, and a ₱3M target
      </p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <LineChart data={HARD_CODED_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="savings"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
              name="Savings"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#ff0000"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target ₱3M"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
