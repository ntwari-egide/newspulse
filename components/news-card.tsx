import { Bookmark, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import type { NewsArticle } from '@/lib/news-data'

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const isLarge = article.featured

  return (
    <Card
      className={`group relative overflow-hidden border-border bg-card hover:border-primary transition-all ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative ${isLarge ? 'h-[400px]' : 'h-[280px]'}`}>
        <Image
          src={article.imageUrl || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <Badge variant="secondary" className="bg-secondary/90 backdrop-blur">
            {article.category}
          </Badge>
          <button className="rounded-full bg-background/20 p-2 backdrop-blur hover:bg-background/40 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          {article.tag && (
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {article.tag}
            </span>
          )}
          <h3
            className={`font-bold text-white line-clamp-3 ${
              isLarge ? 'text-2xl lg:text-3xl' : 'text-lg'
            }`}
          >
            {article.title}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 flex-1 rounded-full bg-accent/30"
                  style={{ width: '120px' }}
                >
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${article.coverage}%` }}
                  />
                </div>
                <span className="text-xs text-white/90">
                  {article.coverage}% coverage
                </span>
              </div>
            </div>
            <span className="text-xs text-white/70">{article.sources} sources</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
