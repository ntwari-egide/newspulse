import { Bookmark, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-primary-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">NewsPulse</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <Link href="/" className="font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/feed" className="text-muted-foreground hover:text-primary transition-colors">
                My Feed
              </Link>
              <Link href="/markets" className="text-muted-foreground hover:text-primary transition-colors">
                Markets
              </Link>
              <Link href="/local" className="text-muted-foreground hover:text-primary transition-colors">
                Local News
              </Link>
              <Link href="/timelines" className="text-muted-foreground hover:text-primary transition-colors">
                Timelines
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-positive px-2.5 py-1 text-xs font-semibold text-positive-foreground">
                91 Positive
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentDate}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button className="hidden lg:inline-flex">Try for free</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
