import { motion } from 'framer-motion'
import { Star, Calendar, ArrowUpRight, Thermometer, MapPin } from 'lucide-react'
import { GlassCard } from './SectionTitle'
import type { Destination } from '../../types'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

interface DestinationCardProps {
  dest: Destination
  index?: number
}

export function DestinationCard({ dest, index = 0 }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      className="h-full"
    >
      <GlassCard className="overflow-hidden group h-full flex flex-col" premium hover>
        <div className="relative h-48 sm:h-52 shrink-0 overflow-hidden img-overlay">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={e => onImageError(e)}
          />
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full glass-premium text-xs font-semibold text-white">
            <Star className="w-3 h-3 text-[var(--accent)] fill-[var(--accent)]" />
            {dest.rating}
          </div>
          {dest.highlight && (
            <span className="absolute top-3 left-3 z-10 badge-luxury !text-[9px] !py-1">
              {dest.highlight}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] text-white leading-tight">
              {dest.name}
            </h3>
            <p className="text-white/55 text-xs mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {dest.country}
            </p>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              {dest.weather}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              {dest.bestTime}
            </span>
          </div>
          <div className="flex items-end justify-between mt-auto pt-1">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">From</p>
              <p className="text-lg font-bold gradient-text-gold font-[family-name:var(--font-display)] leading-tight">
                {formatPrice(dest.price)}
              </p>
            </div>
            <button
              type="button"
              className="w-9 h-9 rounded-full icon-gradient flex items-center justify-center hover:scale-110 transition-transform cursor-pointer shadow-md shrink-0"
              aria-label={`Book ${dest.name}`}
            >
              <ArrowUpRight className="w-4 h-4 text-[#0b1120]" />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
