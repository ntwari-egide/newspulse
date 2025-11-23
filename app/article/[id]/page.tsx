import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bookmark, Clock, Eye, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { dataStore } from "@/lib/data-store"
import Header from "@/components/header"
import RelatedArticles from "@/components/related-articles"

interface ArticlePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params
  const article = dataStore.getArticleById(id)

  if (!article) {
    notFound()
  }

  // Generate full article content based on the title
  const generateArticleContent = (title: string) => {
    const sections = [
      {
        heading: "Key Developments",
        content: `In a significant development, ${title.toLowerCase()}. Industry experts are closely monitoring the situation as it continues to unfold, with potential implications for markets and stakeholders across multiple sectors.`,
      },
      {
        heading: "Market Impact",
        content: `The announcement has already begun to influence market sentiment, with early trading showing mixed reactions from investors. Financial analysts suggest that the long-term effects could reshape industry dynamics and set new precedents for future policy decisions.`,
      },
      {
        heading: "Expert Analysis",
        content: `Leading economists and industry specialists have weighed in on the developments, offering varied perspectives on the potential outcomes. Many point to historical precedents while acknowledging the unique circumstances surrounding this particular situation.`,
      },
      {
        heading: "Looking Ahead",
        content: `As the situation continues to develop, stakeholders are preparing for multiple scenarios. Industry leaders are expected to convene in the coming weeks to discuss strategies and coordinate responses to these evolving circumstances.`,
      },
    ]

    return sections
  }

  const content = generateArticleContent(article.title)
  const relatedArticles = dataStore
    .getAllArticles({ category: article.category })
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Category and Meta */}
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                {article.category}
              </Badge>
              {article.location && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  {article.location}
                </span>
              )}
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.timestamp}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {article.views?.toLocaleString()} views
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {article.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center justify-between border-y border-border py-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">NP</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">NewsPulse Editorial Team</p>
                  <p className="text-sm text-muted-foreground">Coverage from {article.sources} sources worldwide</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Coverage Stats */}
            <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-2">Coverage Progress</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-accent transition-all"
                      style={{ width: `${article.coverage}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{article.coverage}%</span>
                </div>
              </div>
              <div className="text-center px-4 border-l border-border">
                <div className="text-2xl font-bold text-foreground">{article.sources}</div>
                <div className="text-xs text-muted-foreground">Sources</div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              {content.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-foreground">{section.heading}</h2>
                  <p className="font-serif text-lg leading-relaxed text-foreground/90">{section.content}</p>
                </div>
              ))}

              <div className="border-l-4 border-primary pl-6 py-4 my-8 bg-primary/5 rounded-r">
                <p className="font-serif text-xl italic text-foreground/80">
                  "This development marks a significant shift in the industry landscape, with far-reaching implications
                  for stakeholders across the sector."
                </p>
                <p className="text-sm text-muted-foreground mt-2">— Industry Expert Analysis</p>
              </div>

              <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-foreground">Broader Implications</h2>
                <p className="font-serif text-lg leading-relaxed text-foreground/90 mb-4">
                  The ramifications of these developments extend beyond immediate market reactions. Industry observers
                  note that this could set precedents for future policy decisions and strategic planning across multiple
                  sectors.
                </p>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">
                  As stakeholders continue to assess the situation, ongoing coverage from our network of{" "}
                  {article.sources} sources worldwide ensures comprehensive reporting on all aspects of this evolving
                  story.
                </p>
              </div>
            </div>

            {/* Tags */}
            {article.tag && (
              <div className="flex items-center gap-2 pt-6 border-t border-border">
                <span className="text-sm text-muted-foreground">Tags:</span>
                <Badge variant="outline">{article.tag}</Badge>
                <Badge variant="outline">{article.category}</Badge>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16">
            <RelatedArticles articles={relatedArticles} category={article.category} />
          </div>
        )}
      </main>
    </div>
  )
}
