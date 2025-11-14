import { Suspense } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { getLocalNews } from '@/lib/news-data'
import NewsCard from '@/components/news-card'
import { MapPin } from 'lucide-react'

export default function LocalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
                <MapPin className="h-8 w-8" />
                Local News
              </h1>
              <p className="mt-2 text-muted-foreground">News from Pennsylvania and surrounding areas</p>
            </div>
            <Suspense fallback={<NewsSkeleton />}>
              <LocalContent />
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

async function LocalContent() {
  const articles = await getLocalNews()

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
