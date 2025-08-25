"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"

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
  onBack: () => void
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
  const [considerEmergency, setConsiderEmergency] = useState(
    defaultValues?.considerEmergency ?? false
  )

  const [loans, setLoans] = useState<LoanDebt[]>(
    defaultValues?.loans ?? [
      {
        type: "Personal Loan",
        amount: "",
        interestRate: "",
        monthlyPayment: "",
        monthsLeft: "",
        isOpen: true,
      },
    ]
  )

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

    const assets = Number(cash) + (hasInvestments ? 1 : 0) // you can replace 1 with actual investment value later
    const liabilities = loans.reduce(
      (sum, loan) => sum + Number(loan.amount || 0),
      0
    )
    const savings = hasEmergencyFunds ? Number(emergencyAmount) : 0

    onNext({
      cash,
      hasInvestments,
      hasEmergencyFunds,
      emergencyAmount,
      considerEmergency,
      loans,
    })
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6 p-2">
      <header>
        <h2 className="text-2xl font-semibold">Financial position</h2>
        <p className="text-gray-600">
          A snapshot of your assets and liabilities.
        </p>
      </header>

      {/* Cash & Toggles */}
      <div className="grid grid-cols-1 gap-4">
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

        {/* Toggles Row */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Investments */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Do you have investments?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasInvestments}
                onChange={(e) => setHasInvestments(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          {/* Emergency Funds */}
          <div className="flex items-center gap-3 relative">
            <span className="text-sm font-medium">Do you have emergency funds?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasEmergencyFunds}
                onChange={(e) => setHasEmergencyFunds(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>

            {/* Amount input (inline, not pushing layout) */}
            {hasEmergencyFunds && (
              <input
                type="number"
                value={emergencyAmount}
                onChange={(e) => setEmergencyAmount(e.target.value)}
                className="w-28 rounded-lg border px-2 py-1 text-sm"
                placeholder="Amount"
              />
            )}

            {/* Suggestion inline area */}
            {hasEmergencyFunds && (
              <div className="flex items-center gap-2 ml-4">
                <span className="text-sm">Consider involving/starting one?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={considerEmergency}
                    onChange={(e) => setConsiderEmergency(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>

                {/* Hover Question Mark */}
<div className="relative group">
  <HelpCircle className="w-5 h-5 text-gray-400 cursor-pointer" />
  <div className="absolute top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-white text-gray-700 text-xs rounded-md px-3 py-2 shadow-lg border border-gray-300 w-48 text-center">
    It’s best not to disregard emergency funds. They provide a crucial safety net for unexpected events.
  </div>
</div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loans & Debt */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Loans & Debt</h3>

        <div className="max-h-[50vh] overflow-y-auto pr-2">
          {loans.map((loan, index) => (
            <div
              key={index}
              className="mb-4 border rounded-lg overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleLoanOpen(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 text-left font-medium"
              >
                {loan.type || "Loan/Debt"}{" "}
                <span>{loan.isOpen ? "−" : "+"}</span>
              </button>

              {/* Accordion Body */}
              {loan.isOpen && (
                <div className="p-4 space-y-4 bg-white">
                  {/* Row 1: Type + Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Type of Loan/Debt
                      </label>
                      <select
                        value={loan.type}
                        onChange={(e) =>
                          handleLoanChange(index, "type", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleLoanChange(index, "amount", e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Row 2: Interest Rate + Monthly Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  </div>

                  {/* Row 3: Months Left */}
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
            className="mt-2 px-4 py-2 rounded-lg border bg-[#D5B527] text-white"
          >
            + Add another loan/debt 
          </button>
        </div>
      </div>
    </form>
  )
}
