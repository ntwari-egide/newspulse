import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import type { NewsArticle } from "@/lib/types"
import { Clock } from "lucide-react"

interface RelatedArticlesProps {
  articles: NewsArticle[]
  category: string
}

export default function RelatedArticles({ articles, category }: RelatedArticlesProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">More from {category}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <Card className="group overflow-hidden border-border hover:border-primary transition-all cursor-pointer h-full">
              <div className="relative h-48">
                <Image
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge variant="secondary" className="absolute top-3 left-3 bg-secondary/90 backdrop-blur">
                  {article.category}
                </Badge>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{article.timestamp}</span>
                </div>

                <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{article.coverage}% coverage</span>
                  <span className="text-muted-foreground">{article.sources} sources</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
