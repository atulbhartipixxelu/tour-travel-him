import { Star, BadgeCheck, Languages } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { guides } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'

export default function GuideSection() {
  return (
    <SectionShell id="guides" variant="dark">
      <SectionTitle badge="Guides" title="Local Travel Guides" highlight="Guides" subtitle="Verified Himachal guides with language support and instant booking." />
      <div className="grid-cards-3">
        {guides.map(guide => (
          <GlassCard key={guide.id} className="p-5 text-center flex flex-col items-center h-full" premium hover={false}>
            <div className="relative w-20 h-20 mb-3 shrink-0">
              <img src={guide.image} alt={guide.name} className="w-full h-full rounded-full object-cover ring-2 ring-[var(--accent)]/30" />
              {guide.verified && <BadgeCheck className="absolute -bottom-0.5 -right-0.5 w-6 h-6 text-[var(--accent)] fill-[var(--bg-primary)]" />}
            </div>
            <h3 className="font-semibold text-sm">{guide.name}</h3>
            <div className="flex items-center gap-1 my-1.5 text-xs">
              <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
              {guide.rating} · {guide.experience} yrs
            </div>
            <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mb-3">
              <Languages className="w-3 h-3" />{guide.languages.join(', ')}
            </p>
            <p className="font-bold gradient-text-gold text-sm mb-3">{formatPrice(guide.charge)}/day</p>
            <Button size="sm" className="mt-auto w-full">Book Guide</Button>
          </GlassCard>
        ))}
      </div>
    </SectionShell>
  )
}
