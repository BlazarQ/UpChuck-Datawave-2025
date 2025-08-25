import { Card, CardContent } from "@/components/ui/card"
import { Target, Calculator, Shield, Users } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to take control of your financial future
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Goal-based Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Set and track multiple financial goals with intelligent recommendations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Cash Flow Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your financial future with detailed cash flow projections.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">BPI Product Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized suggestions for BPI banking and investment products.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Preset Profiles</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from Student, Young Professional, Parent, and other life stage profiles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
