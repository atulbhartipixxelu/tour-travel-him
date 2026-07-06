import { Check, Crown, Gem } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { membershipPlans } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'

const planIcons = [Gem, Crown, Crown]

export default function MembershipSection() {
  return (
    <SectionShell id="membership" variant="alt">
      <SectionTitle badge="Premium" title="Membership Plans" highlight="Plans" subtitle="Extra discounts, priority support, and exclusive Himachal travel deals." />
      <div className="grid-cards-3">
        {membershipPlans.map((plan, i) => {
          const Icon = planIcons[i] || Gem
          return (
            <GlassCard key={plan.id} className={`p-5 h-full flex flex-col relative ${plan.popular ? 'ring-1 ring-[var(--accent)]/40' : ''}`} hover={false} premium>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-luxury !text-[9px] whitespace-nowrap">
                  <Crown className="w-3 h-3" /> Popular
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-[rgba(232,184,109,0.1)] flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <h3 className="font-semibold font-[family-name:var(--font-display)]">{plan.name}</h3>
              <p className="text-2xl font-bold gradient-text-gold font-[family-name:var(--font-display)] my-3">
                {formatPrice(plan.price)}<span className="text-xs font-normal text-[var(--text-muted)]">/yr</span>
              </p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">Get {plan.name}</Button>
            </GlassCard>
          )
        })}
      </div>
    </SectionShell>
  )
}
