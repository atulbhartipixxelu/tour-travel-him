import type { IncomingMessage, ServerResponse } from 'node:http'
import type { HimachalTopic } from '../src/data/himachalKnowledge'
import { buildGoogleSearchQueryFromContext, topicLabel } from '../src/utils/queryParser'

export interface GooglePlaceResult {
  name: string
  address: string
  rating?: number
  ratingsTotal?: number
  types: string[]
  lat: number
  lng: number
  openNow?: boolean
  googleMapsUrl: string
  placeId?: string
  photoRef?: string
  imageUrl?: string
}

export interface GoogleChatImage {
  src: string
  alt: string
  caption?: string
}

interface GoogleTextSearchResponse {
  status: string
  results?: Array<{
    name: string
    formatted_address: string
    rating?: number
    user_ratings_total?: number
    types?: string[]
    geometry?: { location?: { lat: number; lng: number } }
    opening_hours?: { open_now?: boolean }
    place_id?: string
    photos?: Array<{ photo_reference: string }>
  }>
  error_message?: string
}

export function photoProxyUrl(photoRef: string, maxwidth = 600): string {
  return `/api/places/photo?ref=${encodeURIComponent(photoRef)}&maxwidth=${maxwidth}`
}

export function placesToImages(places: GooglePlaceResult[]): GoogleChatImage[] {
  const images: GoogleChatImage[] = []
  const seen = new Set<string>()

  for (const p of places) {
    if (!p.imageUrl || seen.has(p.imageUrl)) continue
    seen.add(p.imageUrl)
    images.push({
      src: p.imageUrl,
      alt: p.name,
      caption: p.rating ? `${p.name} · ⭐ ${p.rating} · Google Maps` : `${p.name} · Google Maps`,
    })
    if (images.length >= 6) break
  }

  return images
}

interface PlaceDetailsResult {
  name?: string
  editorial_summary?: { overview?: string }
  formatted_address?: string
  formatted_phone_number?: string
  website?: string
  rating?: number
  user_ratings_total?: number
  opening_hours?: { weekday_text?: string[]; open_now?: boolean }
  reviews?: Array<{ text: string; rating: number; author_name: string }>
  photos?: Array<{ photo_reference: string }>
  url?: string
}

async function fetchPlaceDetails(placeId: string, apiKey: string): Promise<PlaceDetailsResult | null> {
  try {
    const detailUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    detailUrl.searchParams.set('place_id', placeId)
    detailUrl.searchParams.set(
      'fields',
      'name,editorial_summary,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,reviews,photos,url',
    )
    detailUrl.searchParams.set('key', apiKey)

    const res = await fetch(detailUrl.toString())
    const data = (await res.json()) as { status?: string; result?: PlaceDetailsResult }
    if (data.status !== 'OK' || !data.result) return null
    return data.result
  } catch {
    return null
  }
}

async function buildGoogleImagesFromDetails(
  places: GooglePlaceResult[],
  apiKey: string,
): Promise<GoogleChatImage[]> {
  const images: GoogleChatImage[] = []
  const seen = new Set<string>()

  for (const place of places.slice(0, 4)) {
    if (!place.placeId) {
      if (place.imageUrl && !seen.has(place.imageUrl)) {
        seen.add(place.imageUrl)
        images.push({
          src: place.imageUrl,
          alt: place.name,
          caption: `${place.name} · Google Maps`,
        })
      }
      continue
    }

    const details = await fetchPlaceDetails(place.placeId, apiKey)
    const refs =
      details?.photos?.map(p => p.photo_reference) ??
      (place.photoRef ? [place.photoRef] : [])

    for (const ref of refs.slice(0, 2)) {
      const src = photoProxyUrl(ref, 800)
      if (seen.has(src)) continue
      seen.add(src)
      images.push({
        src,
        alt: details?.name ?? place.name,
        caption: `${details?.name ?? place.name} · Google Maps${place.rating ? ` · ⭐ ${place.rating}` : ''}`,
      })
      if (images.length >= 6) break
    }
    if (images.length >= 6) break
  }

  return images
}

export function buildGoogleAnswer(
  places: GooglePlaceResult[],
  placeName: string | null,
  topic: HimachalTopic | null,
  detailsMap: Map<string, PlaceDetailsResult> = new Map(),
): { content: string; images: GoogleChatImage[] } {
  const images = placesToImages(places)

  if (places.length === 0) {
    return {
      content: placeName
        ? `Google par "${placeName}" ke liye abhi result nahi mila. Spelling check karein — jaise "hotels in ${placeName}".`
        : 'Google par result nahi mila. Himachal ka place naam likhein — Manali, Dharamshala, Palampur, Kasol…',
      images: [],
    }
  }

  const header = placeName
    ? `📍 ${placeName}${topic ? ` — ${topicLabel(topic)}` : ''} · Google Maps Live`
    : `📍 Himachal Pradesh · Google Maps Live`

  const overview = placeName ? detailsMap.get(places[0]?.placeId ?? '')?.editorial_summary?.overview : null
  const sections: string[] = [header]

  if (overview) {
    sections.push(`\n📝 About\n${overview}`)
  }

  const blocks = places.slice(0, 4).map((p, i) => {
    const d = p.placeId ? detailsMap.get(p.placeId) : undefined
    let block = `${i + 1}. ${p.name}`
    const rating = d?.rating ?? p.rating
    const reviews = d?.user_ratings_total ?? p.ratingsTotal
    if (rating) block += `\n   ⭐ ${rating}/5`
    if (reviews) block += ` · ${reviews} Google reviews`
    block += `\n   📌 ${d?.formatted_address ?? p.address}`
    if (d?.formatted_phone_number) block += `\n   📞 ${d.formatted_phone_number}`
    if (d?.website) block += `\n   🌐 ${d.website}`
    const openNow = d?.opening_hours?.open_now ?? p.openNow
    if (openNow !== undefined) block += `\n   ${openNow ? '🟢 Open now' : '🔴 Closed now'}`
    const topReview = d?.reviews?.[0]
    if (topReview?.text) {
      const snippet = topReview.text.slice(0, 140).trim()
      block += `\n   💬 "${snippet}${topReview.text.length > 140 ? '…' : ''}" — ${topReview.author_name}`
    }
    block += `\n   🗺️ ${d?.url ?? p.googleMapsUrl}`
    return block
  })

  sections.push('\n' + blocks.join('\n\n'))
  sections.push(`\n📸 Neeche ${images.length > 0 ? 'Google Maps ki real photos' : 'area ki info'} slider mein hain.`)
  sections.push('\n— Live data · Google Maps · WanderHive.com')

  return { content: sections.join('\n'), images }
}

export async function searchGooglePlaces(query: string, apiKey: string): Promise<GooglePlaceResult[]> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
  url.searchParams.set('query', query)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('region', 'in')

  const res = await fetch(url.toString())
  const data = (await res.json()) as GoogleTextSearchResponse

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new Error(data.error_message ?? data.status)
  }

  return (data.results ?? []).slice(0, 5).map(place => {
    const photoRef = place.photos?.[0]?.photo_reference
    return {
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      ratingsTotal: place.user_ratings_total,
      types: place.types ?? [],
      lat: place.geometry?.location?.lat ?? 0,
      lng: place.geometry?.location?.lng ?? 0,
      openNow: place.opening_hours?.open_now,
      placeId: place.place_id,
      photoRef,
      imageUrl: photoRef ? photoProxyUrl(photoRef) : undefined,
      googleMapsUrl: place.place_id
        ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.formatted_address)}`,
    }
  })
}

/** Fetch extra photo if place has no photo in text search */
export async function enrichPlacePhotos(places: GooglePlaceResult[], apiKey: string): Promise<GooglePlaceResult[]> {
  const enriched = [...places]
  for (let i = 0; i < Math.min(enriched.length, 4); i++) {
    const p = enriched[i]
    if (p.imageUrl || !p.placeId) continue
    try {
      const detailUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
      detailUrl.searchParams.set('place_id', p.placeId)
      detailUrl.searchParams.set('fields', 'photos')
      detailUrl.searchParams.set('key', apiKey)
      const res = await fetch(detailUrl.toString())
      const data = (await res.json()) as {
        result?: { photos?: Array<{ photo_reference: string }> }
      }
      const ref = data.result?.photos?.[0]?.photo_reference
      if (ref) {
        enriched[i] = { ...p, photoRef: ref, imageUrl: photoProxyUrl(ref) }
      }
    } catch {
      /* skip */
    }
  }
  return enriched
}

export async function googleSearchForChat(
  message: string,
  apiKey: string,
  historyTexts: string[] = [],
) {
  const { query, placeName, topic } = buildGoogleSearchQueryFromContext(message, historyTexts)
  let places = await searchGooglePlaces(query, apiKey)
  places = await enrichPlacePhotos(places, apiKey)

  const detailsMap = new Map<string, PlaceDetailsResult>()
  await Promise.all(
    places.slice(0, 3).map(async p => {
      if (!p.placeId) return
      const details = await fetchPlaceDetails(p.placeId, apiKey)
      if (details) detailsMap.set(p.placeId, details)
    }),
  )

  const answer = buildGoogleAnswer(places, placeName, topic, detailsMap)
  const richImages = await buildGoogleImagesFromDetails(places, apiKey)
  const images = richImages.length > 0 ? richImages : answer.images

  return { ...answer, images, places, query, placeName, topic }
}

export async function handlePlacePhoto(req: IncomingMessage, res: ServerResponse) {
  const cors = { 'Access-Control-Allow-Origin': '*' }

  try {
    const host = req.headers.host ?? 'localhost'
    const url = new URL(req.url ?? '/', `http://${host}`)
    const ref = url.searchParams.get('ref')
    const maxwidth = url.searchParams.get('maxwidth') ?? '600'
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    if (!ref || !apiKey) {
      res.writeHead(400, cors)
      res.end('Bad request')
      return
    }

    const photoUrl = new URL('https://maps.googleapis.com/maps/api/place/photo')
    photoUrl.searchParams.set('maxwidth', maxwidth)
    photoUrl.searchParams.set('photo_reference', ref)
    photoUrl.searchParams.set('key', apiKey)

    const response = await fetch(photoUrl.toString(), { redirect: 'follow' })
    if (!response.ok) {
      res.writeHead(response.status, cors)
      res.end('Photo unavailable')
      return
    }

    const contentType = response.headers.get('content-type') ?? 'image/jpeg'
    const buffer = Buffer.from(await response.arrayBuffer())

    res.writeHead(200, {
      ...cors,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=604800',
    })
    res.end(buffer)
  } catch {
    res.writeHead(500, cors)
    res.end('Error')
  }
}

export async function handlePlacesSearch(req: IncomingMessage, res: ServerResponse) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors)
    res.end()
    return
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.writeHead(405, { ...cors, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    let message = ''
    let historyTexts: string[] = []

    if (req.method === 'POST') {
      const body = JSON.parse(await readPlacesBody(req)) as { message?: string; history?: string[] }
      message = body.message?.trim() ?? ''
      historyTexts = body.history ?? []
    } else {
      const host = req.headers.host ?? 'localhost'
      const url = new URL(req.url ?? '/', `http://${host}`)
      message = url.searchParams.get('message')?.trim() ?? ''
      const historyRaw = url.searchParams.get('history') ?? ''
      historyTexts = historyRaw ? historyRaw.split('|||').filter(Boolean) : []
    }

    if (!message) {
      res.writeHead(400, { ...cors, 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'message required' }))
      return
    }

    const { buildSmartReply } = await import('./smartReply')
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    let googleBundle = null

    if (apiKey && !/^no+api/i.test(apiKey)) {
      try {
        const result = await googleSearchForChat(message, apiKey, historyTexts)
        if (result.places.length > 0) {
          googleBundle = {
            places: result.places,
            placeName: result.placeName,
            images: result.images,
          }
        }
      } catch {
        /* fall through */
      }
    }

    const smart = await buildSmartReply(message, historyTexts, googleBundle)

    res.writeHead(200, { ...cors, 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        content: smart.content,
        formatted: smart.content,
        images: smart.images,
        places: googleBundle?.places ?? [],
        placeName: smart.placeName,
        topic: null,
        query: message,
        source: smart.source,
      }),
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Search failed'
    res.writeHead(500, { ...cors, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: msg, fallback: true }))
  }
}

function readPlacesBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

/** @deprecated use buildGoogleAnswer */
export function formatPlacesReply(
  places: GooglePlaceResult[],
  placeName: string | null,
  topic: HimachalTopic | null,
  _searchQuery: string,
): string {
  return buildGoogleAnswer(places, placeName, topic).content
}
