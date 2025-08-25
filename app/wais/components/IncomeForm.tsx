"use client"

import { useState } from "react"

interface Props {
  onNext: (data: any) => void
  onBack: () => void
  defaultValues?: Record<string, any>
  formId: string
}

export default function IncomeForm({
  onNext,
  defaultValues,
  formId,
}: Props) {
  const [income, setIncome] = useState(defaultValues?.income ?? "")
  const [otherIncome, setOtherIncome] = useState(
    defaultValues?.otherIncome ?? ""
  )
  const [paySchedule, setPaySchedule] = useState(
    defaultValues?.paySchedule ?? ""
  )
  const [employerType, setEmployerType] = useState(
    defaultValues?.employerType ?? ""
  )
  const [expenses, setExpenses] = useState(defaultValues?.expenses ?? "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ income, otherIncome, paySchedule, employerType, expenses })
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">Income & Expenses</h2>
        <p className="text-gray-600">
          Tell us about your salary, other income sources, and monthly expenses.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Monthly gross income
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 45000"
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
            placeholder="e.g. 5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pay schedule</label>
          <select
            value={paySchedule}
            onChange={(e) => setPaySchedule(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 ${
              paySchedule === "" ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="">Choose an option</option>
            <option value="monthly">Monthly</option>
            <option value="semi-monthly">Semi-monthly</option>
            <option value="weekly">Weekly</option>
            <option value="irregular">Irregular</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Employer type
          </label>
          <select
            value={employerType}
            onChange={(e) => setEmployerType(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 ${
              employerType === "" ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="">Choose an option</option>
            <option value="private">Private</option>
            <option value="government">Government</option>
            <option value="self-employed">Self-employed</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>

        {/* 👇 New Monthly Expenses field */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Monthly expenses
          </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 20000"
          />
        </div>
      </div>
    </form>
  )
}
