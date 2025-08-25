"use client"

export default function EmptyState({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-red-600">Review & Submit</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Here’s a quick snapshot of what you shared. Please review carefully before submitting.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Client Profile */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-semibold text-red-600 mb-3 text-lg">Client Profile</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Age:</strong> {data.age ?? "—"}</li>
            <li><strong>Employment:</strong> {data.employment ?? "—"}</li>
            <li><strong>Dependents:</strong> {data.dependents ?? "—"}</li>
          </ul>
        </div>

        {/* Income Information */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-semibold text-red-600 mb-3 text-lg">Income Information</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Monthly Income:</strong> {data.income ?? "—"}</li>
            <li><strong>Other Sources:</strong> {data.otherIncome ?? "—"}</li>
          </ul>
        </div>

        {/* Financial Position */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-semibold text-red-600 mb-3 text-lg">Financial Position</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Assets:</strong> {data.assets ?? "—"}</li>
            <li><strong>Liabilities:</strong> {data.liabilities ?? "—"}</li>
            <li><strong>Savings:</strong> {data.savings ?? "—"}</li>
          </ul>
        </div>

        {/* Goals */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <h3 className="font-semibold text-red-600 mb-3 text-lg">Your Goals</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Primary Goal:</strong> {data.goal ?? "—"}</li>
            <li><strong>Timeline:</strong> {data.timeline ?? "—"}</li>
            <li><strong>Risk Tolerance:</strong> {data.riskTolerance ?? "—"}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
