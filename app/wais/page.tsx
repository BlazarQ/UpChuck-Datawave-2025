"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

import ClientProfileForm from "./components/ClientProfileForm"
import IncomeForm from "./components/IncomeForm"
import FinancialPositionForm from "./components/FinancialPositionForm"
import GoalsForm from "./components/GoalsForm"
import EmptyState from "./components/EmptyState"
import FormNavigation from "./components/FormNavigation"

import {
  CheckCircle2,
  ChevronRight,
  User,
  Wallet,
  PieChart,
  Target,
} from "lucide-react"

type PartialData = Record<string, any>

const TOTAL_STEPS = 4
const FORM_ID = "wais-step-form"
const FIXED_FORM_HEIGHT = "min-h-[600px]"

export default function WAISApp() {
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

  const [step, setStep] = useState(1)
  const [maxStepReached, setMaxStepReached] = useState(1)
  const [formData, setFormData] = useState<PartialData>({})

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNext = (data: PartialData) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((s) => {
      const nextStep = Math.min(s + 1, TOTAL_STEPS + 1) // step 5 = review
      setMaxStepReached((prev) => Math.max(prev, nextStep))
      return nextStep
    })
  }

  const handleBack = () => setStep((s) => Math.max(1, s - 1))

  const goToStep = (target: number) => {
    if (target <= maxStepReached) {
      setStep(target)
    }
  }

  const handleSubmit = () => {
    // Save answers to localStorage
    localStorage.setItem("waisFormData", JSON.stringify(formData))

    // Redirect to sandbox
    router.push("/wais/sandbox")
  }

  const progress = useMemo(
    () =>
      Math.min(
        100,
        Math.round(
          (Math.min(maxStepReached, TOTAL_STEPS) / TOTAL_STEPS) * 100
        )
      ),
    [maxStepReached]
  )

  const steps = [
    { id: 1, label: "Client profile", icon: User },
    { id: 2, label: "Income information", icon: Wallet },
    { id: 3, label: "Financial position", icon: PieChart },
    { id: 4, label: "Your goals", icon: Target },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {hoveredDropdown && (
        <div className="fixed inset-0 bg-black/20 z-30 pointer-events-none" />
      )}

      <Header
        isScrolled={isScrolled}
        hoveredDropdown={hoveredDropdown}
        setHoveredDropdown={setHoveredDropdown}
      />

      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[260px] px-5 py-8">
          <h2 className="text-lg font-semibold mb-4">WAIS Application</h2>
          <nav className="space-y-2">
            {steps.map((s) => {
              const isActive = step === s.id
              const isDone = maxStepReached > s.id
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => goToStep(s.id)}
                  disabled={s.id > maxStepReached}
                  className={[
                    "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition",
                    isActive
                      ? "bg-red-50 text-red-700 ring-1 ring-red-100"
                      : "hover:bg-gray-50",
                    s.id > maxStepReached ? "opacity-50 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Icon className="h-5 w-5 text-gray-600" />
                  )}
                  <span
                    className={[
                      "text-sm",
                      isActive ? "font-semibold" : "text-gray-700",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                </button>
              )
            })}
          </nav>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">{progress}%</div>
          </div>
        </aside>

        {/* Main container */}
        <section className="flex-1 flex justify-center px-2 sm:px-4 lg:px-6">
          <div
            className={`w-full max-w-6xl bg-white rounded-2xl shadow-md border mt-8 mb-8 flex flex-col ${FIXED_FORM_HEIGHT}`}
          >
            <div className="flex-1 p-6 sm:p-8">
              {step === 1 && (
                <ClientProfileForm
                  formId={FORM_ID}
                  onNext={handleNext}
                  defaultValues={formData}
                />
              )}
              {step === 2 && (
                <IncomeForm
                  formId={FORM_ID}
                  onNext={handleNext}
                  onBack={handleBack}
                  defaultValues={formData}
                />
              )}
              {step === 3 && (
                <FinancialPositionForm
                  formId={FORM_ID}
                  onNext={handleNext}
                  onBack={handleBack}
                  defaultValues={formData}
                />
              )}
              {step === 4 && (
                <GoalsForm
                  formId={FORM_ID}
                  onNext={handleNext}
                  onBack={handleBack}
                  defaultValues={formData}
                />
              )}
              {step > 4 && <EmptyState data={formData} />}
            </div>

            {/* Navigation */}
            <FormNavigation
              formId={FORM_ID}
              onBack={step > 1 ? handleBack : undefined}
              canSubmit
              submitLabel={step > TOTAL_STEPS ? "Submit" : "Continue →"}
              className="rounded-b-2xl"
              // 👇 Add onSubmit only when on final review
              onSubmit={step > TOTAL_STEPS ? handleSubmit : undefined}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
