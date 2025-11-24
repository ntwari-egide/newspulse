"use client"

import { Bookmark, Search, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dailyIndex, setDailyIndex] = useState({ score: 91, sentiment: "Positive" })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Fetch daily index
    fetch("/api/index")
      .then((res) => res.json())
      .then((data) => setDailyIndex(data))
      .catch(console.error)

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const currentDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTimeStr = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "My Feed" },
    { href: "/markets", label: "Markets" },
    { href: "/local", label: "Local News" },
    { href: "/timelines", label: "Timelines" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-900">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="6" y="9" width="3" height="9" fill="currentColor" rx="1" />
                  <rect x="10.5" y="6" width="3" height="12" fill="currentColor" rx="1" />
                  <rect x="15" y="12" width="3" height="6" fill="currentColor" rx="1" />
                  <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" />
                  <circle cx="12" cy="4.5" r="1.2" fill="currentColor" />
                  <circle cx="16.5" cy="10.5" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold">NewsPulse</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    pathname === item.href ? "font-medium text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  dailyIndex.sentiment === "Positive"
                    ? "bg-positive text-positive-foreground"
                    : dailyIndex.sentiment === "Negative"
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {dailyIndex.score} {dailyIndex.sentiment}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentDate}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{currentTimeStr}</span>
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

        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm transition-colors ${
                    pathname === item.href ? "font-medium text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
