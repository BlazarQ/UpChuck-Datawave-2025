"use client"

import { Menu, X } from "lucide-react"
import IncomeForm from "./forms/IncomeForm"
import FinancialPositionForm from "./forms/FinancialPositionForm"
import GoalsForm from "./forms/GoalsForm"

type SidebarProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  financialData: any
  setFinancialData: (data: any) => void
  activeTab: "income" | "financial" | "goals" | null
  setActiveTab: (tab: "income" | "financial" | "goals" | null) => void
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  financialData,
  setFinancialData,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  return (
    <>
      {/* Overlay (blurred background) */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Toggle button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-1/2 -translate-y-1/2 left-0 z-50 bg-red-600 hover:bg-red-700 text-white p-3 rounded-r-xl shadow-lg animate-pulse"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-4 left-0 h-[calc(100%-2rem)] w-96 bg-white shadow-2xl border-r transform transition-transform duration-300 z-50 flex flex-col rounded-r-xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Financial Inputs</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b">
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "income"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab("income")}
          >
            Income
          </button>
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "financial"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab("financial")}
          >
            Position
          </button>
          <button
            className={`flex-1 p-2 text-sm font-medium ${
              activeTab === "goals"
                ? "border-b-2 border-red-600 text-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab("goals")}
          >
            Goals
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {!activeTab && (
            <p className="text-gray-500 text-sm italic">
              Select a tab above to start entering your financial information.
            </p>
          )}

          {activeTab === "income" && (
            <IncomeForm
              onNext={(data) => {
                setFinancialData((prev) => ({ ...prev, incomeData: data }))
              }}
              onBack={() => setActiveTab(null)}
              defaultValues={financialData.incomeData}
              formId="income-form"
            />
          )}

          {activeTab === "financial" && (
            <FinancialPositionForm
              onNext={(data) => {
                setFinancialData((prev) => ({ ...prev, financialPosition: data }))
              }}
              onBack={() => setActiveTab(null)}
              defaultValues={financialData.financialPosition}
              formId="financial-form"
            />
          )}

          {activeTab === "goals" && (
            <GoalsForm
              onNext={(data) => {
                setFinancialData((prev) => ({ ...prev, goals: data }))
              }}
              onBack={() => setActiveTab(null)}
              defaultValues={financialData.goals}
              formId="goals-form"
            />
          )}
        </div>
      </aside>
    </>
  )
}
