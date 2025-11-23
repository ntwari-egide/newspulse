"use client"

import { Sparkles, MessageCircle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface DailyIndexData {
  score: number
  sentiment: "Positive" | "Negative" | "Neutral"
  percentage: number
}

interface NewsSummaryData {
  items: string[]
  timeframe: string
}

export default function Sidebar() {
  const [dailyIndex, setDailyIndex] = useState<DailyIndexData>({
    score: 91,
    sentiment: "Positive",
    percentage: 78,
  })
  const [summary, setSummary] = useState<NewsSummaryData>({
    items: [],
    timeframe: "24 hours",
  })
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month">("day")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indexRes, summaryRes] = await Promise.all([fetch("/api/index"), fetch("/api/summary")])
        const indexData = await indexRes.json()
        const summaryData = await summaryRes.json()
        setDailyIndex(indexData)
        setSummary(summaryData)
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error)
      }
    }

    fetchData()

    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Daily Index</CardTitle>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
              <span className="text-xs">i</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            {["Negative", "Serious", "Neutral", "Optimistic"].map((mood, i) => (
              <span key={mood} className={i === 0 ? "font-medium" : "text-muted-foreground"}>
                {mood}
              </span>
            ))}
            <Badge
              className={`${
                dailyIndex.sentiment === "Positive"
                  ? "bg-positive text-positive-foreground"
                  : dailyIndex.sentiment === "Negative"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {dailyIndex.score} {dailyIndex.sentiment}
            </Badge>
          </div>
          <div className="relative h-2 rounded-full bg-muted">
            <div
              className="absolute h-2 rounded-full bg-gradient-to-r from-destructive via-yellow-500 to-positive transition-all"
              style={{ width: `${dailyIndex.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" fill="currentColor" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={timeframe === "day" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("day")}
              className={timeframe === "day" ? "bg-secondary text-foreground" : ""}
            >
              Last Day
            </Button>
            <Button
              variant={timeframe === "week" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("week")}
            >
              Last Week
            </Button>
            <Button
              variant={timeframe === "month" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setTimeframe("month")}
            >
              Last Month
            </Button>
          </div>

          <div className="space-y-3 text-sm">
            <h3 className="font-semibold">View News Summary</h3>
            <ul className="space-y-2 text-muted-foreground">
              {summary.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">{summary.timeframe}</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
              Show More <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Federal Reserve</Badge>
              <Badge variant="secondary">Tech Earnings</Badge>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">Market Analysis</Badge>
            </div>
          </div>

          <div className="relative pt-4">
            <input
              type="text"
              placeholder="Ask a Question"
              className="w-full rounded-full bg-secondary px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 translate-y-2 flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
