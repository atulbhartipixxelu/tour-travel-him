import type { ChatImage } from '../types'
import type { ChatMessage } from '../types'

export interface PlacesSearchResult {
  content: string
  formatted: string
  images: ChatImage[]
  places: Array<{
    name: string
    address: string
    rating?: number
    googleMapsUrl?: string
  }>
  placeName: string | null
  source?: 'google' | 'free'
}

export async function fetchPlaceReply(
  message: string,
  history: ChatMessage[] = [],
): Promise<PlacesSearchResult | null> {
  try {
    const historyTexts = history
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(-8)
      .map(m => m.content)

    const res = await fetch('/api/places/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: historyTexts }),
    })

    const data = await res.json()
    if (!res.ok || !data.content) return null

    return {
      ...data,
      content: data.content ?? data.formatted,
      images: data.images ?? [],
    } as PlacesSearchResult
  } catch {
    return null
  }
}

/** @deprecated use fetchPlaceReply */
export const fetchGooglePlacesReply = fetchPlaceReply
