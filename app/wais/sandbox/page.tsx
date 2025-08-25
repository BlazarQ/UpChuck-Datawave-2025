"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/layout/footer"
import Sidebar from "./components/Sidebar"
import ProjectionChart from "./components/ProjectionChart" // renamed
import SummaryCards from "./components/SummaryCards"
import ChatbotPanel from "./components/ChatbotPanel"

export default function WAISSandbox() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // track which tab is active in the Sidebar
  const [activeTab, setActiveTab] = useState<
    "income" | "financial" | "goals" | null
  >(null)

  // All finance-related data in one object
  const [financialData, setFinancialData] = useState({
    income: 80000,
    expenses: 45000,
    savings: 35000,
    goal: 10000000,
    months: 60,
    viewMode: "months" as "months" | "years",
  })

  // Load saved formData from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("waisFormData")
    if (saved) {
      const data = JSON.parse(saved)

      setFinancialData((prev) => ({
        ...prev,
        income: data.income ? Number(data.income) : prev.income,
        expenses: data.expenses ? Number(data.expenses) : prev.expenses,
        savings: data.savings ? Number(data.savings) : prev.savings,
        goal: data.goal ? Number(data.goal) : prev.goal,
        months: data.timeline ? Number(data.timeline) : prev.months,
      }))
    }
  }, [])

  // Projection data
  const data =
    financialData.viewMode === "months"
      ? Array.from({ length: financialData.months }, (_, i) => ({
          period: `Month ${i + 1}`,
          income: financialData.income,
          expenses: financialData.expenses,
          savings: financialData.savings * (i + 1),
        }))
      : Array.from({ length: Math.floor(financialData.months / 12) }, (_, i) => ({
          period: `Year ${i + 1}`,
          income: financialData.income * 12,
          expenses: financialData.expenses * 12,
          savings: financialData.savings * 12 * (i + 1),
        }))

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Removed Header */}
      <main className="flex flex-1 relative pt-4">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          financialData={financialData}
          setFinancialData={setFinancialData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <section className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Chart + Summary */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectionChart
              data={data}
              months={financialData.months}
              viewMode={financialData.viewMode}
            />
            <SummaryCards
              income={financialData.income}
              expenses={financialData.expenses}
              savings={financialData.savings}
              goal={financialData.goal}
            />
          </div>

          {/* Right side: Chatbot */}
          <ChatbotPanel />
        </section>
      </main>

      <Footer />
    </div>
  )
}
