"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock } from "lucide-react"
import type { Timeline } from "@/lib/types"

export default function TimelinesPage() {
  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTimelines = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/timelines")
        const data = await response.json()
        setTimelines(data.timelines)
      } catch (error) {
        console.error("Failed to fetch timelines:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimelines()

    const interval = setInterval(fetchTimelines, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
                <Clock className="h-8 w-8" />
                Timelines
              </h1>
              <p className="mt-2 text-muted-foreground">Follow story developments as they unfold</p>
            </div>

            {loading ? (
              <TimelinesSkeleton />
            ) : (
              <div className="space-y-6">
                {timelines.map((timeline) => (
                  <div
                    key={timeline.id}
                    className="rounded-lg border border-border bg-card p-6 hover:border-primary transition-all"
                  >
                    <h2 className="text-2xl font-bold mb-4">{timeline.title}</h2>
                    <div className="space-y-4">
                      {timeline.events.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
                            {index < timeline.events.length - 1 && (
                              <div className="flex-1 w-0.5 bg-border mt-2" style={{ minHeight: "60px" }} />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="text-sm text-muted-foreground mb-1 font-medium">{event.time}</div>
                            <div className="font-medium text-foreground">{event.description}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{event.sources} sources</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <Sidebar />
          </aside>
        </div>
      </main>
    </div>
  )
}

function TimelinesSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-96 w-full rounded-lg" />
      ))}
    </div>
  )
}
