import { getNewsArticles } from '@/lib/news-data'
import NewsCard from '@/components/news-card'

export default async function NewsGrid() {
  const articles = await getNewsArticles()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
