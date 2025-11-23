"use client"

import { useEffect, useState } from "react"
import NewsCard from "@/components/news-card"
import type { NewsArticle } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsGridProps {
  type?: "top" | "personalized" | "market" | "local" | "trending"
  limit?: number
}

export default function NewsGrid({ type = "top", limit = 6 }: NewsGridProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/articles?type=${type}&limit=${limit}`)
        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error("Failed to fetch articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()

    const interval = setInterval(fetchArticles, 30000)
    return () => clearInterval(interval)
  }, [type, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
