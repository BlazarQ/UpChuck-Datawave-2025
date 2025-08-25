import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-4 lg:pt-10 pb-20 lg:pb-28 overflow-hidden bg-white">
      {/* ⬆️ This wrapper is now z-30 to ensure it sits ABOVE the breadcrumb bg shape */}
      <div className="max-w-7xl mx-auto px-8 relative z-30">
        {/* Overlapping box (about 1/3 into the rotated shape) */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative p-12 -mt--8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side (text + buttons) */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Plan Your Future with <span className="text-red-700">BPI WAIS</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A free, intelligent financial simulator that helps you track goals,
                  budget smarter, and explore BPI solutions—anytime, anywhere.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/wais">
                  <Button size="lg" className="text-lg px-8 py-6 bg-red-700 hover:bg-red-800">
                    Try WAIS
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right side (image) */}
            <div className="relative">
              <img
                src="/filipino-family-finances.png"
                alt="Family planning their finances"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
