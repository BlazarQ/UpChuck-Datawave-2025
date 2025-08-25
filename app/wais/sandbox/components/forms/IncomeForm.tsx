"use client"

import { useState } from "react"

interface Props {
  onSave: (data: any) => void
  defaultValues?: Record<string, any>
  formId: string
}

export default function IncomeForm({ onSave, defaultValues, formId }: Props) {
  const [income, setIncome] = useState(defaultValues?.income ?? "")
  const [otherIncome, setOtherIncome] = useState(defaultValues?.otherIncome ?? "")
  const [paySchedule, setPaySchedule] = useState(defaultValues?.paySchedule ?? "monthly")
  const [employerType, setEmployerType] = useState(defaultValues?.employerType ?? "private")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ income, otherIncome, paySchedule, employerType })
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="flex flex-col h-full"
    >
      {/* Content */}
      <div className="flex-1 space-y-6 p-4 overflow-y-auto">
        <header>
          <h3 className="text-xl font-semibold">Income Information</h3>
          <p className="text-gray-600 text-sm">
            Tell us about your salary and other sources of income.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Monthly gross income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. 45,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Other income (optional)
            </label>
            <input
              type="number"
              value={otherIncome}
              onChange={(e) => setOtherIncome(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. 5,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pay schedule</label>
            <select
              value={paySchedule}
              onChange={(e) => setPaySchedule(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="monthly">Monthly</option>
              <option value="semi-monthly">Semi-monthly</option>
              <option value="weekly">Weekly</option>
              <option value="irregular">Irregular</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employer type</label>
            <select
              value={employerType}
              onChange={(e) => setEmployerType(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="private">Private</option>
              <option value="government">Government</option>
              <option value="self-employed">Self-employed</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Action */}
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
