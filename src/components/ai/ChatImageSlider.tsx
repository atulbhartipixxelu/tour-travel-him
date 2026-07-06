import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ChatImage } from '../../types'
import { onImageError } from '../../utils/images'

interface ChatImageSliderProps {
  images: ChatImage[]
  messageId: string
  googleMaps?: boolean
}

export default function ChatImageSlider({ images, messageId, googleMaps }: ChatImageSliderProps) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const current = images[index] ?? images[0]
  const isGoogle = googleMaps ?? images.some(img => img.src.includes('/api/places/photo'))

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex(i => (i + dir + total) % total)
    },
    [total],
  )

  if (!current) return null

  return (
    <div className="chat-image-slider" aria-label="Photo gallery">
      {isGoogle && <span className="chat-image-slider-badge">Google Maps</span>}
      <div className="chat-image-slider-viewport">
        <img
          key={`${messageId}-${index}-${current.src}`}
          src={current.src}
          alt={current.alt}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="chat-image-slider-img"
          onError={e => onImageError(e, 640)}
        />
        {total > 1 && (
          <>
            <button
              type="button"
              className="chat-image-slider-nav chat-image-slider-prev"
              onClick={() => go(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="chat-image-slider-nav chat-image-slider-next"
              onClick={() => go(1)}
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="chat-image-slider-counter">
              {index + 1} / {total}
            </span>
          </>
        )}
      </div>

      {current.caption && (
        <p className="chat-image-slider-caption">{current.caption}</p>
      )}

      {total > 1 && (
        <div className="chat-image-slider-dots" role="tablist" aria-label="Photo slides">
          {images.map((img, i) => (
            <button
              key={`${messageId}-dot-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}: ${img.alt}`}
              className={`chat-image-slider-dot${i === index ? ' chat-image-slider-dot-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
