import { NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET() {
  try {
    const summary = dataStore.getNewsSummary()
    return NextResponse.json(summary)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
  }
}
