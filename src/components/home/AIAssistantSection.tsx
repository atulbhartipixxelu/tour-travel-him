import { Send, Bot, Sparkles, Zap, Globe, Wallet, CloudSun } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { aiSuggestions } from '../../data/mockData'
import { HIMACHAL_CHAT_GREETING } from '../../utils/himachalAI'
import { useHimachalChat } from '../../hooks/useHimachalChat'
import ChatMessageList from '../ai/ChatMessageList'

const aiFeatures = [
  { icon: Globe, label: 'Travel Planner' },
  { icon: Wallet, label: 'Budget Calculator' },
  { icon: CloudSun, label: 'Weather AI' },
  { icon: Zap, label: 'Smart Search' },
]

export default function AIAssistantSection() {
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
  } = useHimachalChat(HIMACHAL_CHAT_GREETING)

  return (
    <SectionShell id="ai-assistant" variant="default">
      <SectionTitle
        badge="WanderHive AI"
        title="Your Travel Concierge"
        highlight="Concierge"
        subtitle="Instant AI recommendations from WanderHive — Himachal trips, hotels, budgets, and adventure planning."
      />

      <div className="split-ai">
        <div className="space-y-4">
          <GlassCard className="p-4" hover={false} premium>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-3">Quick Prompts</p>
            <div className="space-y-1.5">
              {aiSuggestions.map(suggestion => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  disabled={typing}
                  className="w-full text-left px-3 py-2.5 rounded-xl border border-[var(--glass-border)] hover:border-[rgba(232,184,109,0.3)] text-sm cursor-pointer flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  <span className="text-[var(--text-secondary)]">{suggestion}</span>
                </button>
              ))}
            </div>
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            {aiFeatures.map(({ icon: Icon, label }) => (
              <GlassCard key={label} className="p-3 text-center" hover={false}>
                <div className="w-8 h-8 rounded-lg bg-[rgba(232,184,109,0.1)] flex items-center justify-center mx-auto mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
                <p className="text-[11px] font-medium text-[var(--text-secondary)]">{label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard className="flex flex-col h-[480px]" hover={false} premium>
          <div className="px-4 py-3 border-b border-[var(--glass-border)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#0b1120]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">WanderHive AI</h4>
              <p className="text-[11px] text-emerald-400">{typing ? 'Thinking…' : 'Online · AI'}</p>
            </div>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 chat-panel-messages" data-lenis-prevent>
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
              bubbleClass="glass text-[var(--text-secondary)]"
            />
          </div>
          <div className="p-3 border-t border-[var(--glass-border)]">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--glass-border)] px-3 focus-within:border-[rgba(232,184,109,0.4)]">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                placeholder="Ask anything about Himachal..."
                className="flex-1 bg-transparent py-2.5 outline-none text-sm placeholder:text-[var(--text-muted)]"
                disabled={typing}
              />
              <Button
                size="sm"
                onClick={() => !typing && input.trim() && sendMessage(input)}
                className={`!px-3.5 ${typing || !input.trim() ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionShell>
  )
}
