import { Button } from "@/components/ui/button"
import { Target, Calculator, Shield } from "lucide-react"

export function PlanFutureSection() {
  return (
    <section id="plan-future" className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#C8102E]/10 text-[#C8102E] px-4 py-2 rounded-full text-sm font-medium">
                  BPI WAIS
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Plan Your Future with <span className="text-[#C8102E]">BPI WAIS</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience intelligent financial planning that adapts to your unique goals and lifestyle. Take control
                of your financial future with our comprehensive simulation tools.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#C8102E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-[#C8102E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Goal-Based Planning</h3>
                  <p className="text-gray-600">
                    Set multiple financial goals and receive personalized strategies to achieve them.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#C8102E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-6 h-6 text-[#C8102E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Cash Flow Simulation</h3>
                  <p className="text-gray-600">
                    Visualize your financial future with detailed projections and scenario planning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#C8102E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#C8102E]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">BPI Product Integration</h3>
                  <p className="text-gray-600">
                    Get personalized recommendations for BPI banking and investment solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button size="lg" className="bg-[#C8102E] hover:bg-[#A00E26] text-white px-8 py-6 text-lg">
                Try WAIS Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
              <img
                src="/financial-planning-consultation.png"
                alt="Professional financial planning consultation"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
