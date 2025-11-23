export interface NewsArticle {
  id: string
  title: string
  imageUrl: string
  category: string
  tag?: string
  coverage: number
  sources: number
  featured?: boolean
  timestamp: string
  location: string
  views?: number
  bookmarked?: boolean
}

export interface Timeline {
  id: string
  title: string
  events: TimelineEvent[]
}

export interface TimelineEvent {
  time: string
  description: string
  sources: number
}
