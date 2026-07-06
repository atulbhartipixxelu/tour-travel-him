import { ShoppingBag } from 'lucide-react'
import SectionTitle, { GlassCard, Button } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { products } from '../../data/mockData'
import { formatPrice } from '../../utils/helpers'
import { onImageError } from '../../utils/images'

export default function StoreSection() {
  return (
    <SectionShell id="store" variant="alt">
      <SectionTitle badge="Shop" title="Travel Store" highlight="Store" subtitle="Bags, shoes, jackets, and trekking gear for your Himachal adventure." />
      <div className="grid-cards">
        {products.map(product => (
          <GlassCard key={product.id} className="overflow-hidden flex flex-col h-full" premium>
            <div className="relative h-44 shrink-0 overflow-hidden bg-[var(--bg-secondary)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={e => onImageError(e)}
              />
              <span className="absolute top-2.5 left-2.5 badge-luxury !text-[9px] !py-0.5">{product.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-1 gap-2">
              <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--glass-border)]">
                <p className="font-bold gradient-text-gold text-sm font-[family-name:var(--font-display)]">{formatPrice(product.price)}</p>
                <button type="button" className="w-8 h-8 rounded-full icon-gradient flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" aria-label="Add to cart">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#0b1120]" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="section-actions">
        <Button variant="outline" size="lg">View All Products</Button>
      </div>
    </SectionShell>
  )
}
