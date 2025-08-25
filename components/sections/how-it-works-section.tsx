import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, Target } from "lucide-react"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get personalized financial insights in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 border-2 hover:border-primary/20 transition-colors">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">1. Enter Your Profile</h3>
                <p className="text-muted-foreground">
                  Input your profile, income, and financial goals to get started with personalized planning.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-8 border-2 hover:border-primary/20 transition-colors">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">2. Get Projections</h3>
                <p className="text-muted-foreground">
                  Receive personalized savings projections with detailed timeline graphs and scenarios.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-8 border-2 hover:border-primary/20 transition-colors">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">3. Receive Suggestions</h3>
                <p className="text-muted-foreground">
                  Get goal-based suggestions for savings, insurance, investments, and loans tailored to you.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
