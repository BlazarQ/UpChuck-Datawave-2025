"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/layout/PageHeader"
import { HeroSection } from "@/components/sections/hero-section"
import { OverviewSection } from "@/components/sections/overview-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PlanFutureSection } from "@/components/sections/plan-future-section"
import { WhyWaisSection } from "@/components/sections/why-wais-section"
import { CtaSection } from "@/components/sections/cta-section"

export default function BPIWAISLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {hoveredDropdown && (
        <div className="fixed inset-0 bg-black/20 z-30 pointer-events-none" />
      )}

      <Header
        isScrolled={isScrolled}
        hoveredDropdown={hoveredDropdown}
        setHoveredDropdown={setHoveredDropdown}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Wealth Management", href: "#" },
          { label: "BPI WAIS" },
        ]}
      />

      <HeroSection />
      <OverviewSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PlanFutureSection />
      <WhyWaisSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
