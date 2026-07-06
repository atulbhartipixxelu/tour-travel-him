import type { ComponentType } from 'react'

interface DashboardSidebarProps {
  items: { icon: ComponentType<{ className?: string }>; label: string; active?: boolean }[]
}

export default function DashboardSidebar({ items }: DashboardSidebarProps) {
  return (
    <nav className="space-y-1">
      {items.map(item => (
        <button
          key={item.label}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
            item.active ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-[var(--text-secondary)]'
          }`}
        >
          <item.icon className="w-4 h-4" /> {item.label}
        </button>
      ))}
    </nav>
  )
}
