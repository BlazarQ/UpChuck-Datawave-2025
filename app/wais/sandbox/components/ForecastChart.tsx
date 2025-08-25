"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type ForecastChartProps = {
  data: any[]
  months: number
  viewMode: "months" | "years"
}

export default function ForecastChart({ data, months, viewMode }: ForecastChartProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Financial Forecast</h2>
      <p className="text-sm mb-4">
        {viewMode === "months"
          ? `${months}-month projection`
          : `${months / 12}-year projection`}{" "}
        based on your current financial inputs
      </p>

      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="savings" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#ff7300" strokeWidth={2} />
            <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
