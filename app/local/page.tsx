import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import NewsGrid from "@/components/news-grid"
import { MapPin } from "lucide-react"

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
            <NewsGrid type="local" limit={8} />
          </div>
          <aside className="space-y-6">
            <Sidebar />
          </aside>
        </div>
      </main>
    </div>
  )
}
