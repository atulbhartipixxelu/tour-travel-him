import { useState } from 'react'
import { Bike, Car, Navigation, CreditCard } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell, { TabBar } from '../common/SectionShell'
import { bikes, cars } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

const rentalTabs = [
  { key: 'bike', label: 'Bikes' },
  { key: 'car', label: 'Cars' },
]

export default function RentalSection() {
  const [tab, setTab] = useState('bike')

  return (
    <SectionShell id="rentals" variant="mesh">
      <SectionTitle
        badge="Rentals"
        title="Bike & Car Rental"
        highlight="Rental"
        subtitle="Self-drive bikes and cars with GPS tracking, live pricing, and instant booking."
      />

      <TabBar tabs={rentalTabs} active={tab} onChange={setTab} />

      {tab === 'bike' && (
        <div className="grid-cards-3">
          {bikes.map(bike => (
            <GlassCard key={bike.id} className="overflow-hidden flex flex-col h-full text-center" premium>
              <div className="h-40 relative shrink-0 overflow-hidden">
                <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md glass-premium text-[10px] flex items-center gap-1">
                  <Bike className="w-3 h-3" />{bike.type}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-3">
                <h3 className="font-semibold text-sm">{bike.name}</h3>
                <div className="space-y-1 text-xs text-[var(--text-muted)]">
                  <p>Daily: <span className="text-[var(--text-primary)] font-medium">{formatPrice(bike.dailyPrice)}</span></p>
                  <p>Weekly: <span className="text-[var(--text-primary)] font-medium">{formatPrice(bike.weeklyPrice)}</span></p>
                </div>
                <Button size="sm" className="w-full mt-auto">Rent Now</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {tab === 'car' && (
        <div className="grid-cards-3">
          {cars.map(car => (
            <GlassCard key={car.id} className="overflow-hidden flex flex-col h-full" premium>
              <div className="h-40 shrink-0 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" loading="lazy" onError={e => onImageError(e)} />
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                  <Car className="w-3.5 h-3.5" />{car.type}
                </div>
                <h3 className="font-semibold text-sm">{car.name}</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {car.selfDrive && <span className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--glass-border)]">Self Drive</span>}
                  {car.driverIncluded && <span className="text-[10px] px-2 py-0.5 rounded-md border border-[var(--glass-border)]">Driver</span>}
                </div>
                <div className="flex gap-3 text-[10px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />GPS</span>
                  <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" />Online Pay</span>
                </div>
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-[var(--glass-border)]">
                  <p className="font-bold gradient-text-gold text-sm">{formatPrice(car.price)}<span className="text-[10px] font-normal text-[var(--text-muted)]">/day</span></p>
                  <Button size="sm">Rent</Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </SectionShell>
  )
}
