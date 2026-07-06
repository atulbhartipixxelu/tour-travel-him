import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Compass, User, ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLenisScroll } from '../../context/LenisContext'
import { navLinks } from '../../data/mockData'
import { Button } from '../common/SectionTitle'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { scrollY } = useLenisScroll()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrolled = scrollY > 40

  const navTextClass = isHome && !scrolled
    ? 'text-white/75 hover:text-white'
    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="container-custom pt-3 pointer-events-auto">
          <div
            className={`transition-all duration-300 rounded-2xl ${
              scrolled ? 'glass-premium py-2.5 px-3 shadow-lg' : 'py-1 px-1'
            }`}
          >
            <nav className="flex items-center justify-between gap-3 min-h-[52px]">
              <Link to="/" className="flex items-center gap-2.5 shrink-0">
                <div className="w-9 h-9 rounded-xl icon-gradient flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#0b1120]" />
                </div>
                <div className="leading-none">
                  <span className={`text-[15px] font-extrabold block font-[family-name:var(--font-display)] tracking-tight ${isHome && !scrolled ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                    WanderHive
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.24em] text-[var(--accent)] font-bold font-[family-name:var(--font-sans)]">.com</span>
                </div>
              </Link>

              <div className="nav-links">
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${navTextClass}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-white/8 transition-colors cursor-pointer"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark'
                    ? <Sun className="w-4 h-4 text-[var(--accent)]" />
                    : <Moon className="w-4 h-4 text-[var(--accent)]" />}
                </button>

                <Link to="/dashboard" className="hidden md:block">
                  <Button size="sm" className="!py-2 !px-4 !text-xs">
                    <User className="w-3.5 h-3.5" />
                    Dashboard
                  </Button>
                </Link>

                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/8 cursor-pointer"
                  aria-label="Open menu"
                >
                  <Menu className={`w-5 h-5 ${isHome && !scrolled ? 'text-white' : ''}`} />
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] glass-premium z-[70] lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--glass-border)]">
                <span className="font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-white/5 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 p-3 space-y-0.5 overflow-y-auto" data-lenis-prevent>
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium group"
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[var(--accent)] transition-opacity" />
                  </a>
                ))}
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium mt-3 border border-[var(--glass-border)]"
                >
                  <User className="w-4 h-4 text-[var(--accent)]" />
                  Dashboard
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
