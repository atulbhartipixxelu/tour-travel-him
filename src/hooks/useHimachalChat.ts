import { useState, useCallback, useRef, useEffect } from 'react'
import { getSmartHimachalReply, HIMACHAL_CHAT_GREETING } from '../utils/himachalAI'
import type { ChatMessage } from '../types'

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useHimachalChat(greeting = HIMACHAL_CHAT_GREETING) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: greeting },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editDraft, setEditDraft] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, editingId])

  const appendAssistantReply = useCallback((reply: Awaited<ReturnType<typeof getSmartHimachalReply>>) => {
    setMessages(prev => [
      ...prev,
      {
        id: newId(),
        role: 'assistant',
        content: reply.content,
        images: reply.images,
        source: reply.source,
      },
    ])
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || typing) return

      const userMsg: ChatMessage = { id: newId(), role: 'user', content: trimmed }
      const historyBefore = messages

      setMessages(prev => [...prev, userMsg])
      setInput('')
      setTyping(true)

      try {
        const reply = await getSmartHimachalReply(trimmed, historyBefore)
        appendAssistantReply(reply)
      } catch {
        setMessages(prev => [
          ...prev,
          { id: newId(), role: 'assistant', content: 'Sorry, kuch issue aaya. Dobara try karein!' },
        ])
      } finally {
        setTyping(false)
      }
    },
    [messages, typing, appendAssistantReply],
  )

  const deleteMessage = useCallback((id: string) => {
    if (id === 'welcome') return
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === id)
      if (idx < 0) return prev
      const msg = prev[idx]
      if (msg.role === 'user' && prev[idx + 1]?.role === 'assistant') {
        return prev.filter((_, i) => i !== idx && i !== idx + 1)
      }
      return prev.filter(m => m.id !== id)
    })
    if (editingId === id) {
      setEditingId(null)
      setEditDraft('')
    }
  }, [editingId])

  const startEdit = useCallback((id: string, content: string) => {
    setEditingId(id)
    setEditDraft(content)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingId(null)
    setEditDraft('')
  }, [])

  const saveEdit = useCallback(
    async (id: string) => {
      const trimmed = editDraft.trim()
      if (!trimmed || typing) return

      const idx = messages.findIndex(m => m.id === id)
      if (idx < 0 || messages[idx].role !== 'user') return

      const historyBefore = messages.slice(0, idx)
      const updatedUser: ChatMessage = { id, role: 'user', content: trimmed }

      setMessages([...historyBefore, updatedUser])
      setEditingId(null)
      setEditDraft('')
      setTyping(true)

      try {
        const reply = await getSmartHimachalReply(trimmed, historyBefore)
        appendAssistantReply(reply)
      } catch {
        setMessages(prev => [
          ...prev,
          { id: newId(), role: 'assistant', content: 'Sorry, regenerate failed. Try again!' },
        ])
      } finally {
        setTyping(false)
      }
    },
    [editDraft, messages, typing, appendAssistantReply],
  )

  const clearChat = useCallback(() => {
    setMessages([{ id: 'welcome', role: 'assistant', content: greeting }])
    setEditingId(null)
    setEditDraft('')
  }, [greeting])

  return {
    messages,
    input,
    setInput,
    typing,
    editingId,
    editDraft,
    setEditDraft,
    chatRef,
    sendMessage,
    deleteMessage,
    startEdit,
    cancelEdit,
    saveEdit,
    clearChat,
  }
}
