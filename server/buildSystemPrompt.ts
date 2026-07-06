import { himachalDestinations } from '../src/data/himachalDestinations'
import { placeKnowledge } from '../src/data/himachalKnowledge'
import { himachalStateOverview, travelCircuits } from '../src/data/himachalExpert'
import {
  extractPlaceFromContext,
  detectTopicsForReply,
  isCompleteGuideRequest,
  isGeneralHimachalQuery,
  matchDestination,
  extractPlaceFromMessage,
} from '../src/utils/queryParser'
import type { HimachalTopic } from '../src/data/himachalKnowledge'

function formatFocusedPlaceContext(placeName: string, topics: HimachalTopic[], fullGuide: boolean): string {
  const dest = himachalDestinations.find(d => d.name === placeName)
  const knowledge = placeKnowledge[placeName]
  if (!knowledge && !dest) return ''

  const lines: string[] = []
  if (dest) {
    lines.push(`Region: ${dest.region} | Highlight: ${dest.highlight} | Weather: ${dest.weather} | Best: ${dest.bestTime}`)
  }

  if (fullGuide && knowledge) {
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

export function buildSystemPrompt(userMessage: string, historyTexts: string[] = []): string {
  const placeName = extractPlaceFromContext(userMessage, historyTexts)
  const topics = detectTopicsForReply(userMessage, historyTexts)
  const fullGuide = isCompleteGuideRequest(userMessage)
  const generalHP = isGeneralHimachalQuery(userMessage, historyTexts)

  const topicHint = fullGuide
    ? 'COMPLETE GUIDE — cover all aspects (hotels, camping, food, treks, reach, weather, budget, sightseeing)'
    : topics.length > 0
      ? topics.map(t => t.toUpperCase()).join(', ')
      : generalHP
        ? 'GENERAL HIMACHAL — state overview, regions, or best places'
        : 'OVERVIEW — brief intro + offer to go deeper'

  const placeContext = placeName ? formatFocusedPlaceContext(placeName, topics, fullGuide) : ''

  const destNames = himachalDestinations.map(d => d.name).join(', ')
  const circuits = travelCircuits.map(c => c.name).join(', ')

  return `You are WanderHive AI — Himachal Pradesh ka COMPLETE travel expert (ChatGPT-style). Tumhe 28 destinations, har region, circuits, seasons, hotels, camping, treks, food — SAB pata hai.

EXPERT KNOWLEDGE:
${himachalStateOverview}

All 28 destinations: ${destNames}
Trip circuits: ${circuits}

HOW TO REPLY:
1. Match user language: Hindi, English, or Hinglish
2. Specific question → focused answer (e.g. "Kasol hotels" = only hotels)
3. "Sab kuch batao" / "complete guide" → comprehensive guide with all sections
4. General Himachal questions → expert overview, best places, circuits, seasons
5. Compare places (Manali vs Shimla) → clear comparison with recommendation
6. Weave Google Maps live data naturally when provided
7. Sound like a knowledgeable local expert — warm, helpful, confident
8. Never say "I don't know" for Himachal — use your expert database
9. ${fullGuide ? 'Give a THOROUGH guide (400–600 words) with sections.' : 'Keep focused replies 100–250 words unless guide requested.'}

${placeName ? `CURRENT PLACE: ${placeName}` : generalHP ? 'MODE: General Himachal expert' : 'PLACE: detect from message/history'}
FOCUS: ${topicHint}

${placeContext ? `DATABASE FOR THIS QUERY:\n${placeContext}` : ''}`
}

/** @deprecated */
export function getContextPlaces(userMessage: string): string[] {
  const places = new Set<string>()
  const dest = matchDestination(userMessage)
  if (dest) places.add(dest.name)
  const extracted = extractPlaceFromMessage(userMessage)
  if (extracted) places.add(extracted)
  return [...places]
}
