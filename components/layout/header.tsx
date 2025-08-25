"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Search } from "lucide-react"

interface HeaderProps {
  isScrolled: boolean
  hoveredDropdown: string | null
  setHoveredDropdown: (dropdown: string | null) => void
}

export function Header({ isScrolled, hoveredDropdown, setHoveredDropdown }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar - Breadcrumb - Hidden when scrolled */}
      <div className={`transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden" : "h-auto"}`}>
        <div className="max-w-7xl mx-auto px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <span>You are in Wealth Management</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>
            <nav className="flex items-center space-x-6 text-sm text-gray-700">
              <a href="#" className="hover:text-gray-900 transition-colors">
                About us
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                News
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Sustainability
              </a>
              <Button size="sm" className="bg-[#C8102E] hover:bg-[#A00E26] text-white px-4 py-1">
                LOGIN
              </Button>
            </nav>
          </div>
        </div>
      </div>

      <div className={`border-t border-gray-200 ${isScrolled ? "hidden" : "block"}`}></div>

      {/* Middle Bar - Logo and Banking category nav with dropdowns */}
      <div className="py-3 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <img src="/bpi-logo.png" alt="BPI Logo" className="h-10 w-auto" />
              </div>
              <nav className="flex items-center space-x-8 text-sm text-gray-700">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown("preferred")}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <a
                    href="#"
                    className={`hover:text-gray-900 transition-colors flex items-center ${hoveredDropdown === "preferred" ? "border-b-2 border-[#C8102E] pb-1" : ""}`}
                  >
                    Preferred Banking
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredDropdown("wealth")}
                  onMouseLeave={() => setHoveredDropdown(null)}
                >
                  <a
                    href="#"
                    className={`hover:text-gray-900 transition-colors font-medium flex items-center ${hoveredDropdown === "wealth" ? "border-b-2 border-[#C8102E] pb-1" : ""}`}
                  >
                    Asset and Wealth
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </nav>
            </div>
            <Search className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Dropdown Menus */}
      {hoveredDropdown === "preferred" && (
        <div
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-40"
          onMouseEnter={() => setHoveredDropdown("preferred")}
          onMouseLeave={() => setHoveredDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Preferred Banking overview</h3>
                <ChevronDown className="w-6 h-6 ml-2 text-[#C8102E]" />
              </div>
              <p className="text-gray-600 mb-8 text-lg">Uniquely tailored experiences await you.</p>
              <div className="grid grid-cols-2 gap-12 max-w-3xl">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg">Preferred Banking Services</h4>
                  <ul className="space-y-4 text-gray-600">
                    <li className="hover:text-gray-900 cursor-pointer">Personalized Advisory</li>
                    <li className="hover:text-gray-900 cursor-pointer">Priority Handling</li>
                    <li className="hover:text-gray-900 cursor-pointer">Premium Experiences</li>
                    <li className="text-[#C8102E] hover:text-[#A00E26] cursor-pointer font-medium">
                      WAIS: Financial Sandbox
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg flex items-center">
                    The Program
                    <ChevronDown className="w-5 h-5 ml-2 text-[#C8102E]" />
                  </h4>
                  <ul className="space-y-4 text-gray-600">
                    <li className="hover:text-gray-900 cursor-pointer">
                      More than just strangers: Building a great relationship with your bank
                    </li>
                    <li className="hover:text-gray-900 cursor-pointer">
                      Real gains to real estate: Exploring REITs in the Philippines
                    </li>
                    <li className="hover:text-gray-900 cursor-pointer">What a save: Up your saving game play, easy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hoveredDropdown === "wealth" && (
        <div
          className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-40"
          onMouseEnter={() => setHoveredDropdown("wealth")}
          onMouseLeave={() => setHoveredDropdown(null)}
        >
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-900">Asset and Wealth overview</h3>
                <ChevronDown className="w-6 h-6 ml-2 text-[#C8102E]" />
              </div>
              <p className="text-gray-600 mb-8 text-lg">Live your best life with BPI Wealth.</p>
              <div className="grid grid-cols-2 gap-12 max-w-3xl">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg flex items-center">
                    For Individuals
                    <ChevronDown className="w-5 h-5 ml-2 text-[#C8102E]" />
                  </h4>
                  <ul className="space-y-4 text-gray-600">
                    <li className="hover:text-gray-900 cursor-pointer">Who we are</li>
                    <li className="hover:text-gray-900 cursor-pointer">Investing for Beginners</li>
                    <li className="hover:text-gray-900 cursor-pointer">Investment Solutions</li>
                    <li className="hover:text-gray-900 cursor-pointer">Insights from our Analysts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6 text-lg flex items-center">
                    For Institutions
                    <ChevronDown className="w-5 h-5 ml-2 text-[#C8102E]" />
                  </h4>
                  <ul className="space-y-4 text-gray-600">
                    <li className="hover:text-gray-900 cursor-pointer">Fund Management Solutions</li>
                    <li className="hover:text-gray-900 cursor-pointer">Fiduciary Solutions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
