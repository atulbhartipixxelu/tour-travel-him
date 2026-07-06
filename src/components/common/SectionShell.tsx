import type { ReactNode } from 'react'

type SectionVariant = 'default' | 'alt' | 'dark' | 'mesh'

interface SectionShellProps {
  id?: string
  variant?: SectionVariant
  children: ReactNode
  className?: string
}

const variantClass: Record<SectionVariant, string> = {
  default: '',
  alt: 'section-alt',
  dark: 'section-dark',
  mesh: 'section-mesh',
}

export default function SectionShell({
  id,
  variant = 'default',
  children,
  className = '',
}: SectionShellProps) {
  return (
    <section id={id} className={`section-padding ${variantClass[variant]} ${className}`.trim()}>
      <div className="container-custom">{children}</div>
    </section>
  )
}

interface TabBarProps {
  tabs: { key: string; label: string }[]
  active: string
  onChange: (key: string) => void
  className?: string
}

export function TabBar({ tabs, active, onChange, className = '' }: TabBarProps) {
  return (
    <div className={`filter-bar section-filters ${className}`.trim()}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`filter-pill ${active === tab.key ? 'filter-pill-active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
