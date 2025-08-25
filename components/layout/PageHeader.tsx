"use client"

import React from "react"

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  breadcrumbs: Breadcrumb[]
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  return (
    <div className="relative w-full overflow-visible">
      {/* 🎯 Rotated Rectangle shifted left, taller, and lifted so height grows upward */}
      <div
        className="
          absolute
          left-[21%] -translate-x-1/2
          w-[160%] h-[18rem]
          bg-[#74622e]
          rounded-[2rem]
          rotate-3
          z-10
        "
        style={{
          top: "-6rem",
        }}
      />

      {/* ✅ Breadcrumbs aligned with Hero inner box */}
      <nav className="relative z-20 max-w-7xl mx-auto px-8 pt-6">
        <ol className="flex space-x-2 text-xs text-white font-semibold">
          {breadcrumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-center">
              {crumb.href ? (
                <a href={crumb.href} className="hover:underline">
                  {crumb.label}
                </a>
              ) : (
                <span>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && (
                <span className="mx-2">›</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
