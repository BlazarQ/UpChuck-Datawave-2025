"use client"

type SummaryCardsProps = {
  income: number
  expenses: number
  savings: number
  goal: number
}

export default function SummaryCards({ income, expenses, savings, goal }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Monthly Income</p>
        <p className="text-lg font-bold">₱{income.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Monthly Expenses</p>
        <p className="text-lg font-bold">₱{expenses.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Monthly Savings</p>
        <p className="text-lg font-bold">₱{savings.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Target Amount</p>
        <p className="text-lg font-bold">₱{goal.toLocaleString()}</p>
      </div>
    </div>
  )
}
