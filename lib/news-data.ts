// This file is kept for backward compatibility but should not be used in new code

import { dataStore } from "./data-store"

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

// Legacy functions - use API routes instead
export async function getNewsArticles() {
  return dataStore.getTopNews(6)
}

export async function getPersonalizedFeed() {
  return dataStore.getPersonalizedFeed()
}

export async function getMarketNews() {
  return dataStore.getMarketNews()
}

export async function getLocalNews() {
  return dataStore.getLocalNews()
}

export async function getTimelines() {
  return dataStore.getTimelines()
}

export async function getDailyIndex() {
  return dataStore.getDailyIndex()
}

export async function getNewsSummary() {
  return dataStore.getNewsSummary()
}
