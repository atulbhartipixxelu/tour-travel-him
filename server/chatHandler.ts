import type { IncomingMessage, ServerResponse } from 'node:http'
import { buildSystemPrompt } from './buildSystemPrompt'
import { googleSearchForChat } from './googlePlaces'
import {
  buildSmartReply,
  buildGoogleContextForAI,
  buildLocalContextForAI,
  type GoogleReplyBundle,
} from './smartReply'
import { detectTopicsForReply, extractPlaceFromContext, isCompleteGuideRequest } from '../src/utils/queryParser'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequestBody {
  messages: ChatMessage[]
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

async function callOpenAI(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[],
  extraContext: string,
): Promise<string> {
  const lastUser = [...messages].reverse().find(m => m.role === 'user')
  const enrichedMessages: ChatMessage[] = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .slice(-12)
    .map(m => ({ role: m.role, content: m.content }))

  if (extraContext && lastUser) {
    const idx = enrichedMessages.findLastIndex(m => m.content === lastUser.content)
    if (idx >= 0) {
      enrichedMessages[idx] = { role: 'user', content: lastUser.content + extraContext }
    }
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      messages: [{ role: 'system', content: systemPrompt }, ...enrichedMessages],
      temperature: 0.7,
      max_tokens: 650,
    }),
  })

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    error?: { message?: string }
  }

  if (!res.ok) throw new Error(data.error?.message ?? `OpenAI error ${res.status}`)

  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('Empty AI response')
  return content
}

async function loadGoogleBundle(
  message: string,
  historyTexts: string[],
  mapsKey: string,
): Promise<GoogleReplyBundle | null> {
  try {
    const google = await googleSearchForChat(message, mapsKey, historyTexts)
    if (!google.places.length) return null

    const editorial =
      google.places[0]?.placeId
        ? undefined
        : undefined

    return {
      places: google.places,
      placeName: google.placeName,
      images: google.images,
      editorial: undefined,
    }
  } catch {
    return null
  }
}

export async function handleChatRequest(req: IncomingMessage, res: ServerResponse) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, cors)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { ...cors, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const body = JSON.parse(await readBody(req)) as ChatRequestBody
    const messages = body.messages?.filter(m => m.content?.trim()) ?? []

    if (messages.length === 0) {
      res.writeHead(400, { ...cors, 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'messages required' }))
      return
    }

    const lastUser = [...messages].reverse().find(m => m.role === 'user')
    if (!lastUser) {
      res.writeHead(400, { ...cors, 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'user message required' }))
      return
    }

    const historyTexts = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .slice(0, -1)
      .map(m => m.content)

    const mapsKey = process.env.GOOGLE_MAPS_API_KEY
    let googleBundle: GoogleReplyBundle | null = null

    if (mapsKey && !/^no+api/i.test(mapsKey)) {
      googleBundle = await loadGoogleBundle(lastUser.content, historyTexts, mapsKey)
      if (googleBundle && googleBundle.places[0]) {
        try {
          const detailUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
          detailUrl.searchParams.set('place_id', googleBundle.places[0].placeId ?? '')
          detailUrl.searchParams.set('fields', 'editorial_summary')
          detailUrl.searchParams.set('key', mapsKey)
          if (googleBundle.places[0].placeId) {
            const dRes = await fetch(detailUrl.toString())
            const dData = (await dRes.json()) as {
              result?: { editorial_summary?: { overview?: string } }
            }
            googleBundle.editorial = dData.result?.editorial_summary?.overview
          }
        } catch {
          /* optional */
        }
      }
    }

    const smart = await buildSmartReply(lastUser.content, historyTexts, googleBundle)
    const topics = detectTopicsForReply(lastUser.content, historyTexts)
    const placeName = extractPlaceFromContext(lastUser.content, historyTexts) ?? smart.placeName
    const completeGuide = isCompleteGuideRequest(lastUser.content)

    const aiContext =
      buildGoogleContextForAI(googleBundle) +
      buildLocalContextForAI(placeName, topics, completeGuide)

    const openaiKey = process.env.OPENAI_API_KEY
    if (openaiKey) {
      try {
        const systemPrompt = buildSystemPrompt(lastUser.content, historyTexts)
        const reply = await callOpenAI(openaiKey, systemPrompt, messages, aiContext)
        res.writeHead(200, { ...cors, 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            reply,
            content: reply,
            images: smart.images,
            source: googleBundle?.places.length ? 'google' : 'ai',
            model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
          }),
        )
        return
      } catch {
        /* fall through to smart reply */
      }
    }

    res.writeHead(200, { ...cors, 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        reply: smart.content,
        content: smart.content,
        images: smart.images,
        source: smart.source,
      }),
    )
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Chat failed'
    res.writeHead(500, { ...cors, 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: msg, fallback: true }))
  }
}

export function handleConfigRequest(_req: IncomingMessage, res: ServerResponse) {
  const cors = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  res.writeHead(200, cors)
  res.end(
    JSON.stringify({
      google: Boolean(mapsKey && !/^no+api/i.test(mapsKey)),
      openai: Boolean(openaiKey),
    }),
  )
}
