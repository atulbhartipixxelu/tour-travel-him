import { himachalDestinations } from '../src/data/himachalDestinations'
import { placeKnowledge } from '../src/data/himachalKnowledge'
import {
  matchDestination,
  detectAllTopics,
  extractPlaceFromMessage,
  topicLabel,
} from '../src/utils/queryParser'
import type { HimachalTopic } from '../src/data/himachalKnowledge'

export interface FreeChatImage {
  src: string
  alt: string
  caption?: string
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export function extractPlaceFromText(...texts: string[]): string | null {
  const combined = texts.filter(Boolean).join(' ')
  const dest = matchDestination(combined)
  if (dest) return dest.name
  return extractPlaceFromMessage(combined)
}

export function isPhotoRequest(text: string): boolean {
  return /photo|picture|pic|image|tasvir|tasveer|screenshot|dikha|dikhao|share.*(photo|pic|image)|send.*(photo|pic)/i.test(text)
}

export function getLocalImages(placeName: string, limit = 4): FreeChatImage[] {
  const dest = himachalDestinations.find(d => d.name === placeName)
  if (!dest) return []

  const images: FreeChatImage[] = [
    { src: dest.image, alt: placeName, caption: `${placeName} · ${dest.highlight ?? 'Himachal'}` },
  ]

  const related = himachalDestinations
    .filter(d => d.region === dest.region && d.name !== placeName)
    .slice(0, limit - 1)

  for (const r of related) {
    images.push({ src: r.image, alt: r.name, caption: `${r.name} · ${r.region}` })
  }

  if (images.length < limit) {
    const extras = himachalDestinations
      .filter(d => d.name !== placeName && !images.some(i => i.alt === d.name))
      .slice(0, limit - images.length)
    for (const e of extras) {
      images.push({ src: e.image, alt: e.name, caption: e.name })
    }
  }

  return images.slice(0, limit)
}

export async function fetchWikimediaImages(search: string, limit = 2): Promise<FreeChatImage[]> {
  try {
    const url = new URL('https://commons.wikimedia.org/w/api.php')
    url.searchParams.set('action', 'query')
    url.searchParams.set('format', 'json')
    url.searchParams.set('origin', '*')
    url.searchParams.set('generator', 'search')
    url.searchParams.set('gsrsearch', `${search} Himachal Pradesh`)
    url.searchParams.set('gsrlimit', String(limit))
    url.searchParams.set('gsrnamespace', '6')
    url.searchParams.set('prop', 'imageinfo')
    url.searchParams.set('iiprop', 'url')
    url.searchParams.set('iiurlwidth', '600')

    const res = await fetch(url.toString(), {
      headers: { 'User-Agent': 'WanderHive/1.0 (https://wanderhive.com; travel-bot)' },
    })
    const data = (await res.json()) as {
      query?: { pages?: Record<string, { title?: string; imageinfo?: Array<{ thumburl?: string; url?: string }> }> }
    }

    const pages = data.query?.pages ?? {}
    const images: FreeChatImage[] = []

    for (const page of Object.values(pages)) {
      const src = page.imageinfo?.[0]?.thumburl ?? page.imageinfo?.[0]?.url
      if (!src) continue
      const title = (page.title ?? 'Himachal').replace(/^File:/, '').replace(/\.[^.]+$/, '').replace(/_/g, ' ')
      images.push({ src, alt: title, caption: title.slice(0, 40) })
    }

    return images.slice(0, limit)
  } catch {
    return []
  }
}

function buildPlaceAnswer(placeName: string, userMessage: string): string {
  const dest = himachalDestinations.find(d => d.name === placeName)
  const knowledge = placeKnowledge[placeName]
  const topics = detectAllTopics(userMessage)
  const sections: string[] = [`📍 ${placeName} — Himachal Pradesh\n`]

  if (knowledge?.overview) {
    sections.push(`🌄 Overview\n${knowledge.overview}`)
  } else if (dest) {
    sections.push(
      `🌄 Overview\n${dest.highlight} · ${dest.region} · ⭐ ${dest.rating} · ${dest.weather} · Best: ${dest.bestTime} · from ${formatInr(dest.price)}/trip`,
    )
  }

  const keys: (keyof typeof knowledge)[] = [
    'hotel', 'camping', 'sightseeing', 'food', 'trek', 'temple',
    'adventure', 'reach', 'weather', 'budget',
  ]

  const include = topics.length > 0 ? keys.filter(k => topics.includes(k as HimachalTopic)) : []

  for (const key of include) {
    const val = knowledge?.[key]
    if (val) sections.push(`\n${topicLabel(key as HimachalTopic)}\n${val}`)
  }

  if (isPhotoRequest(userMessage)) {
    sections.push('\n📸 Neeche is area ki photos attached hain — WanderHive se explore karein!')
  }

  sections.push('\n— WanderHive.com · No API key needed')
  return sections.join('\n')
}

export async function buildFreePlaceReply(
  message: string,
  historyTexts: string[] = [],
): Promise<{ content: string; images: FreeChatImage[]; placeName: string | null }> {
  const placeName = extractPlaceFromText(message, ...historyTexts)

  if (placeName) {
    const wikiImages = await fetchWikimediaImages(placeName, 4)
    const localImages = getLocalImages(placeName, 4)

    const seen = new Set<string>()
    const images = [...wikiImages, ...localImages].filter(img => {
      if (seen.has(img.src)) return false
      seen.add(img.src)
      return true
    }).slice(0, 4)

    // If Wikimedia has area photos, prefer those over generic local stock
    const finalImages = wikiImages.length >= 2 ? wikiImages.slice(0, 4) : images

    let content = buildPlaceAnswer(placeName, message)

    if (isPhotoRequest(message) && finalImages.length > 0) {
      content = `Haan bilkul! 📸 ${placeName} ki photos neeche hain.\n\n${content}`
    }

    return { content, images: finalImages, placeName }
  }

  if (isPhotoRequest(message)) {
    const samplePlaces = ['Manali', 'Spiti Valley', 'Kasol', 'Dharamshala']
    const images = samplePlaces.flatMap(p => getLocalImages(p, 1)).slice(0, 4)
    return {
      content:
        'Zaroor! 📸 Neeche Himachal ke kuch best destinations ki photos hain.\n\nKisi specific jagah ki photo chahiye to naam likhein — jaise "Kasol photos", "Manali camping pics", "Palampur tea gardens".',
      images,
      placeName: null,
    }
  }

  return {
    content:
      'Himachal ka koi place naam likhein — jaise Kasol, Manali, Palampur, Spiti.\n\nMain detail + photos dono dunga! Example: "Kasol camping and hotels with photos"',
    images: getLocalImages('Manali', 2).concat(getLocalImages('Kasol', 2)).slice(0, 4),
    placeName: null,
  }
}
