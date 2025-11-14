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

const allNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Federal Reserve announces interest rate decision amid inflation concerns',
    imageUrl: '/federal-reserve-building.png',
    category: 'Economics',
    tag: 'Breaking News',
    coverage: 89,
    sources: 247,
    featured: true,
    timestamp: '15 minutes ago',
    location: 'Washington DC',
  },
  {
    id: '2',
    title: 'Tech giants report Q4 earnings, market shows mixed reactions',
    imageUrl: '/stock-market-trading-floor.png',
    category: 'Markets',
    tag: 'Earnings',
    coverage: 76,
    sources: 189,
    timestamp: '1 hour ago',
    location: 'New York',
  },
  {
    id: '3',
    title: 'Oil prices surge as OPEC announces production cuts',
    imageUrl: '/oil-refinery-at-sunset.jpg',
    category: 'Energy',
    coverage: 82,
    sources: 156,
    timestamp: '2 hours ago',
    location: 'Global',
  },
  {
    id: '4',
    title: 'Cryptocurrency market rallies on new regulatory framework',
    imageUrl: '/cryptocurrency-bitcoin-golden.jpg',
    category: 'Crypto',
    tag: 'Regulation',
    coverage: 68,
    sources: 134,
    timestamp: '3 hours ago',
    location: 'United States',
  },
  {
    id: '5',
    title: 'Major airline merger approved by regulators',
    imageUrl: '/commercial-airplane-takeoff.jpg',
    category: 'Transportation',
    coverage: 54,
    sources: 98,
    timestamp: '4 hours ago',
    location: 'United States',
  },
  {
    id: '6',
    title: 'Housing market shows signs of recovery in major cities',
    imageUrl: '/modern-city-skyline-residential.jpg',
    category: 'Real Estate',
    coverage: 61,
    sources: 112,
    timestamp: '5 hours ago',
    location: 'United States',
  },
  {
    id: '7',
    title: 'Artificial intelligence startup secures $500M funding round',
    imageUrl: '/ai-technology-startup-office.jpg',
    category: 'Technology',
    tag: 'Funding',
    coverage: 72,
    sources: 145,
    timestamp: '30 minutes ago',
    location: 'San Francisco',
  },
  {
    id: '8',
    title: 'Global supply chain disruptions ease as ports clear backlogs',
    imageUrl: '/cargo-ships-at-port.jpg',
    category: 'Business',
    coverage: 65,
    sources: 128,
    timestamp: '2 hours ago',
    location: 'Global',
  },
  {
    id: '9',
    title: 'Pennsylvania announces new infrastructure investment plan',
    imageUrl: '/pennsylvania-highway-construction.jpg',
    category: 'Local',
    tag: 'Infrastructure',
    coverage: 45,
    sources: 67,
    timestamp: '1 hour ago',
    location: 'Harrisburg, PA',
  },
  {
    id: '10',
    title: 'Bethlehem Steel historic site receives federal grant for preservation',
    imageUrl: '/historic-steel-mill-industrial-site.jpg',
    category: 'Local',
    coverage: 38,
    sources: 52,
    timestamp: '3 hours ago',
    location: 'Bethlehem, PA',
  },
  {
    id: '11',
    title: 'Philadelphia tech sector shows record job growth in Q4',
    imageUrl: '/philadelphia-skyline-modern-office.jpg',
    category: 'Local',
    tag: 'Employment',
    coverage: 41,
    sources: 58,
    timestamp: '5 hours ago',
    location: 'Philadelphia, PA',
  },
  {
    id: '12',
    title: 'New electric vehicle plant opens in Pittsburgh, creates 2,000 jobs',
    imageUrl: '/ev-manufacturing-facility.png',
    category: 'Local',
    coverage: 56,
    sources: 89,
    timestamp: '6 hours ago',
    location: 'Pittsburgh, PA',
  },
  {
    id: '13',
    title: 'Semiconductor shortage impacts auto manufacturers nationwide',
    imageUrl: '/computer-chips-semiconductors.jpg',
    category: 'Technology',
    coverage: 70,
    sources: 167,
    timestamp: '4 hours ago',
    location: 'United States',
  },
  {
    id: '14',
    title: 'Renewable energy investments reach all-time high globally',
    imageUrl: '/solar-panels-wind-turbines-clean-energy.jpg',
    category: 'Energy',
    tag: 'Climate',
    coverage: 78,
    sources: 201,
    timestamp: '7 hours ago',
    location: 'Global',
  },
]

// Simulating Server-Side Rendering with async data fetching
export async function getNewsArticles(): Promise<NewsArticle[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return allNewsArticles.slice(0, 6)
}

export async function getPersonalizedFeed(): Promise<NewsArticle[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return [
    allNewsArticles[0],
    allNewsArticles[1],
    allNewsArticles[3],
    allNewsArticles[6],
    allNewsArticles[7],
    allNewsArticles[13],
  ]
}

export async function getMarketNews(): Promise<NewsArticle[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return allNewsArticles.filter(article => 
    ['Markets', 'Economics', 'Crypto', 'Technology'].includes(article.category)
  )
}

export async function getLocalNews(): Promise<NewsArticle[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return allNewsArticles.filter(article => article.category === 'Local')
}

export async function getTimelines(): Promise<Timeline[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  
  return [
    {
      id: '1',
      title: 'Federal Reserve Interest Rate Decision',
      events: [
        { time: '2:00 PM EST', description: 'Fed announces decision to maintain current interest rates', sources: 247 },
        { time: '12:30 PM EST', description: 'Markets show volatility ahead of Fed announcement', sources: 189 },
        { time: '10:00 AM EST', description: 'Economists predict steady rates in latest forecasts', sources: 156 },
        { time: '9:00 AM EST', description: 'Pre-market trading shows cautious investor sentiment', sources: 134 },
      ],
    },
    {
      id: '2',
      title: 'Tech Earnings Season Update',
      events: [
        { time: '4:30 PM EST', description: 'Apple reports record-breaking Q4 revenue', sources: 312 },
        { time: '2:15 PM EST', description: 'Microsoft beats earnings expectations with cloud growth', sources: 287 },
        { time: '11:00 AM EST', description: 'Alphabet announces AI investment expansion', sources: 245 },
        { time: 'Yesterday', description: 'Meta reveals increased ad revenue in quarterly report', sources: 198 },
      ],
    },
    {
      id: '3',
      title: 'Pennsylvania Infrastructure Development',
      events: [
        { time: '3:00 PM EST', description: 'Governor signs $2.5B infrastructure bill into law', sources: 89 },
        { time: '1:00 PM EST', description: 'State legislature approves funding for highway repairs', sources: 67 },
        { time: '10:30 AM EST', description: 'Transportation officials outline 5-year improvement plan', sources: 52 },
        { time: 'Yesterday', description: 'Local communities express support for infrastructure investment', sources: 43 },
      ],
    },
  ]
}

export async function getDailyIndex() {
  await new Promise((resolve) => setTimeout(resolve, 50))

  return {
    score: 91,
    sentiment: 'Positive' as const,
    percentage: 78,
  }
}

export async function getNewsSummary() {
  await new Promise((resolve) => setTimeout(resolve, 50))

  return {
    items: [
      'Federal Reserve maintains steady interest rates amid economic stability',
      'Tech sector sees strong Q4 earnings across major companies',
      'Energy markets react to OPEC production policy changes',
      'Cryptocurrency adoption increases with new regulatory clarity',
    ],
    timeframe: '24 hours',
  }
}
