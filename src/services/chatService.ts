import type { ChatMessage, ChatReply } from '../types'

export async function fetchAIChatReply(messages: ChatMessage[]): Promise<ChatReply | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.map(m => ({ role: m.role, content: m.content })),
      }),
    })

    const data = await res.json()

    if (res.status === 503 && data.fallback) return null
    if (!res.ok || !data.content) return null

    return {
      content: data.content as string,
      images: (data.images ?? []) as ChatReply['images'],
      source: data.source as ChatReply['source'],
    }
  } catch {
    return null
  }
}
