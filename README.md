# NewsPulse - Real-Time Media Dashboard

A full-stack, production-ready news aggregation platform built with Next.js 16, featuring real-time updates, server-side rendering, and responsive design. Designed to deliver live financial news to thousands of concurrent users.

![NewsPulse Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- **Real-Time Updates**: Live news streaming with automatic content refresh every 30 seconds
- **Server-Side Rendering**: Optimized SSR for fast initial page loads and SEO
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts
- **Dark Mode**: Built-in dark theme optimized for readability
- **API Architecture**: RESTful API endpoints for all data operations
- **In-Memory Data Store**: High-performance caching layer with automatic updates
- **Interactive UI**: Dynamic bookmarking, view tracking, and personalized feeds
- **Market Data**: Live financial indices with real-time price updates
- **Timeline Tracking**: Follow breaking news stories as they develop
- **AI Assistant**: Integrated news summary and analysis tools

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router and Server Components
- **React 19.2** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with custom design tokens
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - RESTful endpoints
- **In-Memory Data Store** - High-performance singleton pattern
- **Real-Time Polling** - 30-second update intervals for live data

### DevOps & Infrastructure
- **Docker** - Containerization for consistent deployments
- **Docker Compose** - Multi-container orchestration
- **AWS ECS** - Production container hosting with auto-scaling
- **Kubernetes** - Alternative deployment with HPA
- **GitHub Actions** - CI/CD pipeline automation

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm 8.0 or higher (recommended) or npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/ntwari-egide/newspulse.git
cd newspulse
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
# or
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run the development server:
\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
newspulse/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API route handlers
│   │   ├── articles/       # Article CRUD operations
│   │   ├── categories/     # Category listings
│   │   ├── index/          # Daily sentiment index
│   │   ├── summary/        # News summaries
│   │   └── timelines/      # Timeline events
│   ├── feed/               # Personalized feed page
│   ├── local/              # Local news page
│   ├── markets/            # Financial markets page
│   ├── timelines/          # Story timelines page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── ui/                 # Reusable UI primitives
│   ├── header.tsx          # Navigation header
│   ├── news-card.tsx       # Article card component
│   ├── news-grid.tsx       # Grid layout for articles
│   └── sidebar.tsx         # AI Assistant sidebar
├── lib/                     # Utilities and data
│   ├── data-store.ts       # In-memory data management
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
├── aws/                     # AWS deployment configs
│   ├── ecs-task-definition.json
│   └── auto-scaling-policy.yml
├── kubernetes/              # K8s deployment manifests
│   └── deployment.yaml
├── .github/                 # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml
├── Dockerfile               # Container image definition
├── docker-compose.yml       # Local container orchestration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## API Endpoints

### Articles
- `GET /api/articles` - Fetch articles with optional filters
  - Query params: `type`, `category`, `search`, `limit`
  - Types: `top`, `personalized`, `market`, `local`, `trending`, `bookmarked`
- `GET /api/articles/[id]` - Get single article
- `POST /api/articles/[id]` - Update article (bookmark, view tracking)

### Data
- `GET /api/index` - Daily sentiment index
- `GET /api/summary` - AI-generated news summary
- `GET /api/timelines` - Story development timelines
- `GET /api/categories` - Available news categories

## Docker Deployment

### Build and Run Locally

\`\`\`bash
# Build Docker image
docker build -t newspulse:latest .

# Run container
docker run -p 3000:3000 newspulse:latest

# Or use Docker Compose
docker-compose up -d
\`\`\`

### Production Deployment

The application includes production-ready configurations for:

1. **AWS ECS** - See `aws/ecs-task-definition.json`
2. **Kubernetes** - See `kubernetes/deployment.yaml`
3. **CI/CD** - See `.github/workflows/deploy.yml`

## Performance Optimizations

- **Server Components**: Reduces client-side JavaScript bundle
- **Streaming SSR**: Progressive page rendering for faster TTFB
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching Strategy**: In-memory data store with 30s refresh intervals
- **CSS Grid**: Hardware-accelerated layouts

## Development

### Code Quality

\`\`\`bash
# Run linter
pnpm lint

# Type checking
pnpm type-check

# Format code
pnpm format
\`\`\`

### Building for Production

\`\`\`bash
# Create optimized production build
pnpm build

# Start production server
pnpm start
\`\`\`

## Architecture Decisions

### Why In-Memory Data Store?
- **Performance**: Sub-millisecond response times
- **Simplicity**: No external database dependencies for demo
- **Real-Time**: Easy to implement live updates
- **Scalability**: Can be replaced with Redis/PostgreSQL in production

### Why Server Components?
- **Performance**: Reduced client-side JavaScript
- **SEO**: Better search engine indexing
- **UX**: Faster initial page loads

### Why API Routes?
- **Separation of Concerns**: Clear backend/frontend boundaries
- **Flexibility**: Easy to swap data sources
- **Testing**: Isolated endpoint testing

## Scaling Considerations

The application is designed to handle 1,000+ concurrent users:

1. **Horizontal Scaling**: Docker containers behind load balancer
2. **Auto-Scaling**: AWS ECS/K8s HPA based on CPU/memory
3. **CDN**: Static assets served via CDN
4. **Database**: Replace in-memory store with PostgreSQL + Redis cache
5. **Message Queue**: Add RabbitMQ for background processing

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details

## Author

**Ègide Ntwari**
- GitHub: [@ntwari-egide](https://github.com/ntwari-egide)
- Location: Bethlehem, PA

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

Built with ❤️ using Next.js 16 and React 19
