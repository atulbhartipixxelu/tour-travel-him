import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionTitleProps {
  badge?: string
  title: string
  highlight?: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ badge, title, highlight, subtitle, align = 'center' }: SectionTitleProps) {
  const highlightWord = highlight || title.split(' ').slice(-1)[0]
  const restWords = highlight ? title.replace(highlight, '').trim() : title.split(' ').slice(0, -1).join(' ')

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`section-head ${align === 'left' ? 'section-head-left' : ''}`}
    >
      {badge && (
        <div className={`mb-3 ${align === 'center' ? 'flex justify-center' : ''}`}>
          <span className="badge-luxury inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {badge}
          </span>
        </div>
      )}

      <h2 className={`text-2xl md:text-3xl lg:text-[2.25rem] font-extrabold font-[family-name:var(--font-display)] leading-[1.08] tracking-tight mb-3 ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
        {restWords && <span className="text-[var(--text-primary)]">{restWords} </span>}
        <span className="gradient-text-gold text-highlight">{highlightWord}</span>
      </h2>

      <div className={`section-divider mb-4 ${align === 'center' ? 'section-divider-center' : ''}`} />

      {subtitle && (
        <p className={`text-sm md:text-base text-[var(--text-secondary)] leading-relaxed max-w-lg ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.header>
  )
}

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  premium?: boolean
}

export function GlassCard({ children, className = '', hover = true, premium = false }: GlassCardProps) {
  return (
    <div className={`${premium ? 'glass-premium' : 'glass-card'} rounded-2xl ${hover ? 'card-tilt' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export function Button({ children, variant = 'primary', size = 'md', className = '', onClick }: ButtonProps) {
  const variants = {
    primary: 'btn-primary text-[#0b1120]',
    secondary: 'glass text-[var(--text-primary)] hover:border-[rgba(232,184,109,0.3)]',
    outline: 'btn-ghost',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--accent)] border-none shadow-none',
  }
  const sizes = {
    sm: 'px-5 py-2.5 text-xs tracking-wide',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-full font-semibold transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="gradient-text-gold font-[family-name:var(--font-display)]"
    >
      {value}{suffix}
    </motion.span>
  )
}
