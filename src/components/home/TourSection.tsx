import { useState } from 'react'
import { Star, Clock } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell, { TabBar } from '../common/SectionShell'
import { tours, tourCategories } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

export default function TourSection() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? tours : tours.filter(t => t.category === active)

  return (
    <SectionShell id="tours" variant="alt">
      <SectionTitle badge="Tours" title="Tour Packages" highlight="Packages" subtitle="Domestic, adventure, honeymoon, family, and Himachal special tour packages." />
      <TabBar tabs={tourCategories.map(c => ({ key: c, label: c }))} active={active} onChange={setActive} />
      <div className="grid-cards-3">
        {filtered.map(tour => (
          <GlassCard key={tour.id} className="overflow-hidden flex flex-col h-full" premium>
            <div className="relative h-44 shrink-0 overflow-hidden img-overlay">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
              <span className="absolute top-3 left-3 z-10 badge-luxury !text-[9px]">{tour.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-1 gap-2">
              <h3 className="font-semibold text-sm line-clamp-2">{tour.title}</h3>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
                <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />{tour.rating}</span>
              </div>
              <div className="flex justify-between items-center mt-auto pt-2 border-t border-[var(--glass-border)]">
                <p className="font-bold gradient-text-gold text-sm">{formatPrice(tour.price)}</p>
                <Button size="sm">Book</Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  )
}
