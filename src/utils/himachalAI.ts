import { fetchAIChatReply } from '../services/chatService'
import { matchDestination, extractPlaceFromMessage } from './queryParser'
import type { ChatMessage, ChatReply } from '../types'

export const HIMACHAL_CHAT_GREETING =
  'Namaste! Main WanderHive AI hoon — Himachal Pradesh ka complete travel expert. 🏔️\n\n28 destinations, har region, hotels, camping, treks, food, circuits — sab kuch pata hai!\n\nPuchho: "Manali sab kuch batao", "Spiti circuit", "budget mein kahan jana", ya kisi bhi area ke baare mein.'

function extractPlace(message: string, history: ChatMessage[]): string | null {
  const combined = [
    message,
    ...history.filter(m => m.role === 'user' || m.role === 'assistant').map(m => m.content),
  ].join(' ')
  return matchDestination(combined)?.name ?? extractPlaceFromMessage(combined)
}

function getQuickReply(lower: string, hasHistory: boolean): ChatReply | null {
  if (!lower) return { content: HIMACHAL_CHAT_GREETING }
  if (hasHistory) return null
  if (/^(hi|hello|hey|namaste|hola|good morning|good evening|kaise ho)\b/.test(lower)) {
    return { content: HIMACHAL_CHAT_GREETING }
  }
  if (/thank|dhanyavad|shukriya|thanks/.test(lower)) {
    return { content: "You're welcome! Aur kuch puchho — main sirf aapke sawaal ka jawab dunga. 🙏" }
  }
  return null
}

function clientFallback(input: string, history: ChatMessage[]): ChatReply {
  const placeName = extractPlace(input, history)
  if (placeName) {
    return {
      content: `**${placeName}** ke baare mein puchha — server connect nahi ho paya.\n\nPage refresh karein ya specific likhein: "${placeName} hotels", "${placeName} camping".`,
      source: 'free',
    }
  }
  return {
    content:
      'Himachal ka area naam + sawaal likho — jaise "Palampur mein hotel", "Kasol camping", "Manali ke baare mein batao".',
    source: 'free',
  }
}

export async function getSmartHimachalReply(
  input: string,
  history: ChatMessage[] = [],
): Promise<ChatReply> {
  const trimmed = input.trim()
  const lower = trimmed.toLowerCase()
  const hasHistory = history.filter(m => m.role === 'user').length > 0

  const quick = getQuickReply(lower, hasHistory)
  if (quick) return quick

  const conversation: ChatMessage[] = [
    ...history.filter(m => m.role === 'user' || m.role === 'assistant'),
    { role: 'user', content: trimmed },
  ]

  const chatReply = await fetchAIChatReply(conversation)
  if (chatReply?.content) return chatReply

  return clientFallback(trimmed, history)
}

export function getHimachalAIResponse(input: string): string {
  return clientFallback(input, []).content
}
