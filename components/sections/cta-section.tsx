import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold">Take the first step to financial clarity today.</h2>
          <p className="text-xl opacity-90">
            Join thousands of Filipinos who are already planning their financial future with BPI WAIS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wais">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Planning with WAIS
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Contact BPI Wealth
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
