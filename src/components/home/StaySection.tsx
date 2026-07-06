import { useState } from 'react'
import { Star, MapPin, ArrowUpRight } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell, { TabBar } from '../common/SectionShell'
import { hotels, rooms, pgs, roomCategories, pgTypes } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

const stayTabs = [
  { key: 'hotels', label: 'Hotels' },
  { key: 'rooms', label: 'Rooms' },
  { key: 'pg', label: 'PG / Hostel' },
]

export default function StaySection() {
  const [tab, setTab] = useState('hotels')
  const [priceFilter, setPriceFilter] = useState('all')
  const [roomCat, setRoomCat] = useState('all')
  const [pgType, setPgType] = useState('all')

  const filteredHotels = hotels.filter(h => {
    if (priceFilter === 'budget' && h.price > 5000) return false
    if (priceFilter === 'mid' && (h.price <= 5000 || h.price > 15000)) return false
    if (priceFilter === 'luxury' && h.price <= 15000) return false
    return true
  })

  const filteredRooms = roomCat === 'all' ? rooms : rooms.filter(r => r.category === roomCat)
  const filteredPgs = pgType === 'all' ? pgs : pgs.filter(p => p.type === pgType)

  return (
    <SectionShell id="hotels" variant="dark">
      <SectionTitle
        badge="Accommodation"
        title="Book Your Stay"
        highlight="Stay"
        subtitle="Hotels, rooms, guest houses, and PG accommodations across Himachal & India."
      />

      <div className="filter-group">
        <TabBar tabs={stayTabs} active={tab} onChange={setTab} />

        {tab === 'hotels' && (
          <TabBar
            tabs={[
              { key: 'all', label: 'All' },
              { key: 'budget', label: 'Budget' },
              { key: 'mid', label: 'Mid-Range' },
              { key: 'luxury', label: 'Luxury' },
            ]}
            active={priceFilter}
            onChange={setPriceFilter}
          />
        )}

        {tab === 'rooms' && (
          <TabBar
            tabs={[{ key: 'all', label: 'All' }, ...roomCategories.map(c => ({ key: c.key, label: c.label }))]}
            active={roomCat}
            onChange={setRoomCat}
          />
        )}

        {tab === 'pg' && (
          <TabBar
            tabs={[{ key: 'all', label: 'All' }, ...pgTypes.map(t => ({ key: t.key, label: t.label }))]}
            active={pgType}
            onChange={setPgType}
          />
        )}
      </div>

      {tab === 'hotels' && (
        <div className="grid-cards-3">
          {filteredHotels.map(hotel => (
            <GlassCard key={hotel.id} className="overflow-hidden flex flex-col h-full" premium>
              <div className="relative h-44 shrink-0 img-overlay">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
                {hotel.available && (
                  <span className="absolute top-3 left-3 z-10 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/90 text-white font-bold uppercase">Live</span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-semibold text-sm leading-snug">{hotel.name}</h3>
                  <span className="flex items-center gap-0.5 text-xs text-[var(--accent)] shrink-0">
                    <Star className="w-3 h-3 fill-current" />{hotel.rating}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1"><MapPin className="w-3 h-3" />{hotel.location}</p>
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map(a => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--glass-border)] text-[var(--text-muted)]">{a}</span>
                  ))}
                </div>
                <div className="flex items-end justify-between mt-auto pt-2 border-t border-[var(--glass-border)]">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">/night</p>
                    <p className="font-bold gradient-text-gold font-[family-name:var(--font-display)]">{formatPrice(hotel.price)}</p>
                  </div>
                  <button type="button" className="w-8 h-8 rounded-full icon-gradient flex items-center justify-center cursor-pointer">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0b1120]" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === 'rooms' && (
        <div className="grid-cards-3">
          {filteredRooms.map(room => (
            <GlassCard key={room.id} className="overflow-hidden flex flex-col h-full" premium>
              <div className="h-44 shrink-0 overflow-hidden">
                  <img src={room.image} alt={room.type} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm">{room.type}</h3>
                  <span className="text-xs flex items-center gap-0.5"><Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />{room.rating}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-1"><MapPin className="w-3 h-3" />{room.location}</p>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-[var(--glass-border)]">
                  <p className="font-bold gradient-text-gold text-sm">{formatPrice(room.price)}<span className="text-[10px] font-normal text-[var(--text-muted)]">/night</span></p>
                  <Button size="sm">Book</Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === 'pg' && (
        <div className="grid-cards-3">
          {filteredPgs.map(pg => (
            <GlassCard key={pg.id} className="overflow-hidden flex flex-col h-full" premium>
              <div className="h-44 shrink-0 overflow-hidden">
                  <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-semibold text-sm">{pg.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">{pg.location}</p>
                <div className="flex flex-wrap gap-1">
                  {pg.amenities.map(a => (
                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--glass-border)] text-[var(--text-muted)]">{a}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-[var(--glass-border)]">
                  <p className="font-bold gradient-text-gold text-sm">{formatPrice(pg.price)}<span className="text-[10px] font-normal text-[var(--text-muted)]">/mo</span></p>
                  <Button size="sm">Book PG</Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </SectionShell>
  )
}
