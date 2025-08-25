"use client"

import { useState } from "react"

interface LoanDebt {
  type: string
  amount: string
  interestRate: string
  monthlyPayment: string
  monthsLeft: string
  isOpen: boolean
}

interface Props {
  onNext: (data: any) => void
  defaultValues?: Record<string, any>
  formId: string
}

export default function FinancialPositionForm({
  onNext,
  defaultValues,
  formId,
}: Props) {
  const [cash, setCash] = useState(defaultValues?.cash ?? "")
  const [hasInvestments, setHasInvestments] = useState(
    defaultValues?.hasInvestments ?? false
  )
  const [hasEmergencyFunds, setHasEmergencyFunds] = useState(
    defaultValues?.hasEmergencyFunds ?? false
  )
  const [emergencyAmount, setEmergencyAmount] = useState(
    defaultValues?.emergencyAmount ?? ""
  )

  const [loans, setLoans] = useState<LoanDebt[]>(defaultValues?.loans ?? [
    {
      type: "Personal Loan",
      amount: "",
      interestRate: "",
      monthlyPayment: "",
      monthsLeft: "",
      isOpen: true,
    },
  ])

  const handleLoanChange = (
    index: number,
    field: keyof LoanDebt,
    value: string | boolean
  ) => {
    const updatedLoans = [...loans]
    // @ts-ignore
    updatedLoans[index][field] = value
    setLoans(updatedLoans)
  }

  const addLoan = () => {
    setLoans([
      ...loans,
      {
        type: "Personal Loan",
        amount: "",
        interestRate: "",
        monthlyPayment: "",
        monthsLeft: "",
        isOpen: true,
      },
    ])
  }

  const toggleLoanOpen = (index: number) => {
    const updatedLoans = [...loans]
    updatedLoans[index].isOpen = !updatedLoans[index].isOpen
    setLoans(updatedLoans)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      cash,
      hasInvestments,
      hasEmergencyFunds,
      emergencyAmount,
      loans,
    })
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <header>
          <h2 className="text-2xl font-semibold">Financial Position</h2>
          <p className="text-gray-600 text-sm">
            A snapshot of your assets and liabilities.
          </p>
        </header>

        {/* Cash & Toggles */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Cash & savings</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="0"
            />
          </div>

          {/* Investments + Emergency Funds */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Investments</span>
              <input
                type="checkbox"
                checked={hasInvestments}
                onChange={(e) => setHasInvestments(e.target.checked)}
                className="h-5 w-5 accent-green-600"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Emergency funds</span>
              <input
                type="checkbox"
                checked={hasEmergencyFunds}
                onChange={(e) => setHasEmergencyFunds(e.target.checked)}
                className="h-5 w-5 accent-green-600"
              />
              {hasEmergencyFunds && (
                <input
                  type="number"
                  value={emergencyAmount}
                  onChange={(e) => setEmergencyAmount(e.target.value)}
                  className="w-32 rounded-lg border px-2 py-1 text-sm"
                  placeholder="Amount"
                />
              )}
            </div>
          </div>
        </div>

        {/* Loans & Debt */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Loans & Debt</h3>

          {loans.map((loan, index) => (
            <div
              key={index}
              className="mb-4 rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleLoanOpen(index)}
                className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 text-left font-medium hover:bg-gray-100"
              >
                {loan.type || "Loan/Debt"}
                <span className="text-lg font-bold">{loan.isOpen ? "−" : "+"}</span>
              </button>

              {/* Accordion Body */}
              {loan.isOpen && (
                <div className="p-5 space-y-5 bg-white">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Type of Loan/Debt
                    </label>
                    <select
                      value={loan.type}
                      onChange={(e) => handleLoanChange(index, "type", e.target.value)}
                      className="w-full rounded-lg border px-3 py-2"
                    >
                      <option>Personal Loan</option>
                      <option>Mortgage</option>
                      <option>Credit Card</option>
                      <option>Student Loan</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Amount Owed
                    </label>
                    <input
                      type="number"
                      value={loan.amount}
                      onChange={(e) => handleLoanChange(index, "amount", e.target.value)}
                      className="w-full rounded-lg border px-3 py-2"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      value={loan.interestRate}
                      onChange={(e) =>
                        handleLoanChange(index, "interestRate", e.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2"
                      placeholder="e.g. 5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Monthly Payment
                    </label>
                    <input
                      type="number"
                      value={loan.monthlyPayment}
                      onChange={(e) =>
                        handleLoanChange(index, "monthlyPayment", e.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2"
                      placeholder="e.g. 500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Months Left
                    </label>
                    <input
                      type="number"
                      value={loan.monthsLeft}
                      onChange={(e) =>
                        handleLoanChange(index, "monthsLeft", e.target.value)
                      }
                      className="w-full rounded-lg border px-3 py-2"
                      placeholder="e.g. 24"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addLoan}
            className="mt-3 w-full sm:w-auto px-5 py-2 rounded-lg bg-[#D5B527] text-white hover:bg-[#c4a620] transition"
          >
            + Add another loan/debt
          </button>
        </div>
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
