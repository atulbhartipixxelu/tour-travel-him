import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Mic, Sparkles, MapPin, Play, Globe2, Users, Building2,
  Star, Thermometer, ChevronDown, ArrowRight,
} from 'lucide-react'
import { Button, AnimatedCounter } from '../common/SectionTitle'
import { heroStats } from '../../data/mockData'
import { himachalDestinations } from '../../data/himachalDestinations'
import { onImageError } from '../../utils/images'

const statIcons = [Globe2, Users, Building2, Sparkles]

const HERO_DESTINATION_IDS = ['hp1', 'hp7', 'hp2', 'hp13', 'hp3']

const heroSlides = HERO_DESTINATION_IDS.map(id => {
  const d = himachalDestinations.find(dest => dest.id === id)!
  return {
    name: d.name,
    region: d.region,
    tag: d.highlight ?? '',
    image: d.image.replace('w=800', 'w=1920'),
    thumb: d.image,
    weather: d.weather.split(' ')[0],
    rating: d.rating,
  }
})

const headlineWords = ['Where', 'Every', 'Journey', 'Becomes', 'a']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [searchDest, setSearchDest] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[activeSlide]

  return (
    <section className="hero-banner relative min-h-[100svh] overflow-hidden">
      {/* Animated Himachal backgrounds */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.name}
            className={`hero-slide ${i === activeSlide ? 'hero-slide-active' : ''}`}
            aria-hidden={i !== activeSlide}
          >
            <img
              src={s.image}
              alt={`${s.name}, Himachal Pradesh`}
              className="hero-slide-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              onError={e => onImageError(e, 1920)}
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-overlay" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="relative z-10 container-custom min-h-[100svh] flex flex-col pt-[calc(var(--nav-height)+1.25rem)] pb-8">
        <div className="hero-grid flex-1">
          {/* Left — animated copy */}
          <motion.div
            className="hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <span className="badge-luxury hero-badge-shimmer inline-flex">
                <Sparkles className="w-3.5 h-3.5" />
                Himachal Pradesh · WanderHive
              </span>
            </motion.div>

            <h1 className="hero-title mb-5">
              {headlineWords.map(word => (
                <motion.span
                  key={word}
                  variants={itemVariants}
                  className="hero-title-word inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={itemVariants}
                className="gradient-text-gold text-highlight block mt-1 sm:inline sm:mt-0"
              >
                Masterpiece
              </motion.span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-white/65 leading-relaxed mb-7 max-w-lg"
            >
              Explore 28+ Himachal destinations — Manali, Spiti, Shimla & beyond.
              WanderHive plans your trip, you live the adventure.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
              <Button size="md" onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}>
                <MapPin className="w-4 h-4" />
                Explore Himachal
              </Button>
              <Button variant="outline" size="md" className="!text-white !border-white/20 hover:!bg-white/10">
                <Play className="w-4 h-4" />
                Watch Journey
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {['Manali', 'Spiti', 'Shimla', 'Kasol'].map(dest => (
                <a
                  key={dest}
                  href="#destinations"
                  className="hero-search-tag"
                >
                  {dest}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — spotlight card + search */}
          <div className="hero-visual">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hero-spotlight-wrap"
            >
              <div className="hero-spotlight-card hero-panel-glass border-gradient">
                <div className="hero-spotlight-stage">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.name}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                      className="hero-spotlight-inner"
                    >
                    <img
                      src={slide.thumb}
                      alt={slide.name}
                      className="hero-spotlight-img"
                      loading="eager"
                      onError={e => onImageError(e, 900)}
                    />
                    <div className="hero-spotlight-gradient" />
                    <div className="hero-spotlight-content">
                      <span className="badge-luxury !text-[9px] mb-2">{slide.tag}</span>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-display)] text-white leading-tight">
                        {slide.name}
                      </h3>
                      <p className="text-white/55 text-xs mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {slide.region}, Himachal
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-xs text-white/80">
                          <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
                          {slide.rating}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-white/60">
                          <Thermometer className="w-3 h-3 text-[var(--accent-secondary)]" />
                          {slide.weather}
                        </span>
                      </div>
                    </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Slide dots */}
                <div className="hero-slide-dots">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.name}
                      type="button"
                      aria-label={`Show ${s.name}`}
                      onClick={() => setActiveSlide(i)}
                      className={`hero-slide-dot ${i === activeSlide ? 'hero-slide-dot-active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating mini card */}
              <motion.div
                className="hero-float-chip hero-panel-glass"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <div>
                  <p className="text-[10px] text-white/45 uppercase tracking-wider">Hive Pick</p>
                  <p className="text-xs font-semibold text-white">Best time to visit</p>
                </div>
              </motion.div>
            </motion.div>

            {/* AI Search panel */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="hero-search-panel hero-panel-glass border-gradient"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl icon-gradient flex items-center justify-center shrink-0 hero-search-icon-pulse">
                  <Sparkles className="w-4 h-4 text-[#0b1120]" />
                </div>
                <div>
                  <p className="hero-panel-title text-sm font-[family-name:var(--font-display)]">Hive Search</p>
                  <p className="hero-panel-subtitle text-xs">Find your next Himachal adventure in seconds</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 hero-field">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <input
                    type="text"
                    value={searchDest}
                    onChange={e => setSearchDest(e.target.value)}
                    placeholder="Manali, Spiti, Shimla..."
                    className="flex-1 bg-transparent outline-none text-sm min-w-0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="hero-field hero-field-muted text-sm">Check-in date</div>
                  <div className="hero-field hero-field-muted text-sm">Guests</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 !py-2.5 hero-search-btn">
                  <Search className="w-4 h-4" />
                  Search Trips
                </Button>
                <button type="button" className="p-2.5 rounded-full border border-white/15 hover:border-[var(--accent)]/40 transition-all cursor-pointer shrink-0" aria-label="Voice search">
                  <Mic className="w-4 h-4 text-[var(--accent)]" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hero-stats-strip hero-panel-glass"
        >
          {heroStats.map((stat, i) => {
            const Icon = statIcons[i] || Sparkles
            return (
              <div key={stat.label} className="hero-stat-item">
                <div className="w-9 h-9 rounded-xl hero-panel-icon-wrap flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-lg font-bold hero-panel-stat-value leading-none font-[family-name:var(--font-display)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] hero-panel-stat-label mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
                {i < heroStats.length - 1 && <div className="hero-stat-divider hidden sm:block" />}
              </div>
            )
          })}
          <a href="#destinations" className="hero-stat-cta hidden lg:flex">
            <span>Start Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-wrap">
        <motion.a
          href="#ai-assistant"
          className="hero-scroll-hint"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-2">Discover</span>
          <ChevronDown className="w-5 h-5 text-[var(--accent)]" />
        </motion.a>
      </div>
    </section>
  )
}
