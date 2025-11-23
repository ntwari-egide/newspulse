import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const article = dataStore.getArticleById(params.id)

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 })
  }

  return NextResponse.json({ article })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { action } = await request.json()

  if (action === "bookmark") {
    const bookmarked = dataStore.toggleBookmark(params.id)
    return NextResponse.json({ bookmarked })
  }

  if (action === "view") {
    dataStore.markAsViewed(params.id)
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}
