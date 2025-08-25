"use client"

export default function SummaryCards() {
  // Hardcoded values
  const income = 45000
  const expenses = 10000
  const savings = 35000
  const goal = 3000000
  const months = 36
  const emergencyFund = 10000 // 👈 hardcoded

  const finalSavings = savings * months

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Emergency Fund</p>
        <p className="text-lg font-bold">₱{emergencyFund.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm">Final Savings (36 months)</p>
        <p className="text-lg font-bold">₱{finalSavings.toLocaleString()}</p>
      </div>
    </div>
  )
}
