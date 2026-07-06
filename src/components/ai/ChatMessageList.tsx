import { Pencil, Trash2, Check, X } from 'lucide-react'
import type { ChatMessage } from '../../types'
import ChatImageSlider from './ChatImageSlider'

interface ChatMessageListProps {
  messages: ChatMessage[]
  typing: boolean
  editingId: string | null
  editDraft: string
  onEditDraftChange: (v: string) => void
  onStartEdit: (id: string, content: string) => void
  onSaveEdit: (id: string) => void
  onCancelEdit: () => void
  onDelete: (id: string) => void
  bubbleClass?: string
}

export default function ChatMessageList({
  messages,
  typing,
  editingId,
  editDraft,
  onEditDraftChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  bubbleClass = 'chat-widget-bot-bubble',
}: ChatMessageListProps) {
  return (
    <>
      {messages.map(msg => {
        const id = msg.id ?? msg.content
        const isUser = msg.role === 'user'
        const isEditing = editingId === id && isUser
        const canEdit = isUser && id !== 'welcome'
        const canDelete = id !== 'welcome'

        return (
          <div
            key={id}
            className={`chat-msg-row flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`chat-msg-wrap max-w-[88%] ${isUser ? 'chat-msg-wrap-user' : 'chat-msg-wrap-bot'}`}>
              {isEditing ? (
                <div className="chat-msg-edit-box">
                  <textarea
                    value={editDraft}
                    onChange={e => onEditDraftChange(e.target.value)}
                    rows={3}
                    className="chat-msg-edit-input"
                    autoFocus
                  />
                  <div className="chat-msg-edit-actions">
                    <button type="button" onClick={() => onSaveEdit(id)} className="chat-msg-action-btn chat-msg-action-save" aria-label="Save edit">
                      <Check className="w-3.5 h-3.5" />
                      Save
                    </button>
                    <button type="button" onClick={onCancelEdit} className="chat-msg-action-btn chat-msg-action-cancel" aria-label="Cancel edit">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`chat-msg-bubble px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-wrap ${
                      isUser
                        ? 'chat-bubble-user rounded-br-sm font-medium'
                        : `${bubbleClass} rounded-bl-sm`
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isUser && msg.images && msg.images.length > 0 && (
                    <ChatImageSlider
                      images={msg.images}
                      messageId={String(id)}
                      googleMaps={msg.source === 'google'}
                    />
                  )}
                  {canDelete && (
                    <div className={`chat-msg-actions ${isUser ? 'chat-msg-actions-user' : 'chat-msg-actions-bot'}`}>
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => onStartEdit(id, msg.content)}
                          className="chat-msg-action-icon"
                          aria-label="Edit message"
                          title="Edit"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onDelete(id)}
                        className="chat-msg-action-icon chat-msg-action-delete"
                        aria-label="Delete message"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )
      })}
      {typing && (
        <div className="flex justify-start">
          <div className={`flex gap-1.5 px-3 py-2 ${bubbleClass} rounded-2xl w-fit`}>
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
