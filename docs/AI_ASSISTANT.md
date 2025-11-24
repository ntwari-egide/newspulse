# AI Assistant Implementation Guide

## Overview

The NewsPulse AI Assistant is a fully integrated conversational interface that helps users understand news articles, analyze market trends, and get insights on current events. It uses OpenAI's GPT-4 model with streaming responses for real-time interaction.

## Architecture

### Components

1. **Frontend Chat Interface** (`components/ai-chat-modal.tsx`)
   - Modal dialog with conversation history
   - Real-time streaming message display
   - Suggested questions and prompts
   - Input handling with send/stop controls

2. **API Route** (`app/api/chat/route.ts`)
   - Edge runtime for optimal performance
   - OpenAI API integration with streaming
   - Context-aware system prompts
   - Error handling and rate limiting

3. **Data Store Integration** (`lib/data-store.ts`)
   - Conversation history management
   - News context retrieval
   - User interaction tracking

### Data Flow

\`\`\`
User Input → Chat Modal → API Route → OpenAI API
                                ↓
                         Streaming Response
                                ↓
                          Chat Modal UI
\`\`\`

## Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (format: `sk-...`)
6. Store it securely (it won't be shown again)

### 2. Configure Environment Variables

#### Local Development

\`\`\`bash
# Create .env.local file
cp .env.example .env.local

# Add your API key
echo "OPENAI_API_KEY=sk-your-actual-key-here" >> .env.local
\`\`\`

#### Production Deployment

**AWS ECS:**
\`\`\`json
{
  "containerDefinitions": [
    {
      "environment": [
        {
          "name": "OPENAI_API_KEY",
          "value": "sk-your-actual-key-here"
        }
      ]
    }
  ]
}
\`\`\`

**Kubernetes:**
\`\`\`yaml
apiVersion: v1
kind: Secret
metadata:
  name: newspulse-secrets
type: Opaque
stringData:
  OPENAI_API_KEY: sk-your-actual-key-here
\`\`\`

**Docker:**
\`\`\`bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk-your-actual-key-here \
  newspulse:latest
\`\`\`

### 3. Verify Installation

\`\`\`bash
# Start development server
pnpm dev

# Test the AI assistant
# 1. Open http://localhost:3000
# 2. Click "AI Assistant" in sidebar
# 3. Ask: "What are the top stories today?"
\`\`\`

## Usage Guide

### Opening the Chat

- Click the "AI Assistant" panel in the sidebar
- Click the "Ask a Question" input field
- Click the message icon button

### Asking Questions

**General Queries:**
- "What are the top news stories today?"
- "Summarize the latest market trends"
- "What's happening in the tech sector?"

**Specific Analysis:**
- "Explain the Federal Reserve's decision"
- "Why are oil prices rising?"
- "Impact of the semiconductor shortage"

**Article-Specific:**
- "Tell me more about article #1"
- "What's the significance of this news?"
- "How does this affect the markets?"

### Features

1. **Real-Time Streaming**: Responses appear progressively as they're generated
2. **Context Awareness**: Assistant knows about current articles on the page
3. **Conversation Memory**: Maintains context throughout the chat session
4. **Smart Suggestions**: Pre-built prompts for common questions
5. **Stop Generation**: Cancel long responses mid-stream

## Customization

### Changing the AI Model

Edit `app/api/chat/route.ts`:

\`\`\`typescript
body: JSON.stringify({
  model: "gpt-4-turbo-preview", // Change to gpt-3.5-turbo for faster/cheaper
  messages: messagesWithSystem,
  temperature: 0.7,              // Adjust creativity (0.0 - 1.0)
  max_tokens: 500,               // Adjust response length
})
\`\`\`

### Customizing System Prompt

Edit `app/api/chat/route.ts`:

\`\`\`typescript
const systemPrompt = \`You are an intelligent news assistant for NewsPulse.

Your personality:
- Professional but approachable
- Concise and to-the-point
- Focus on factual information

Your capabilities:
- Analyze news trends
- Explain complex topics
- Provide market insights
- Cite sources when available

Current context:
\${newsContext ? newsContext.map(...).join('\\n') : ''}
\`
\`\`\`

### Adding News Context

The assistant automatically receives context about visible articles. To customize:

\`\`\`typescript
// components/sidebar.tsx
const [newsContext, setNewsContext] = useState<any[]>([])

useEffect(() => {
  // Fetch specific articles to provide as context
  const fetchContext = async () => {
    const articles = await fetch('/api/articles?limit=10')
    const data = await articles.json()
    setNewsContext(data)
  }
  fetchContext()
}, [])
\`\`\`

## API Reference

### POST /api/chat

**Request:**
\`\`\`json
{
  "messages": [
    {
      "role": "user",
      "content": "What are the top stories?"
    }
  ],
  "newsContext": [
    {
      "title": "Federal Reserve announces...",
      "category": "Economics",
      "coverage": 89
    }
  ]
}
\`\`\`

**Response:**
\`\`\`
Stream of text chunks (Server-Sent Events)
\`\`\`

**Error Response:**
\`\`\`json
{
  "error": "AI service is not configured. Please set OPENAI_API_KEY..."
}
\`\`\`

## Performance Optimization

### Edge Runtime

The chat API uses Edge Runtime for:
- Lower latency (runs closer to users)
- Better scalability
- Reduced cold starts

### Streaming Responses

Benefits:
- Faster perceived performance
- Progressive rendering
- Better UX for long responses

### Caching Strategy

\`\`\`typescript
// Future: Add caching for common queries
const cache = new Map<string, string>()

if (cache.has(userQuery)) {
  return cache.get(userQuery)
}
\`\`\`

## Security Best Practices

### 1. API Key Protection

✅ **DO:**
- Store in environment variables
- Use server-side API routes only
- Rotate keys periodically
- Monitor usage in OpenAI dashboard

❌ **DON'T:**
- Commit keys to Git
- Expose keys in client-side code
- Share keys in documentation
- Use personal keys in production

### 2. Rate Limiting

\`\`\`typescript
// Add rate limiting middleware
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
})

// Check before processing
const { success } = await ratelimit.limit(userId)
if (!success) {
  return new Response("Rate limit exceeded", { status: 429 })
}
\`\`\`

### 3. Input Sanitization

\`\`\`typescript
// Validate and sanitize inputs
const MAX_MESSAGE_LENGTH = 500
const sanitizedContent = input.slice(0, MAX_MESSAGE_LENGTH).trim()
\`\`\`

## Troubleshooting

### "AI service is not configured"

**Cause:** OPENAI_API_KEY not set
**Solution:** Add environment variable to deployment platform

### Slow Responses

**Cause:** Using GPT-4 model
**Solution:** Switch to \`gpt-3.5-turbo\` for faster responses

### Rate Limit Errors

**Cause:** Too many requests to OpenAI API
**Solution:** 
- Upgrade OpenAI plan
- Implement caching
- Add request queuing

### Stream Not Working

**Cause:** Edge runtime or API route configuration
**Solution:** Ensure \`export const runtime = "edge"\` in route.ts

## Cost Management

### OpenAI Pricing (as of 2024)

- **GPT-4 Turbo**: $0.01/1K input tokens, $0.03/1K output tokens
- **GPT-3.5 Turbo**: $0.0015/1K input tokens, $0.002/1K output tokens

### Optimization Tips

1. **Use GPT-3.5** for simple queries
2. **Limit max_tokens** to control response length
3. **Cache common responses**
4. **Implement rate limiting** per user
5. **Monitor usage** in OpenAI dashboard

### Example Cost Calculation

For 1,000 users with 10 messages each:
- Messages: 10,000
- Avg tokens per message: 200
- Model: GPT-3.5 Turbo
- Cost: ~$4-6/month

## Future Enhancements

- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Article recommendations
- [ ] Sentiment analysis integration
- [ ] Export conversation history
- [ ] Custom AI personas
- [ ] Integration with news APIs for real-time data

## Support

For issues or questions:
1. Check OpenAI API status
2. Verify environment variables
3. Review server logs
4. Open GitHub issue with details

---

**Last Updated:** January 2025
**Maintained by:** Ègide Ntwari
