import { himachalDestinations } from '../src/data/himachalDestinations'
import { placeKnowledge } from '../src/data/himachalKnowledge'
import type { HimachalTopic } from '../src/data/himachalKnowledge'
import {
  bestByCategory,
  buildAllDestinationsQuickRef,
  buildRegionsSummary,
  detectCategoryQuery,
  getTopicGlobalReply,
  himachalStateOverview,
  seasonGuide,
  travelCircuits,
} from '../src/data/himachalExpert'
import {
  detectTopicsForReply,
  topicLabel,
  extractPlaceFromContext,
  isCompleteGuideRequest,
  isGeneralHimachalQuery,
  detectPlaceComparison,
} from '../src/utils/queryParser'
import { extractPlaceFromText, isPhotoRequest, fetchWikimediaImages, getLocalImages } from './freePlaces'
import type { GooglePlaceResult } from './googlePlaces'

export interface SmartReplyImage {
  src: string
  alt: string
  caption?: string
}

export interface GoogleReplyBundle {
  places: GooglePlaceResult[]
  placeName: string | null
  images: SmartReplyImage[]
  editorial?: string
}

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

function isHindiOrHinglish(text: string): boolean {
  return /[\u0900-\u097F]|\b(kya|kaise|kahan|kaha|mein|mai|hai|hain|batao|bataye|chahiye|koi|ke baare|ke bare|dikhao|milega|milegi)\b/i.test(
    text,
  )
}

function googlePlacesBlock(places: GooglePlaceResult[], hindi: boolean): string {
  if (!places.length) return ''
  const header = hindi ? '**Google Maps se live picks:**' : '**Live from Google Maps:**'
  const lines = places.slice(0, 3).map((p, i) => {
    let line = `${i + 1}. **${p.name}**`
    if (p.rating) line += hindi ? ` — ⭐ ${p.rating}/5 rating` : ` — ⭐ ${p.rating}/5`
    if (p.address) line += `\n   📍 ${p.address.split(',').slice(0, 2).join(',')}`
    return line
  })
  return `${header}\n${lines.join('\n')}`
}

function knowledgeSection(placeName: string, topic: HimachalTopic): string | null {
  const knowledge = placeKnowledge[placeName]
  if (!knowledge) return null
  const val = knowledge[topic as keyof typeof knowledge]
  return typeof val === 'string' ? val : null
}

function buildTopicAnswer(
  placeName: string,
  topic: HimachalTopic,
  google: GoogleReplyBundle | null | undefined,
  hindi: boolean,
): string {
  const label = topicLabel(topic)
  const local = knowledgeSection(placeName, topic)
  const googleBlock = google?.places?.length ? googlePlacesBlock(google.places, hindi) : ''

  if (topic === 'hotel') {
    const intro = hindi
      ? `**${placeName} mein rehne ke liye** — yeh options dekhein:`
      : `**Where to stay in ${placeName}:**`
    return [intro, googleBlock, local].filter(Boolean).join('\n\n')
  }

  if (topic === 'camping') {
    const intro = hindi ? `**${placeName} mein camping** ke liye:` : `**Camping in ${placeName}:**`
    return [intro, local, googleBlock].filter(Boolean).join('\n\n')
  }

  if (topic === 'food') {
    const intro = hindi ? `**${placeName} mein khaane ke liye** —` : `**Food in ${placeName}:**`
    return [intro, local, googleBlock].filter(Boolean).join('\n\n')
  }

  if (topic === 'sightseeing') {
    const intro = hindi ? `**${placeName} mein ghumne ki jagah** —` : `**Things to see in ${placeName}:**`
    return [intro, local, googleBlock].filter(Boolean).join('\n\n')
  }

  const intro = hindi ? `**${placeName} — ${label}**` : `**${placeName} — ${label}**`
  return [intro, local, googleBlock].filter(Boolean).join('\n\n')
}

function buildOverviewAnswer(
  placeName: string,
  google: GoogleReplyBundle | null | undefined,
  hindi: boolean,
): string {
  const dest = himachalDestinations.find(d => d.name === placeName)
  const knowledge = placeKnowledge[placeName]
  const overview =
    google?.editorial?.trim() ||
    knowledge?.overview ||
    (dest ? `${dest.highlight} — ${dest.region} region, Himachal Pradesh.` : `${placeName}, Himachal Pradesh.`)

  const parts: string[] = []

  parts.push(
    hindi
      ? `**${placeName}** ke baare mein seedha jawab:\n\n${overview}`
      : `Here's what you should know about **${placeName}**:\n\n${overview}`,
  )

  if (dest) {
    parts.push(
      hindi
        ? `🌤️ Mausam abhi ~${dest.weather} | Best time: **${dest.bestTime}** | Trip ~**${formatInr(dest.price)}** se shuru`
        : `🌤️ Weather: ${dest.weather} | Best time: **${dest.bestTime}** | Trips from ~**${formatInr(dest.price)}**`,
    )
  }

  if (google?.places?.length) {
    parts.push(googlePlacesBlock(google.places, hindi))
  }

  parts.push(
    hindi
      ? `Aur kuch chahiye? Seedha puchho — jaise "${placeName} mein hotel", "camping", "food", ya "photos dikhao".`
      : `Need more? Ask specifically — e.g. "hotels in ${placeName}", "camping", "food", or "show photos".`,
  )

  return parts.join('\n\n')
}

const ALL_TOPICS: HimachalTopic[] = [
  'sightseeing', 'hotel', 'camping', 'food', 'trek', 'temple',
  'adventure', 'reach', 'weather', 'budget', 'nightlife', 'shopping',
]

function buildCompletePlaceGuide(placeName: string, google: GoogleReplyBundle | null | undefined, hindi: boolean): string {
  const knowledge = placeKnowledge[placeName]
  const dest = himachalDestinations.find(d => d.name === placeName)
  const parts: string[] = []

  parts.push(
    hindi
      ? `# 📍 ${placeName} — Complete Himachal Guide\n\nYeh ${placeName} ki poori travel guide hai — sab kuch ek jagah:`
      : `# 📍 ${placeName} — Complete Travel Guide\n\nEverything you need to know about ${placeName}:`,
  )

  const overview =
    google?.editorial?.trim() || knowledge?.overview ||
    (dest ? `${dest.highlight} · ${dest.region}` : '')
  if (overview) parts.push(hindi ? `**Overview**\n${overview}` : `**Overview**\n${overview}`)

  if (dest) {
    parts.push(
      hindi
        ? `**Quick facts:** ${dest.region} | ⭐ ${dest.rating} | ${dest.weather} | Best: ${dest.bestTime} | ~${formatInr(dest.price)}/trip`
        : `**Quick facts:** ${dest.region} | ⭐ ${dest.rating} | ${dest.weather} | Best: ${dest.bestTime} | ~${formatInr(dest.price)}/trip`,
    )
  }

  for (const topic of ALL_TOPICS) {
    const val = knowledge?.[topic as keyof typeof knowledge]
    if (typeof val === 'string') {
      parts.push(`**${topicLabel(topic)}**\n${val}`)
    }
  }

  if (google?.places?.length) {
    parts.push(googlePlacesBlock(google.places, hindi))
  }

  parts.push(
    hindi
      ? '— WanderHive Himachal Expert · 28 destinations ka data'
      : '— WanderHive Himachal Expert · Full database',
  )

  return parts.join('\n\n')
}

function buildComparisonAnswer(a: string, b: string, hindi: boolean): string {
  const destA = himachalDestinations.find(d => d.name === a)
  const destB = himachalDestinations.find(d => d.name === b)
  const knowA = placeKnowledge[a]?.overview ?? destA?.highlight ?? ''
  const knowB = placeKnowledge[b]?.overview ?? destB?.highlight ?? ''

  if (hindi) {
    return `**${a} vs ${b} — comparison:**\n\n**${a}:** ${knowA}${destA ? `\n⭐ ${destA.rating} | ${destA.weather} | Best: ${destA.bestTime} | ~₹${destA.price}` : ''}\n\n**${b}:** ${knowB}${destB ? `\n⭐ ${destB.rating} | ${destB.weather} | Best: ${destB.bestTime} | ~₹${destB.price}` : ''}\n\n**Recommendation:** ${destA && destB ? (destA.price < destB.price ? `${a} thoda budget-friendly, ${b} alag vibe.` : `Dono alag experience — ${a} = ${destA.highlight}, ${b} = ${destB.highlight}.`) : 'Dono alag-alag experience dete hain — apna preference batao (adventure, peace, budget)?'}`
  }

  return `**${a} vs ${b}:**\n\n**${a}:** ${knowA}\n\n**${b}:** ${knowB}\n\nBoth offer different vibes — tell me your priority (adventure, culture, budget)?`
}

function buildCategoryAnswer(category: keyof typeof bestByCategory, hindi: boolean): string {
  const cat = bestByCategory[category]
  const places = cat.places.map(p => `• **${p}**`).join('\n')
  return hindi
    ? `**${cat.title}:**\n\n${places}\n\n💡 ${cat.tip}\n\nKisi ek place ka poora guide chahiye to naam likho — jaise "${cat.places[0]} sab kuch batao".`
    : `**${cat.title}:**\n\n${places}\n\n💡 ${cat.tip}\n\nWant a full guide? Ask e.g. "complete guide to ${cat.places[0]}".`
}

function buildHimachalExpertAnswer(message: string, topics: HimachalTopic[], hindi: boolean): string {
  const category = detectCategoryQuery(message)
  if (category) return buildCategoryAnswer(category, hindi)

  if (topics.length === 1 && getTopicGlobalReply(topics[0])) {
    const global = getTopicGlobalReply(topics[0])!
    return hindi
      ? `**Himachal — ${topicLabel(topics[0])}**\n\n${global}\n\nKisi specific jagah ke liye naam likho — jaise "Kasol camping" ya "Manali hotels".`
      : `**Himachal — ${topicLabel(topics[0])}**\n\n${global}\n\nName a place for details — e.g. "Kasol camping".`
  }

  if (/circuit|itinerary|route|plan|trip plan|kaise ghum|ghumne ka plan/i.test(message)) {
    const circuits = travelCircuits
      .map(c => `**${c.name}** (${c.days})\n${c.route}\n${c.highlight}`)
      .join('\n\n')
    return hindi
      ? `**Himachal Trip Circuits:**\n\n${circuits}\n\nApni dates & budget batao — custom plan bana dunga!`
      : `**Himachal Trip Circuits:**\n\n${circuits}\n\nShare dates & budget for a custom plan!`
  }

  if (/season|mausam|weather|kab jana|best time|best month/i.test(message)) {
    const seasons = Object.values(seasonGuide).join('\n')
    return hindi ? `**Himachal — Season Guide:**\n\n${seasons}` : `**Himachal Season Guide:**\n\n${seasons}`
  }

  if (/region|district|zone|area|kshetra|ilaka/i.test(message)) {
    return hindi
      ? `**Himachal — Regions & Places:**\n\n${buildRegionsSummary(true)}\n\n${himachalStateOverview}`
      : `**Himachal Regions:**\n\n${buildRegionsSummary(false)}\n\n${himachalStateOverview}`
  }

  if (/sab jagah|all place|28|list|destinations|kahan kahan|kaun kaun se/i.test(message)) {
    return hindi
      ? `**Himachal ke 28 major destinations:**\n\n${buildAllDestinationsQuickRef(true)}\n\nKisi ek ka poora guide: "Manali sab kuch batao"`
      : `**28 Himachal destinations:**\n\n${buildAllDestinationsQuickRef(false)}\n\nFull guide: "complete guide to Manali"`
  }

  const parts: string[] = []
  parts.push(
    hindi
      ? `**Himachal Pradesh — Main aapka poora travel expert hoon! 🏔️**\n\n${himachalStateOverview}`
      : `**Himachal Pradesh Expert 🏔️**\n\n${himachalStateOverview}`,
  )

  parts.push(
    hindi
      ? `**Top picks:**\n• Snow → Manali, Kufri\n• Adventure → Bir Billing, Spiti\n• Budget → Kasol, Mandi\n• Spiritual → McLeod Ganj, Tabo\n• Offbeat → Shoja, Barot`
      : `**Top picks:** Snow: Manali | Adventure: Bir, Spiti | Budget: Kasol | Spiritual: McLeod | Offbeat: Shoja`,
  )

  parts.push(
    hindi
      ? `**Mujhse puchho:**\n• "Manali sab kuch batao" — poora guide\n• "Spiti circuit plan" — itinerary\n• "Budget mein kahan jana" — best places\n• "Kasol vs Manali" — compare\n• "Palampur hotels" — specific answer`
      : `**Ask me:** "complete Manali guide", "Spiti circuit", "best budget places", "Kasol vs Manali", "Palampur hotels"`,
  )

  return parts.join('\n\n')
}

async function resolveImages(
  placeName: string,
  google: GoogleReplyBundle | null | undefined,
  wantPhotos: boolean,
): Promise<SmartReplyImage[]> {
  if (google?.images?.length) return google.images.slice(0, 4)

  if (!wantPhotos && !placeName) return []

  const wiki = await fetchWikimediaImages(placeName, 4)
  if (wiki.length >= 2) return wiki.slice(0, 4)

  const local = getLocalImages(placeName, 3)
  return wiki.length ? [...wiki, ...local].slice(0, 4) : local
}

export async function buildSmartReply(
  message: string,
  historyTexts: string[] = [],
  google?: GoogleReplyBundle | null,
): Promise<{ content: string; images: SmartReplyImage[]; placeName: string | null; source: 'google' | 'free' }> {
  const hindi = isHindiOrHinglish(message)
  const photoReq = isPhotoRequest(message)
  const completeGuide = isCompleteGuideRequest(message)
  const comparison = detectPlaceComparison(message)
  const topics = detectTopicsForReply(message, historyTexts)
  const primaryTopic = topics[0] ?? null

  if (comparison) {
    return {
      content: buildComparisonAnswer(comparison[0], comparison[1], hindi),
      images: [],
      placeName: null,
      source: 'free',
    }
  }

  if (isGeneralHimachalQuery(message, historyTexts)) {
    const content = buildHimachalExpertAnswer(message, topics, hindi)
    const sampleImages = ['Manali', 'Spiti Valley', 'Kasol', 'Dharamshala'].flatMap(p => getLocalImages(p, 1)).slice(0, 4)
    return { content, images: sampleImages, placeName: null, source: 'free' }
  }

  const placeName =
    google?.placeName ?? extractPlaceFromContext(message, historyTexts) ?? extractPlaceFromText(message, ...historyTexts)

  if (!placeName) {
    if (photoReq) {
      return {
        content: hindi
          ? 'Kis jagah ki photo chahiye? Naam likho — jaise "Palampur photos" ya "Kasol dikhao".'
          : 'Which place? Try "Palampur photos" or "show me Kasol".',
        images: [],
        placeName: null,
        source: 'free',
      }
    }
    return {
      content: hindi
        ? 'Himachal ke baare mein kuch bhi puchho — "best camping spots", "Spiti circuit", "Manali sab kuch batao", ya kisi area ka naam likho.'
        : 'Ask anything about Himachal — "best camping", "Spiti circuit", "complete Manali guide", or name a place.',
      placeName: null,
      images: [],
      source: 'free',
    }
  }

  let content: string

  if (completeGuide) {
    content = buildCompletePlaceGuide(placeName, google, hindi)
  } else if (photoReq && !primaryTopic) {
    const brief = buildOverviewAnswer(placeName, google, hindi)
    content = hindi
      ? `Haan! 📸 **${placeName}** ki photos neeche hain.\n\n${brief.split('\n\n').slice(1).join('\n\n')}`
      : `Sure! 📸 Photos of **${placeName}** below.\n\n${brief.split('\n\n').slice(1).join('\n\n')}`
  } else if (primaryTopic) {
    content = buildTopicAnswer(placeName, primaryTopic, google, hindi)
  } else {
    content = buildOverviewAnswer(placeName, google, hindi)
  }

  const images = await resolveImages(placeName, google, photoReq || completeGuide || Boolean(google?.images?.length))

  return {
    content,
    images,
    placeName,
    source: google?.places?.length ? 'google' : 'free',
  }
}

export function buildGoogleContextForAI(google: GoogleReplyBundle | null | undefined): string {
  if (!google?.places?.length) return ''

  const lines = ['\n\n[LIVE GOOGLE MAPS DATA — use naturally in your answer, do not copy as a list]']
  if (google.editorial) lines.push(`About: ${google.editorial}`)
  for (const p of google.places.slice(0, 4)) {
    let line = `- ${p.name}`
    if (p.rating) line += ` (⭐${p.rating})`
    line += ` — ${p.address}`
    lines.push(line)
  }
  return lines.join('\n')
}

export function buildLocalContextForAI(placeName: string | null, topics: HimachalTopic[], completeGuide = false): string {
  if (!placeName) {
    return `\n\n[HIMACHAL STATE EXPERT — 28 destinations, all regions, circuits, seasons. User may ask general HP questions.]`
  }
  const knowledge = placeKnowledge[placeName]
  const dest = himachalDestinations.find(d => d.name === placeName)
  if (!knowledge && !dest) return ''

  const lines = [`\n\n[EXPERT DATA for ${placeName} — ${completeGuide ? 'FULL GUIDE requested, use all sections' : 'use relevant sections only'}]`]
  if (dest) lines.push(`Region: ${dest.region} | Best: ${dest.bestTime} | Weather: ${dest.weather} | Price: ~₹${dest.price}`)

  if (completeGuide && knowledge) {
    for (const [key, val] of Object.entries(knowledge)) {
      if (typeof val === 'string') lines.push(`${key}: ${val}`)
    }
    return lines.join('\n')
  }

  if (topics.length === 0) {
    if (knowledge?.overview) lines.push(`Overview: ${knowledge.overview}`)
    return lines.join('\n')
  }

  for (const topic of topics) {
    const val = knowledge?.[topic as keyof typeof knowledge]
    if (typeof val === 'string') lines.push(`${topic}: ${val}`)
  }

  return lines.join('\n')
}
