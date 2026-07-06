import { Compass, Mail, Phone, MapPin, Share2, Globe, Video } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--glass-border)]">
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />

      <div className="container-custom py-16 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl icon-gradient flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#0b1120]" />
              </div>
              <div>
                <span className="text-xl font-bold block leading-none">WanderHive</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">.com</span>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 max-w-xs">
              Your travel hive — plan, book, and explore Himachal & beyond with AI-powered journeys.
            </p>
            <div className="flex gap-3">
              {[Share2, Globe, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl border border-[var(--glass-border)] flex items-center justify-center hover:border-[var(--accent)]/40 hover:bg-[rgba(232,184,109,0.06)] transition-all">
                  <Icon className="w-4 h-4 text-[var(--text-secondary)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              {['Destinations', 'Hotels', 'Tours', 'Rentals', 'Travel Store'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-[var(--accent)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">Platform</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><Link to="/dashboard" className="hover:text-[var(--accent)] transition-colors">User Dashboard</Link></li>
              <li><Link to="/vendor" className="hover:text-[var(--accent)] transition-colors">Vendor Portal</Link></li>
              <li><Link to="/admin" className="hover:text-[var(--accent)] transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-widest text-[var(--accent)] font-semibold mb-5">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                <div className="w-9 h-9 rounded-xl bg-[rgba(232,184,109,0.08)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                </div>
                hello@wanderhive.com
              </li>
              <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                <div className="w-9 h-9 rounded-xl bg-[rgba(232,184,109,0.08)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                </div>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-[var(--text-secondary)]">
                <div className="w-9 h-9 rounded-xl bg-[rgba(232,184,109,0.08)] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[var(--accent)]" />
                </div>
                Bandra Kurla Complex, Mumbai
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>&copy; 2026 WanderHive.com. Crafted with precision.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Security'].map(item => (
              <a key={item} href="#" className="hover:text-[var(--accent)] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
