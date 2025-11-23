"use client"

import type React from "react"
import { Bookmark, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { NewsArticle } from "@/lib/types"
import { useState } from "react"

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const [bookmarked, setBookmarked] = useState(article.bookmarked || false)
  const [isBookmarking, setIsBookmarking] = useState(false)
  const isLarge = article.featured

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isBookmarking) return

    setIsBookmarking(true)
    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bookmark" }),
      })
      const data = await response.json()
      setBookmarked(data.bookmarked)
    } catch (error) {
      console.error("Failed to bookmark:", error)
    } finally {
      setIsBookmarking(false)
    }
  }

  const handleView = async () => {
    try {
      await fetch(`/api/articles/${article.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "view" }),
      })
    } catch (error) {
      console.error("Failed to track view:", error)
    }
  }

  return (
    <Link href={`/article/${article.id}`} onClick={handleView}>
      <Card
        className={`group relative overflow-hidden border-border bg-card hover:border-primary transition-all cursor-pointer ${
          isLarge ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div className={`relative ${isLarge ? "h-[400px]" : "h-[280px]"}`}>
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-secondary/90 backdrop-blur">
                {article.category}
              </Badge>
              {article.location && (
                <span className="text-xs text-white/80 bg-black/30 backdrop-blur px-2 py-1 rounded">
                  {article.location}
                </span>
              )}
            </div>
            <button
              onClick={handleBookmark}
              disabled={isBookmarking}
              className="rounded-full bg-background/20 p-2 backdrop-blur hover:bg-background/40 transition-colors disabled:opacity-50"
            >
              <Bookmark
                className={`h-4 w-4 transition-colors ${bookmarked ? "fill-primary text-primary" : "text-white"}`}
              />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <div className="flex items-center gap-2">
              {article.tag && (
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{article.tag}</span>
              )}
              {article.timestamp && (
                <>
                  <span className="text-white/50">•</span>
                  <span className="text-xs text-white/70">{article.timestamp}</span>
                </>
              )}
              {article.views && (
                <>
                  <span className="text-white/50">•</span>
                  <span className="text-xs text-white/70 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.views.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <h3 className={`font-bold text-white line-clamp-3 ${isLarge ? "text-2xl lg:text-3xl" : "text-lg"}`}>
              {article.title}
            </h3>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-accent/30" style={{ width: "120px" }}>
                    <div
                      className="h-2 rounded-full bg-accent transition-all"
                      style={{ width: `${article.coverage}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/90">{article.coverage}% coverage</span>
                </div>
              </div>
              <span className="text-xs text-white/70">{article.sources} sources</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
