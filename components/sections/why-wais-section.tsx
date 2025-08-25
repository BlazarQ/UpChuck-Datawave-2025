import { CheckCircle } from "lucide-react"

export function WhyWaisSection() {
  return (
    <section id="why-wais" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Choose BPI WAIS?</h2>
              <p className="text-lg text-muted-foreground">
                Empowering Filipinos to take charge of their financial future with intelligent, accessible tools.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Free and Accessible</h3>
                  <p className="text-muted-foreground">
                    Available to all users at no cost, making financial planning accessible to every Filipino.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Complements BPI Services</h3>
                  <p className="text-muted-foreground">
                    Designed to work seamlessly with BPI Next and BPI Wealth advisory services.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Intelligent Insights</h3>
                  <p className="text-muted-foreground">
                    Advanced algorithms provide personalized recommendations based on your unique situation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/filipino-mobile-banking.png"
              alt="Professional financial planning consultation"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
