import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import SectionTitle, { GlassCard } from '../common/SectionTitle'
import SectionShell from '../common/SectionShell'
import { reviews } from '../../data/mockData'
import 'swiper/css'
import 'swiper/css/pagination'

export default function ReviewsSection() {
  return (
    <SectionShell id="reviews" variant="default">
      <SectionTitle badge="Reviews" title="Traveler Stories" highlight="Stories" subtitle="Real experiences from Himachal travelers on WanderHive.com." />
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="!pb-12"
      >
        {reviews.map(review => (
          <SwiperSlide key={review.id} className="!h-auto">
            <GlassCard className="p-5 h-full flex flex-col" hover={false} premium>
              <Quote className="w-8 h-8 text-[var(--accent)]/20 mb-3" />
              <p className="text-sm text-[var(--text-secondary)] flex-1 leading-relaxed font-[family-name:var(--font-sans)] italic">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-2.5 pt-4 mt-4 border-t border-[var(--glass-border)]">
                <img src={review.image} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-xs">{review.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
                    <span className="text-[10px] text-[var(--text-muted)]">{review.destination}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionShell>
  )
}
