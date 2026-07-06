import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageCircle, Send, X, RotateCcw } from 'lucide-react'
import { HIMACHAL_CHAT_GREETING } from '../../utils/himachalAI'
import { useHimachalChat } from '../../hooks/useHimachalChat'
import ChatMessageList from './ChatMessageList'

export default function FloatingChatWidget() {
  const [open, setOpen] = useState(false)
  const [googleLive, setGoogleLive] = useState(false)

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => setGoogleLive(Boolean(d.google)))
      .catch(() => setGoogleLive(false))
  }, [])

  const {
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
  } = useHimachalChat(HIMACHAL_CHAT_GREETING)

  return (
    <div className="chat-widget-wrap" data-lenis-prevent>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="chat-widget-panel hero-panel-glass"
          >
            <div className="chat-widget-head">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#0b1120]" />
                </div>
                <div>
                  <h4 className="hero-panel-title text-sm font-[family-name:var(--font-display)]">WanderHive AI</h4>
                  <p className="text-[11px] font-medium">
                    {typing ? (
                      <span className="text-emerald-400">Thinking…</span>
                    ) : googleLive ? (
                      <span className="text-emerald-400">Online · Google Maps Live</span>
                    ) : (
                      <span className="text-amber-400/90">Online · Add Google API key</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  className="chat-widget-close"
                  aria-label="Clear chat"
                  title="New chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="chat-widget-close"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={chatRef} className="chat-widget-messages">
              <ChatMessageList
                messages={messages}
                typing={typing}
                editingId={editingId}
                editDraft={editDraft}
                onEditDraftChange={setEditDraft}
                onStartEdit={startEdit}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onDelete={deleteMessage}
              />
            </div>

            <div className="chat-widget-input-wrap">
              <div className="chat-widget-input-row">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder="Ask anything about Himachal..."
                  className="chat-widget-input"
                  disabled={typing}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  className="chat-widget-send"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 text-[#0b1120]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={`chat-widget-trigger ${open ? 'chat-widget-trigger-active' : ''}`}
        aria-label={open ? 'Close WanderHive AI chat' : 'Open WanderHive AI chat'}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
