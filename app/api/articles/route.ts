import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || undefined
  const search = searchParams.get("search") || undefined
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const type = searchParams.get("type")

  try {
    let articles

    switch (type) {
      case "top":
        articles = dataStore.getTopNews(limit)
        break
      case "personalized":
        articles = dataStore.getPersonalizedFeed()
        break
      case "market":
        articles = dataStore.getMarketNews()
        break
      case "local":
        articles = dataStore.getLocalNews()
        break
      case "trending":
        articles = dataStore.getTrendingArticles(limit)
        break
      case "bookmarked":
        articles = dataStore.getBookmarkedArticles()
        break
      default:
        articles = dataStore.getAllArticles({ category, search })
    }

    return NextResponse.json({ articles, count: articles.length })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
