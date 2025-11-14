import { Suspense } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { getMarketNews } from '@/lib/news-data'
import NewsCard from '@/components/news-card'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Markets</h1>
              <p className="mt-2 text-muted-foreground">Financial markets and trading news</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MarketIndexCard name="S&P 500" value="4,783.45" change="+1.2%" positive />
              <MarketIndexCard name="NASDAQ" value="15,361.64" change="+2.1%" positive />
              <MarketIndexCard name="DOW" value="37,695.73" change="-0.3%" positive={false} />
              <MarketIndexCard name="RUSSELL" value="2,089.54" change="+0.8%" positive />
            </div>

            <Suspense fallback={<NewsSkeleton />}>
              <MarketsContent />
            </Suspense>
          </div>
          <aside className="space-y-6">
            <Suspense fallback={<SidebarSkeleton />}>
              <Sidebar />
            </Suspense>
          </aside>
        </div>
      </main>
    </div>
  )
}

function MarketIndexCard({ name, value, change, positive }: { name: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-sm text-muted-foreground">{name}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
      <div className={`mt-1 flex items-center gap-1 text-sm font-semibold ${positive ? 'text-positive' : 'text-negative'}`}>
        {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        {change}
      </div>
    </div>
  )
}

async function MarketsContent() {
  const articles = await getMarketNews()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-64 w-full rounded-lg" />
      ))}
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  )
}
