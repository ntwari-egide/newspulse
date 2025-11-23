import { NextResponse } from "next/server"
import { dataStore } from "@/lib/data-store"

export async function GET() {
  try {
    const dailyIndex = dataStore.getDailyIndex()
    return NextResponse.json(dailyIndex)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch daily index" }, { status: 500 })
  }
}
