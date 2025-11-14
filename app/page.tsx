import { Suspense } from 'react'
import Header from '@/components/header'
import NewsGrid from '@/components/news-grid'
import Sidebar from '@/components/sidebar'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Top News</h1>
            <Suspense fallback={<NewsGridSkeleton />}>
              <NewsGrid />
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

function NewsGridSkeleton() {
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
