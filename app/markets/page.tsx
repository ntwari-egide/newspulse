"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import NewsGrid from "@/components/news-grid"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketIndex {
  name: string
  value: string
  change: string
  positive: boolean
}

export default function MarketsPage() {
  const [indices, setIndices] = useState<MarketIndex[]>([
    { name: "S&P 500", value: "4,783.45", change: "+1.2%", positive: true },
    { name: "NASDAQ", value: "15,361.64", change: "+2.1%", positive: true },
    { name: "DOW", value: "37,695.73", change: "-0.3%", positive: false },
    { name: "RUSSELL", value: "2,089.54", change: "+0.8%", positive: true },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((index) => {
          const changeValue = Number.parseFloat(index.change.replace("%", ""))
          const randomChange = (Math.random() - 0.5) * 0.5
          const newChange = (changeValue + randomChange).toFixed(1)
          const positive = Number.parseFloat(newChange) >= 0

          return {
            ...index,
            change: `${positive ? "+" : ""}${newChange}%`,
            positive,
          }
        }),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Markets</h1>
              <p className="mt-2 text-muted-foreground">Financial markets and trading news</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {indices.map((index) => (
                <MarketIndexCard key={index.name} {...index} />
              ))}
            </div>

            <NewsGrid type="market" limit={8} />
          </div>
          <aside className="space-y-6">
            <Sidebar />
          </aside>
        </div>
      </main>
    </div>
  )
}

function MarketIndexCard({ name, value, change, positive }: MarketIndex) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary">
      <div className="text-sm text-muted-foreground">{name}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      <div
        className={`mt-1 flex items-center gap-1 text-sm font-semibold transition-colors ${positive ? "text-positive" : "text-negative"}`}
      >
        {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        {change}
      </div>
    </div>
  )
}
