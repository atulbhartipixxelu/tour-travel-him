import { Plane, Hotel, Bus, Car, UserCheck, MapPin, Navigation } from 'lucide-react'
import SectionTitle, { GlassCard } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'

const trackingItems = [
  { icon: Navigation, title: 'Current Trip', status: 'En Route to Manali', time: 'ETA: 2h 30m' },
  { icon: Hotel, title: 'Hotel Check-in', status: 'Mountain View Lodge', time: 'Today, 2:00 PM' },
  { icon: Plane, title: 'Flight', status: 'AI 302 - On Time', time: 'Departs 6:45 AM' },
  { icon: Bus, title: 'Bus', status: 'Volvo AC - Seat 14', time: 'Tomorrow, 8:00 AM' },
  { icon: Car, title: 'Taxi', status: 'Driver: Ramesh', time: 'Arriving in 5 min' },
  { icon: UserCheck, title: 'Guide', status: 'Rajesh Kumar', time: 'Meeting at 10 AM' },
]

export default function TrackingSection() {
  return (
    <SectionShell id="tracking" variant="mesh">
      <SectionTitle badge="Live" title="Travel Tracking" highlight="Tracking" subtitle="Track your trip, hotel, flights, and guide location in real-time." />
      <div className="split-2">
        <div className="grid sm:grid-cols-2 gap-3">
          {trackingItems.map(item => (
            <GlassCard key={item.title} className="p-3.5 flex items-start gap-3" premium hover={false}>
              <div className="p-2 rounded-lg bg-[rgba(232,184,109,0.1)] text-[var(--accent)] shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-xs">{item.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">{item.status}</p>
                <p className="text-[11px] text-[var(--accent)] mt-0.5">{item.time}</p>
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-6 min-h-[280px] flex flex-col items-center justify-center text-center" hover={false} premium>
          <MapPin className="w-10 h-10 text-[var(--accent)] mb-3 floating" />
          <h3 className="font-semibold font-[family-name:var(--font-display)] text-lg mb-2">Live Map</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
            Real-time GPS tracking with QR check-in for your Himachal journey.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {['You', 'Hotel', 'Guide'].map(label => (
              <span key={label} className="px-2.5 py-1 rounded-full border border-[var(--glass-border)] text-[10px] text-[var(--text-muted)]">
                {label}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionShell>
  )
}
