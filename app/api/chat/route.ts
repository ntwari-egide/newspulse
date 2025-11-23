export const runtime = "edge"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export async function POST(req: Request) {
  try {
    const { messages, newsContext } = await req.json()

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "AI service is not configured. Please set OPENAI_API_KEY in your environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      )
    }

    const contextString =
      newsContext && Array.isArray(newsContext) && newsContext.length > 0
        ? `Current news context:
${newsContext.map((article: any) => `- ${article.title} (${article.category}, ${article.coverage}% coverage)`).join("\n")}`
        : ""

    const systemPrompt = `You are an intelligent news assistant for NewsPulse, a real-time financial and news media dashboard. 
You help users understand news articles, provide context, analyze trends, and answer questions about current events.

${contextString}

Keep responses concise, informative, and focused on news analysis. Cite sources when appropriate.`

    const messagesWithSystem: Message[] = [{ role: "system", content: systemPrompt }, ...messages]

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: messagesWithSystem,
        temperature: 0.7,
        stream: true,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("OpenAI API error:", error)
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
