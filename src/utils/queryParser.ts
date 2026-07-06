import { himachalDestinations } from '../data/himachalDestinations'
import type { HimachalTopic } from '../data/himachalKnowledge'

export const ALIASES: Record<string, string> = {
  spiti: 'Spiti Valley',
  lhasa: 'McLeod Ganj',
  'little lhasa': 'McLeod Ganj',
  mcleod: 'McLeod Ganj',
  parvati: 'Kasol',
  dharamsala: 'Dharamshala',
  dharamshala: 'Dharamshala',
  rohtang: 'Rohtang Pass',
  solang: 'Solang Valley',
  khajjiar: 'Khajjiar',
  bir: 'Bir Billing',
  billing: 'Bir Billing',
  kullu: 'Kullu',
  manali: 'Manali',
  shimla: 'Shimla',
  kasol: 'Kasol',
  kalpa: 'Kalpa',
  sangla: 'Sangla Valley',
  chitkul: 'Sangla Valley',
  tirthan: 'Tirthan Valley',
  jibhi: 'Shoja',
  barot: 'Barot Valley',
  prashar: 'Prashar Lake',
  kheerganga: 'Kasol',
  triund: 'McLeod Ganj',
  kaza: 'Spiti Valley',
  chandratal: 'Spiti Valley',
  mandi: 'Mandi',
  palampur: 'Palampur',
  dalhousie: 'Dalhousie',
  chamba: 'Chamba',
  kufri: 'Kufri',
  narkanda: 'Narkanda',
  chail: 'Chail',
  kinnaur: 'Kinnaur',
  rewalsar: 'Rewalsar',
  shoja: 'Shoja',
}

const TOPIC_RULES: { topic: HimachalTopic; patterns: RegExp[] }[] = [
  { topic: 'camping', patterns: [/camp(ing| site|ground|s)?/, /tent/, /campsite/, /where.*camp/, /camping area/] },
  { topic: 'hotel', patterns: [/hotel/, /stay/, /homestay/, /hostel/, /accommodation/, /lodge/, /room/, /where.*(stay|sleep)/] },
  { topic: 'trek', patterns: [/trek/, /hik(e|ing)/, /trail/] },
  { topic: 'food', patterns: [/food/, /eat/, /restaurant/, /cuisine/, /momos?/, /dhaba/, /what to eat/] },
  { topic: 'temple', patterns: [/temple/, /monastery/, /gompa/, /church/, /gurudwara/, /mandir/, /dalai lama/] },
  { topic: 'adventure', patterns: [/adventure/, /paraglid/, /raft(ing)?/, /ski(ing)?/, /zorb/] },
  { topic: 'sightseeing', patterns: [/sightseeing/, /places to visit/, /attraction/, /see in/, /visit in/, /what to (see|do)/, /things to do/, /tea garden/, /tea estate/, /explain about/, /tell me about/, /about the/] },
  { topic: 'reach', patterns: [/how (to|do i) (reach|go|get)/, /from delhi/, /from chandigarh/, /bus|train|flight/, /distance/] },
  { topic: 'weather', patterns: [/weather/, /temperature/, /climate/, /snow|barf/, /thand/] },
  { topic: 'budget', patterns: [/budget/, /cost/, /price/, /cheap/, /sasta/, /how much/] },
  { topic: 'nightlife', patterns: [/nightlife/, /party/, /club/, /bar/] },
  { topic: 'shopping', patterns: [/shop(ping)?/, /market/, /souvenir/] },
]

const TOPIC_GOOGLE_KEYWORDS: Record<HimachalTopic, string> = {
  camping: 'camping campground tent stay',
  hotel: 'hotel homestay lodge resort',
  trek: 'trekking trail hike',
  food: 'restaurant food cafe dhaba',
  temple: 'temple monastery gurudwara',
  adventure: 'adventure sports paragliding rafting',
  sightseeing: 'tourist attraction places to visit',
  reach: 'bus stand taxi stand transport',
  weather: 'tourist information center',
  budget: 'budget hotel guest house',
  nightlife: 'cafe bar restaurant',
  shopping: 'market mall shopping',
}

export function detectTopic(query: string): HimachalTopic | null {
  return detectAllTopics(query)[0] ?? null
}

export function detectAllTopics(query: string): HimachalTopic[] {
  const lower = query.toLowerCase()
  const found: HimachalTopic[] = []
  for (const { topic, patterns } of TOPIC_RULES) {
    if (patterns.some(p => p.test(lower)) && !found.includes(topic)) {
      found.push(topic)
    }
  }
  if (/tea garden|tea estate|chai bagan|bagicha/.test(lower) && !found.includes('sightseeing')) {
    found.push('sightseeing')
  }
  return found
}

/** Place + history se sirf relevant topic — "batao" par saari info dump nahi */
export function detectTopicsForReply(message: string, historyTexts: string[] = []): HimachalTopic[] {
  const fromMessage = detectAllTopics(message)
  if (fromMessage.length > 0) return fromMessage

  const combined = [message, ...historyTexts.slice(-4)].join(' ')
  return detectAllTopics(combined)
}

export function extractPlaceFromContext(message: string, historyTexts: string[] = []): string | null {
  const combined = [message, ...historyTexts.slice(-6)].join(' ')
  const fromMsg = sanitizePlaceName(matchDestination(message)?.name ?? extractPlaceFromMessage(message))
  if (fromMsg) return fromMsg
  return sanitizePlaceName(matchDestination(combined)?.name ?? extractPlaceFromMessage(combined))
}

/** User wants full guide — sab kuch, poora guide, complete info */
export function isCompleteGuideRequest(message: string): boolean {
  return /sab kuch|saari info|sari info|poora|pura |complete guide|full guide|everything about|detail mein|poore baare|poore bare|comprehensive|sari jankari|puri jankari|poori guide|guide do|guide de|sab batao|sab bataye|all about|full info|poori detail/i.test(
    message,
  )
}

/** General Himachal question — no specific place */
export function isGeneralHimachalQuery(message: string, historyTexts: string[] = []): boolean {
  if (extractPlaceFromContext(message, historyTexts)) return false
  const lower = message.toLowerCase()
  return (
    /\bhimachal\b|\bhp\b|dev bhoomi|hill station|pahad|pahadi|himalaya.*(trip|travel|ghum)|kahan jana|where (should|to) go|best place|best destination|sabse achha|ghumne ki jagah|travel guide|trip plan|itinerary|circuit|region|district/i.test(
      lower,
    ) || /himachal ke baare|about himachal|himachal mein/i.test(lower)
  )
}

/** Compare two places: Manali vs Shimla */
export function detectPlaceComparison(message: string): [string, string] | null {
  const vs = message.match(/(\w[\w\s]{2,18}?)\s+(?:vs|versus|ya|or|and)\s+(\w[\w\s]{2,18})/i)
  if (!vs) return null
  const a = matchDestination(vs[1])?.name ?? extractPlaceFromMessage(vs[1])
  const b = matchDestination(vs[2])?.name ?? extractPlaceFromMessage(vs[2])
  if (a && b && a !== b) return [a, b]
  return null
}

const PLACE_STOP_WORDS =
  /^(batao|bataye|bata|dikhao|dikha|share|tell|about|guide|sab|kuch|everything|photos|please|mujhe|hum|aap|kya|kaise|kahan|hai|hain|ke|baare|bare|the|best|good|poora|pura|complete|full|all|hi|hello|namaste)$/i

export function isKnownHimachalPlace(name: string | null): boolean {
  if (!name) return false
  return himachalDestinations.some(d => d.name.toLowerCase() === name.toLowerCase())
}

export function sanitizePlaceName(name: string | null): string | null {
  if (!name || PLACE_STOP_WORDS.test(name.trim())) return null
  if (!isKnownHimachalPlace(name)) return null
  return himachalDestinations.find(d => d.name.toLowerCase() === name.toLowerCase())?.name ?? null
}

export function matchDestination(query: string) {
  const lower = query.toLowerCase()

  for (const [alias, name] of Object.entries(ALIASES)) {
    if (lower.includes(alias)) {
      return himachalDestinations.find(d => d.name === name)
    }
  }

  const sorted = [...himachalDestinations].sort((a, b) => b.name.length - a.name.length)
  for (const dest of sorted) {
    const nameLower = dest.name.toLowerCase()
    if (lower.includes(nameLower)) return dest
    const mainToken = nameLower.split(/\s+/)[0]
    if (mainToken.length >= 4 && lower.includes(mainToken)) return dest
  }

  if (/kangra|dhauladhar/.test(lower)) return himachalDestinations.find(d => d.name === 'Dharamshala')
  if (/parvati valley/.test(lower)) return himachalDestinations.find(d => d.name === 'Kasol')
  if (/lahaul/.test(lower)) return himachalDestinations.find(d => d.name === 'Keylong')

  return null
}

export function extractPlaceFromMessage(message: string): string | null {
  const dest = matchDestination(message)
  if (dest) return dest.name

  const patterns = [
    /\b(?:in|near|at|around|mein|mai)\s+([A-Za-z][A-Za-z\s]{2,24}?)(?:\s+(?:mein|mai|area|ke|ka|ki))?(?:\?|$|,|\.|\s+camping|\s+hotel|\s+food)/i,
    /\b([A-Za-z][A-Za-z\s]{2,20})\s+(?:camping|hotel|food|trek|weather|mein)/i,
  ]

  for (const pattern of patterns) {
    const m = message.match(pattern)
    if (m?.[1]) {
      const place = m[1].trim()
      if (!/^(himachal|where|what|tell|can|the|best|good|ke|baare|bare)/i.test(place) && !PLACE_STOP_WORDS.test(place)) {
        const known = sanitizePlaceName(place)
        if (known) return known
      }
    }
  }

  return null
}

export function buildGoogleSearchQuery(message: string): {
  query: string
  placeName: string | null
  topic: HimachalTopic | null
} {
  const topic = detectTopic(message)
  const dest = matchDestination(message)
  const placeName = dest?.name ?? extractPlaceFromMessage(message)

  const parts: string[] = []
  if (topic) parts.push(TOPIC_GOOGLE_KEYWORDS[topic])
  if (placeName) parts.push(placeName)
  else parts.push(message.replace(/[?]/g, '').trim().slice(0, 80))

  parts.push('Himachal Pradesh India')

  return {
    query: parts.filter(Boolean).join(' '),
    placeName,
    topic,
  }
}

/** Uses chat history so follow-ups like "photos dikhao" keep the same area */
export function buildGoogleSearchQueryFromContext(
  message: string,
  historyTexts: string[] = [],
): {
  query: string
  placeName: string | null
  topic: HimachalTopic | null
} {
  const combined = [message, ...historyTexts.slice(-6)].join(' ')
  const topic = detectTopic(message) || detectTopic(combined)
  const placeName =
    matchDestination(message)?.name ??
    extractPlaceFromMessage(message) ??
    matchDestination(combined)?.name ??
    extractPlaceFromMessage(combined)

  const photoOnly =
    /photo|picture|pic|image|tasvir|tasveer|dikha|dikhao|share.*(photo|pic)/i.test(message) &&
    !matchDestination(message)

  if (photoOnly && placeName) {
    return {
      query: `${placeName} Himachal Pradesh tourist places attractions`,
      placeName,
      topic: topic ?? 'sightseeing',
    }
  }

  if (placeName) {
    const parts: string[] = []
    if (topic) parts.push(TOPIC_GOOGLE_KEYWORDS[topic])
    parts.push(placeName)
    parts.push('Himachal Pradesh India')
    return { query: parts.filter(Boolean).join(' '), placeName, topic }
  }

  return buildGoogleSearchQuery(message)
}

export function topicLabel(topic: HimachalTopic): string {
  const labels: Record<HimachalTopic, string> = {
    camping: 'Camping',
    hotel: 'Hotels & Stays',
    trek: 'Trekking',
    food: 'Food & Dining',
    temple: 'Temples & Monasteries',
    adventure: 'Adventure',
    sightseeing: 'Sightseeing',
    reach: 'How to Reach',
    weather: 'Weather',
    budget: 'Budget',
    nightlife: 'Nightlife & Cafes',
    shopping: 'Shopping',
  }
  return labels[topic]
}
