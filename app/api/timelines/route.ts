import { NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET() {
  try {
    const timelines = dataStore.getTimelines()
    return NextResponse.json({ timelines })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch timelines" }, { status: 500 })
  }
}
