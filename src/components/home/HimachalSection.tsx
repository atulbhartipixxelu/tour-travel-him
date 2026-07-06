import { useState } from 'react'
import { Star, MapPin, ArrowUpRight } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell, { TabBar } from '../common/SectionShell'
import { DestinationCard } from '../common/DestinationCard'
import { himachalDestinations, himachalRegions, type HimachalRegion } from '../../data/himachalDestinations'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

const INITIAL_COUNT = 9

export default function HimachalSection() {
  const [activeRegion, setActiveRegion] = useState<HimachalRegion>('All')
  const [showAll, setShowAll] = useState(false)

  const filtered =
    activeRegion === 'All'
      ? himachalDestinations
      : himachalDestinations.filter(d => d.region === activeRegion)

  const featured = filtered.slice(0, 3)
  const rest = filtered.slice(3)
  const visibleRest = showAll ? rest : rest.slice(0, INITIAL_COUNT - 3)

  const handleRegionChange = (region: string) => {
    setActiveRegion(region as HimachalRegion)
    setShowAll(false)
  }

  return (
    <SectionShell id="destinations" variant="alt">
      <SectionTitle
        badge="Himachal Pradesh"
        title="Explore Himachal Destinations"
        highlight="Destinations"
        subtitle={`${himachalDestinations.length} handpicked hill stations, valleys & adventure spots across Himachal.`}
      />

      <TabBar
        tabs={himachalRegions.map(r => ({ key: r, label: r }))}
        active={activeRegion}
        onChange={handleRegionChange}
      />

      <p className="section-meta">
        {filtered.length} destinations
        {activeRegion !== 'All' && <> · <span className="text-[var(--accent)]">{activeRegion}</span></>}
      </p>

      <div className="section-body">
        {featured.length > 0 && (
          <div className="grid-bento">
            {featured[0] && (
              <div className="md:col-span-7 md:row-span-2">
                <FeaturedCard dest={featured[0]} large />
              </div>
            )}
            {featured[1] && (
              <div className="md:col-span-5">
                <FeaturedCard dest={featured[1]} />
              </div>
            )}
            {featured[2] && (
              <div className="md:col-span-5">
                <FeaturedCard dest={featured[2]} />
              </div>
            )}
          </div>
        )}

        {visibleRest.length > 0 && (
          <div className="grid-cards-3">
            {visibleRest.map((dest, i) => (
              <DestinationCard key={dest.id} dest={dest} index={i} />
            ))}
          </div>
        )}
      </div>

      {!showAll && rest.length > INITIAL_COUNT - 3 && (
        <div className="section-actions">
          <Button variant="outline" size="lg" onClick={() => setShowAll(true)}>
            Show All {filtered.length} Destinations
          </Button>
        </div>
      )}

      {showAll && (
        <div className="section-actions">
          <Button size="lg">Plan Himachal Trip with AI</Button>
        </div>
      )}
    </SectionShell>
  )
}

function FeaturedCard({ dest, large = false }: { dest: typeof himachalDestinations[0]; large?: boolean }) {
  return (
    <GlassCard className={`overflow-hidden group h-full flex flex-col ${large ? 'min-h-[300px] md:min-h-[400px]' : 'min-h-[200px]'}`} premium>
      <div className={`relative flex-1 overflow-hidden img-overlay ${large ? 'min-h-[200px]' : 'min-h-[130px]'}`}>
        <img
          src={dest.image}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => onImageError(e)}
        />
        <span className="absolute top-3 left-3 z-10 badge-luxury !text-[9px]">Featured</span>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full glass-premium text-xs text-white">
          <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
          {dest.rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className={`font-semibold font-[family-name:var(--font-display)] text-white ${large ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {dest.name}
          </h3>
          <p className="text-white/55 text-xs flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {dest.region}
          </p>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between border-t border-[var(--glass-border)]">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">From</p>
          <p className="text-base font-bold gradient-text-gold font-[family-name:var(--font-display)]">{formatPrice(dest.price)}</p>
        </div>
        <button type="button" className="w-8 h-8 rounded-full icon-gradient flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <ArrowUpRight className="w-3.5 h-3.5 text-[#0b1120]" />
        </button>
      </div>
    </GlassCard>
  )
}
