"use client"

import { useState, useEffect } from "react"
import { HelpCircle } from "lucide-react"

interface Props {
  onNext: (data: any) => void
  formId: string
  defaultValues?: {
    age?: number | null
    employment?: string
    dependents?: number | null
  }
}

export default function ClientProfileForm({ onNext, formId, defaultValues }: Props) {
  const [age, setAge] = useState("")
  const [employment, setEmployment] = useState("")
  const [dependents, setDependents] = useState("")

  // load defaults when coming back
  useEffect(() => {
    if (defaultValues) {
      setAge(defaultValues.age?.toString() ?? "")
      setEmployment(defaultValues.employment ?? "")
      setDependents(defaultValues.dependents?.toString() ?? "")
    }
  }, [defaultValues])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({
      age: age ? Number(age) : null,
      employment,
      dependents: dependents ? Number(dependents) : null,
    })
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-8">
      {/* headline */}
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Your Wealth Plan Awaits:
          <br className="hidden sm:block" />
          Start with{" "}
          <span className="text-red-600 text-xl sm:text-2xl">BPI WAIS</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-lg mx-auto text-sm">
          Simply follow these easy steps to begin:
        </p>
        <ol className="mt-3 text-left text-gray-700 max-w-lg mx-auto space-y-1 text-sm list-decimal list-inside">
          <li>Provide your basic profile details.</li>
          <li>Share your income and financial position.</li>
          <li>Set your goals and preferences.</li>
          <li>Review your summary and submit.</li>
        </ol>
      </header>

      {/* profile fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>

        {/* Employment */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Employment Type
          </label>
          <select
            value={employment}
            onChange={(e) => setEmployment(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          >
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="freelancer">Freelancer</option>
            <option value="business">Business Owner</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>

        {/* Dependents */}
        <div>
          <label className="flex items-center gap-1 text-sm font-medium mb-1">
            Dependents
            <span className="relative group cursor-pointer">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 w-52 text-xs text-gray-700 bg-white border rounded-lg shadow-md px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                Dependents are individuals who rely on you financially
                (e.g., children, spouse, parents).
              </span>
            </span>
          </label>
          <input
            type="number"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>
    </form>
  )
}
