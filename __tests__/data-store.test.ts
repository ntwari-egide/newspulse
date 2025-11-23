import { dataStore } from "@/lib/data-store"

describe("DataStore", () => {
  describe("Article Operations", () => {
    test("should return all articles", () => {
      const articles = dataStore.getAllArticles()
      expect(articles).toBeDefined()
      expect(articles.length).toBeGreaterThan(0)
    })

    test("should filter articles by category", () => {
      const articles = dataStore.getAllArticles({ category: "Technology" })
      expect(articles.every((a) => a.category === "Technology")).toBe(true)
    })

    test("should search articles by title", () => {
      const articles = dataStore.getAllArticles({ search: "Federal" })
      expect(articles.some((a) => a.title.includes("Federal"))).toBe(true)
    })

    test("should get article by id", () => {
      const article = dataStore.getArticleById("1")
      expect(article).toBeDefined()
      expect(article?.id).toBe("1")
    })

    test("should toggle bookmark", () => {
      const articleId = "1"
      const initialState = dataStore.getArticleById(articleId)?.bookmarked
      const newState = dataStore.toggleBookmark(articleId)
      expect(newState).toBe(!initialState)
    })
  })

  describe("Category Operations", () => {
    test("should return available categories", () => {
      const categories = dataStore.getCategories()
      expect(categories).toContain("Technology")
      expect(categories).toContain("Markets")
    })
  })

  describe("Market Data", () => {
    test("should return market news", () => {
      const articles = dataStore.getMarketNews()
      expect(articles.length).toBeGreaterThan(0)
      expect(articles.every((a) => ["Markets", "Economics", "Crypto", "Technology"].includes(a.category))).toBe(true)
    })
  })

  describe("Daily Index", () => {
    test("should return daily index data", () => {
      const index = dataStore.getDailyIndex()
      expect(index.score).toBeGreaterThanOrEqual(0)
      expect(index.score).toBeLessThanOrEqual(100)
      expect(["Positive", "Negative", "Neutral"]).toContain(index.sentiment)
    })
  })
})
