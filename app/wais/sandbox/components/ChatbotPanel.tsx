  "use client"

  import { useEffect, useState } from "react"
  import { Lightbulb, Car, PiggyBank, Truck } from "lucide-react"

  // New BPI product recommendations for car-focused users
  const BPI_PRODUCTS = [
    {
      icon: <Car size={16} />,
      title: "BPI E-Vehicle Financing",
      desc: "Sustainably finance hybrid or electric models with low down-payment and up to 84-month term." 
    },
    {
      icon: <Car size={16} />,
      title: "BPI Auto Loan (Passenger Car)",
      desc: "Finance brand-new or pre-owned cars—low rates, down payments from 15%, and flexible terms." 
    },
    {
      icon: <Truck size={16} />,
      title: "BPI Loans Marketplace",
      desc: "Explore and compare car loan offers from partner brands like Kia, Honda, Nissan in one place." 
    },
  ]

  // Expanded AI Insights lines
  const INSIGHTS = [
    "💡 Projection: At your current savings rate of ₱35,000/month, you’ll save approximately ₱1.26M after 36 months.",
    "🎯 That still falls short of your ₱3M car goal—by about ₱1.74M.",
    "🔎 As a young professional, balancing lifestyle and savings is smart. Consider earmarking bonuses, investing part of your savings, or increasing monthly contributions slightly.",
    "🚗 You can also shorten the gap by applying for a BPI Auto Loan or E-Vehicle Financing, which let you take ownership now while paying over time.",
    "📊 Another option: extend your timeline modestly—from 36 to 48 months—or combine savings with partial financing to spread the goal realistically over time.",
    "✨ Tip: Use BPI’s Car Loan Calculator to model amortization and promotions—some include fee waivers or free first-year insurance, helping your budget go further."  
  ]

  // ChatbotPanel component
  export default function ChatbotPanel() {
    const [displayedText, setDisplayedText] = useState<string[]>([])
    const [currentLine, setCurrentLine] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // Simulate initial loading for LLM feel
    useEffect(() => {
      const loader = setTimeout(() => {
        setLoading(false)
        setDisplayedText([""]) // initialize first line
      }, 1000)
      return () => clearTimeout(loader)
    }, [])

    // Typewriter effect for insights
    useEffect(() => {
      if (!loading && currentLine < INSIGHTS.length) {
        if (charIndex < INSIGHTS[currentLine].length) {
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => {
              const newText = [...prev]
              newText[currentLine] =
                (newText[currentLine] || "") +
                INSIGHTS[currentLine][charIndex]
              return newText
            })
            setCharIndex((i) => i + 1)
          }, 25)
          return () => clearTimeout(timeout)
        } else {
          setCurrentLine((l) => l + 1)
          setCharIndex(0)
          setDisplayedText((prev) => [...prev, ""])
        }
      }
    }, [loading, charIndex, currentLine])

    return (
      <div className="bg-white rounded-2xl shadow h-full flex flex-col overflow-hidden">
        {/* Recommendations */}
        <div className="flex-1 flex flex-col p-4 bg-gradient-to-br from-[#A50034] to-[#7d0027] text-white rounded-t-2xl">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lightbulb size={18} /> Recommended BPI Products
          </h2>
          <ul className="space-y-3 text-sm">
            {BPI_PRODUCTS.map((p, idx) => (
              <li
                key={idx}
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition cursor-pointer"
              >
                <p className="font-medium flex items-center gap-2">
                  {p.icon} {p.title}
                </p>
                <p className="text-white/80">{p.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Insights */}
<div className="flex-1 flex flex-col bg-gray-50 p-4">
  <h2 className="text-lg font-semibold mb-3 text-gray-800">AI Insights</h2>
  <div className="border rounded-xl p-4 text-sm text-gray-800 bg-white shadow-inner overflow-y-auto max-h-56">
    {loading ? (
      <p className="text-gray-500 italic">
        Thinking... <span className="animate-pulse">⏳</span>
      </p>
    ) : (
      displayedText.map((line, i) => (
        <p key={i} className="leading-relaxed whitespace-pre-wrap">
          {line}
          {i === displayedText.length - 1 &&
            currentLine < INSIGHTS.length && (
              <span className="animate-pulse">▋</span>
            )}
        </p>
      ))
    )}
  </div>
</div>

      </div>
    )
  }
