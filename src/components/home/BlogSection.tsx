import { Calendar, ArrowRight } from 'lucide-react'
import SectionTitle, { GlassCard } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { blogs } from '../../data/mockData'
import { onImageError } from '../../utils/images'

export default function BlogSection() {
  return (
    <SectionShell id="blog" variant="default">
      <SectionTitle badge="Blog" title="Travel Blog" highlight="Blog" subtitle="Himachal travel tips, hidden destinations, budget guides, and safety advice." />
      <div className="grid-cards-3">
        {blogs.map(blog => (
          <GlassCard key={blog.id} className="overflow-hidden flex flex-col h-full cursor-pointer group" premium>
            <div className="h-44 shrink-0 overflow-hidden">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onError={e => onImageError(e)} />
            </div>
            <div className="p-4 flex flex-col flex-1 gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">{blog.category}</span>
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[var(--accent)] transition-colors">{blog.title}</h3>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 flex-1">{blog.excerpt}</p>
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--glass-border)]">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blog.date}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  )
}
