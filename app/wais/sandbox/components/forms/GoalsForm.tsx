"use client"

import { useState } from "react"

interface Props {
  onNext: (data: any) => void
  defaultValues?: Record<string, any>
  formId: string
}

export default function GoalsForm({ onNext, defaultValues, formId }: Props) {
  const [goals, setGoals] = useState<string[]>(defaultValues?.goals ?? [])
  const [risk, setRisk] = useState(defaultValues?.risk ?? "")
  const [horizonValue, setHorizonValue] = useState(defaultValues?.horizonValue ?? "")
  const [horizonUnit, setHorizonUnit] = useState<"months" | "years">(
    defaultValues?.horizonUnit ?? "months"
  )
  const [target, setTarget] = useState(defaultValues?.target ?? "")

  const toggleGoal = (value: string) =>
    setGoals((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const horizonInMonths =
      horizonUnit === "years" ? Number(horizonValue) * 12 : Number(horizonValue)

    onNext({ goals, risk, horizon: horizonInMonths, target })
  }

  const getConversionText = () => {
    if (!horizonValue || isNaN(Number(horizonValue))) return ""
    const num = Number(horizonValue)
    if (horizonUnit === "months") {
      const years = (num / 12).toFixed(1).replace(/\.0$/, "")
      return `${num} months ≈ ${years} years`
    } else {
      const months = num * 12
      return `${num} years = ${months} months`
    }
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Header */}
        <header>
          <h2 className="text-lg font-semibold">Your Goals</h2>
          <p className="text-gray-600 text-sm">
            Help us tailor recommendations to what matters most.
          </p>
        </header>

        {/* Goals */}
        <section className="space-y-2">
          <h3 className="text-sm font-medium">Select your goals</h3>
          <div className="grid gap-2">
            {[
              ["grow-wealth", "Grow wealth"],
              ["retirement", "Retirement planning"],
              ["education", "Education fund"],
              ["major-purchase", "Major purchase"],
            ].map(([val, label]) => (
              <label
                key={val}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={goals.includes(val)}
                  onChange={() => toggleGoal(val)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Risk */}
        <section>
          <label className="block text-sm font-medium mb-1">Risk tolerance</label>
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 ${
              risk === "" ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="">Choose an option</option>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </select>
        </section>

        {/* Horizon */}
        <section>
          <label className="block text-sm font-medium mb-1">Time horizon</label>
          {/* Input */}
          <input
            type="number"
            min={horizonUnit === "months" ? 3 : 1}
            value={horizonValue}
            onChange={(e) => setHorizonValue(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 h-10"
            placeholder={horizonUnit === "months" ? "e.g. 36" : "e.g. 3"}
          />

          {/* Full-width Toggle */}
          <div className="flex mt-2 rounded-lg border overflow-hidden">
            <button
              type="button"
              onClick={() => setHorizonUnit("months")}
              className={`flex-1 py-2 text-sm ${
                horizonUnit === "months"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Months
            </button>
            <button
              type="button"
              onClick={() => setHorizonUnit("years")}
              className={`flex-1 py-2 text-sm ${
                horizonUnit === "years"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Years
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">Minimum 3 months</p>
          {horizonValue && (
            <p className="text-xs text-gray-600 mt-1 italic">{getConversionText()}</p>
          )}
        </section>

        {/* Target */}
        <section>
          <label className="block text-sm font-medium mb-1">Target amount (₱)</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 200000"
          />
        </section>
      </div>

      {/* Sticky Save Button */}
      <div className="border-t bg-white px-4 py-3 flex justify-end sticky bottom-0">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Save
        </button>
      </div>
    </form>
  )
}
