import type { NewsArticle, Timeline } from "@/lib/types"

interface DailyIndexData {
  score: number
  sentiment: "Positive" | "Negative" | "Neutral"
  percentage: number
}

interface NewsSummaryData {
  items: string[]
  timeframe: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ConversationHistory {
  userId: string
  messages: ChatMessage[]
}

class DataStore {
  private articles: NewsArticle[]
  private timelines: Timeline[]
  private dailyIndex: DailyIndexData
  private newsSummary: NewsSummaryData
  private bookmarkedArticles: Set<string>
  private viewedArticles: Set<string>
  private conversations: Map<string, ConversationHistory>

  constructor() {
    this.articles = this.generateInitialArticles()
    this.timelines = this.generateInitialTimelines()
    this.dailyIndex = {
      score: 91,
      sentiment: "Positive",
      percentage: 78,
    }
    this.newsSummary = {
      items: [
        "Federal Reserve maintains steady interest rates amid economic stability",
        "Tech sector sees strong Q4 earnings across major companies",
        "Energy markets react to OPEC production policy changes",
        "Cryptocurrency adoption increases with new regulatory clarity",
      ],
      timeframe: "24 hours",
    }
    this.bookmarkedArticles = new Set()
    this.viewedArticles = new Set()
    this.conversations = new Map()

    // Simulate real-time updates
    this.startRealTimeUpdates()
  }

  private generateInitialArticles(): NewsArticle[] {
    return [
      {
        id: "1",
        title: "Federal Reserve announces interest rate decision amid inflation concerns",
        imageUrl: "/federal-reserve-building.png",
        category: "Economics",
        tag: "Breaking News",
        coverage: 89,
        sources: 247,
        featured: true,
        timestamp: "15 minutes ago",
        location: "Washington DC",
        views: 12453,
        bookmarked: false,
      },
      {
        id: "2",
        title: "Tech giants report Q4 earnings, market shows mixed reactions",
        imageUrl: "/stock-market-trading-floor.png",
        category: "Markets",
        tag: "Earnings",
        coverage: 76,
        sources: 189,
        timestamp: "1 hour ago",
        location: "New York",
        views: 8932,
        bookmarked: false,
      },
      {
        id: "3",
        title: "Oil prices surge as OPEC announces production cuts",
        imageUrl: "/oil-refinery-at-sunset.jpg",
        category: "Energy",
        coverage: 82,
        sources: 156,
        timestamp: "2 hours ago",
        location: "Global",
        views: 7621,
        bookmarked: false,
      },
      {
        id: "4",
        title: "Cryptocurrency market rallies on new regulatory framework",
        imageUrl: "/cryptocurrency-bitcoin-golden.jpg",
        category: "Crypto",
        tag: "Regulation",
        coverage: 68,
        sources: 134,
        timestamp: "3 hours ago",
        location: "United States",
        views: 6543,
        bookmarked: false,
      },
      {
        id: "5",
        title: "Major airline merger approved by regulators",
        imageUrl: "/commercial-airplane-takeoff.jpg",
        category: "Transportation",
        coverage: 54,
        sources: 98,
        timestamp: "4 hours ago",
        location: "United States",
        views: 4321,
        bookmarked: false,
      },
      {
        id: "6",
        title: "Housing market shows signs of recovery in major cities",
        imageUrl: "/modern-city-skyline-residential.jpg",
        category: "Real Estate",
        coverage: 61,
        sources: 112,
        timestamp: "5 hours ago",
        location: "United States",
        views: 5234,
        bookmarked: false,
      },
      {
        id: "7",
        title: "Artificial intelligence startup secures $500M funding round",
        imageUrl: "/ai-technology-startup-office.jpg",
        category: "Technology",
        tag: "Funding",
        coverage: 72,
        sources: 145,
        timestamp: "30 minutes ago",
        location: "San Francisco",
        views: 9876,
        bookmarked: false,
      },
      {
        id: "8",
        title: "Global supply chain disruptions ease as ports clear backlogs",
        imageUrl: "/cargo-ships-at-port.jpg",
        category: "Business",
        coverage: 65,
        sources: 128,
        timestamp: "2 hours ago",
        location: "Global",
        views: 6789,
        bookmarked: false,
      },
      {
        id: "9",
        title: "Pennsylvania announces new infrastructure investment plan",
        imageUrl: "/pennsylvania-highway-construction.jpg",
        category: "Local",
        tag: "Infrastructure",
        coverage: 45,
        sources: 67,
        timestamp: "1 hour ago",
        location: "Harrisburg, PA",
        views: 3456,
        bookmarked: false,
      },
      {
        id: "10",
        title: "Bethlehem Steel historic site receives federal grant for preservation",
        imageUrl: "/historic-steel-mill-industrial-site.jpg",
        category: "Local",
        coverage: 38,
        sources: 52,
        timestamp: "3 hours ago",
        location: "Bethlehem, PA",
        views: 2876,
        bookmarked: false,
      },
      {
        id: "11",
        title: "Philadelphia tech sector shows record job growth in Q4",
        imageUrl: "/philadelphia-skyline-modern-office.jpg",
        category: "Local",
        tag: "Employment",
        coverage: 41,
        sources: 58,
        timestamp: "5 hours ago",
        location: "Philadelphia, PA",
        views: 3198,
        bookmarked: false,
      },
      {
        id: "12",
        title: "New electric vehicle plant opens in Pittsburgh, creates 2,000 jobs",
        imageUrl: "/ev-manufacturing-facility.png",
        category: "Local",
        coverage: 56,
        sources: 89,
        timestamp: "6 hours ago",
        location: "Pittsburgh, PA",
        views: 4567,
        bookmarked: false,
      },
      {
        id: "13",
        title: "Semiconductor shortage impacts auto manufacturers nationwide",
        imageUrl: "/computer-chips-semiconductors.jpg",
        category: "Technology",
        coverage: 70,
        sources: 167,
        timestamp: "4 hours ago",
        location: "United States",
        views: 5432,
        bookmarked: false,
      },
      {
        id: "14",
        title: "Renewable energy investments reach all-time high globally",
        imageUrl: "/solar-panels-wind-turbines-clean-energy.jpg",
        category: "Energy",
        tag: "Climate",
        coverage: 78,
        sources: 201,
        timestamp: "7 hours ago",
        location: "Global",
        views: 8765,
        bookmarked: false,
      },
    ]
  }

  private generateInitialTimelines(): Timeline[] {
    return [
      {
        id: "1",
        title: "Federal Reserve Interest Rate Decision",
        events: [
          {
            time: "2:00 PM EST",
            description: "Fed announces decision to maintain current interest rates",
            sources: 247,
          },
          { time: "12:30 PM EST", description: "Markets show volatility ahead of Fed announcement", sources: 189 },
          { time: "10:00 AM EST", description: "Economists predict steady rates in latest forecasts", sources: 156 },
          { time: "9:00 AM EST", description: "Pre-market trading shows cautious investor sentiment", sources: 134 },
        ],
      },
      {
        id: "2",
        title: "Tech Earnings Season Update",
        events: [
          { time: "4:30 PM EST", description: "Apple reports record-breaking Q4 revenue", sources: 312 },
          { time: "2:15 PM EST", description: "Microsoft beats earnings expectations with cloud growth", sources: 287 },
          { time: "11:00 AM EST", description: "Alphabet announces AI investment expansion", sources: 245 },
          { time: "Yesterday", description: "Meta reveals increased ad revenue in quarterly report", sources: 198 },
        ],
      },
      {
        id: "3",
        title: "Pennsylvania Infrastructure Development",
        events: [
          { time: "3:00 PM EST", description: "Governor signs $2.5B infrastructure bill into law", sources: 89 },
          { time: "1:00 PM EST", description: "State legislature approves funding for highway repairs", sources: 67 },
          {
            time: "10:30 AM EST",
            description: "Transportation officials outline 5-year improvement plan",
            sources: 52,
          },
          {
            time: "Yesterday",
            description: "Local communities express support for infrastructure investment",
            sources: 43,
          },
        ],
      },
    ]
  }

  private startRealTimeUpdates() {
    // Simulate real-time data updates every 30 seconds
    setInterval(() => {
      this.updateArticleCoverage()
      this.updateDailyIndex()
    }, 30000)
  }

  private updateArticleCoverage() {
    this.articles = this.articles.map((article) => ({
      ...article,
      coverage: Math.min(100, article.coverage + Math.floor(Math.random() * 3)),
      sources: article.sources + Math.floor(Math.random() * 5),
      views: article.views! + Math.floor(Math.random() * 100),
    }))
  }

  private updateDailyIndex() {
    const change = Math.floor(Math.random() * 3) - 1
    this.dailyIndex.score = Math.max(0, Math.min(100, this.dailyIndex.score + change))

    if (this.dailyIndex.score >= 70) {
      this.dailyIndex.sentiment = "Positive"
    } else if (this.dailyIndex.score >= 40) {
      this.dailyIndex.sentiment = "Neutral"
    } else {
      this.dailyIndex.sentiment = "Negative"
    }
  }

  // Public API methods
  getAllArticles(filters?: { category?: string; search?: string }): NewsArticle[] {
    let filtered = [...this.articles]

    if (filters?.category) {
      filtered = filtered.filter((article) => article.category === filters.category)
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.category.toLowerCase().includes(searchLower) ||
          article.location?.toLowerCase().includes(searchLower),
      )
    }

    return filtered
  }

  getArticleById(id: string): NewsArticle | undefined {
    return this.articles.find((article) => article.id === id)
  }

  getTopNews(limit = 6): NewsArticle[] {
    return this.articles.slice(0, limit)
  }

  getPersonalizedFeed(): NewsArticle[] {
    return [this.articles[0], this.articles[1], this.articles[3], this.articles[6], this.articles[7], this.articles[13]]
  }

  getMarketNews(): NewsArticle[] {
    return this.articles.filter((article) =>
      ["Markets", "Economics", "Crypto", "Technology"].includes(article.category),
    )
  }

  getLocalNews(): NewsArticle[] {
    return this.articles.filter((article) => article.category === "Local")
  }

  toggleBookmark(articleId: string): boolean {
    const article = this.articles.find((a) => a.id === articleId)
    if (article) {
      article.bookmarked = !article.bookmarked
      if (article.bookmarked) {
        this.bookmarkedArticles.add(articleId)
      } else {
        this.bookmarkedArticles.delete(articleId)
      }
      return article.bookmarked
    }
    return false
  }

  getBookmarkedArticles(): NewsArticle[] {
    return this.articles.filter((article) => this.bookmarkedArticles.has(article.id))
  }

  markAsViewed(articleId: string): void {
    this.viewedArticles.add(articleId)
    const article = this.articles.find((a) => a.id === articleId)
    if (article && article.views) {
      article.views++
    }
  }

  getTimelines(): Timeline[] {
    return this.timelines
  }

  getDailyIndex(): DailyIndexData {
    return { ...this.dailyIndex }
  }

  getNewsSummary(): NewsSummaryData {
    return { ...this.newsSummary }
  }

  getCategories(): string[] {
    return Array.from(new Set(this.articles.map((a) => a.category)))
  }

  getTrendingArticles(limit = 5): NewsArticle[] {
    return [...this.articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit)
  }

  saveConversation(userId: string, messages: ChatMessage[]): void {
    this.conversations.set(userId, {
      userId,
      messages,
    })
  }

  getConversation(userId: string): ChatMessage[] {
    return this.conversations.get(userId)?.messages || []
  }

  clearConversation(userId: string): void {
    this.conversations.delete(userId)
  }

  getAllConversations(): ConversationHistory[] {
    return Array.from(this.conversations.values())
  }
}

// Singleton instance
export const dataStore = new DataStore()
