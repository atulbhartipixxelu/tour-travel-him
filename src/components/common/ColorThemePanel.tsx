import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Sun, Moon, Check, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import type { ColorThemeId } from '../../data/colorThemes'

export default function ColorThemePanel() {
  const [open, setOpen] = useState(false)
  const { theme, colorTheme, toggleTheme, setColorTheme, colorThemes } = useTheme()

  return (
    <div className="theme-panel-wrap" data-lenis-prevent>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, x: 20, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="theme-panel glass-premium"
          >
            <div className="theme-panel-head">
              <div>
                <p className="theme-panel-title">Color Theme</p>
                <p className="theme-panel-sub">Pick your vibe</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="theme-panel-close"
                aria-label="Close theme panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="theme-mode-toggle">
              <button
                type="button"
                onClick={() => theme !== 'light' && toggleTheme()}
                className={`theme-mode-btn ${theme === 'light' ? 'theme-mode-btn-active' : ''}`}
              >
                <Sun className="w-3.5 h-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => theme !== 'dark' && toggleTheme()}
                className={`theme-mode-btn ${theme === 'dark' ? 'theme-mode-btn-active' : ''}`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark
              </button>
            </div>

            <div className="theme-color-grid">
              {colorThemes.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setColorTheme(item.id as ColorThemeId)}
                  className={`theme-color-option ${colorTheme === item.id ? 'theme-color-option-active' : ''}`}
                  aria-label={`${item.name} theme`}
                  title={item.name}
                >
                  <span className="theme-color-swatch">
                    <span style={{ background: item.swatch[0] }} />
                    <span style={{ background: item.swatch[1] }} />
                  </span>
                  <span className="theme-color-name">{item.name}</span>
                  {colorTheme === item.id && (
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={`theme-panel-trigger ${open ? 'theme-panel-trigger-active' : ''}`}
        aria-label="Open color theme settings"
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <Palette className="w-5 h-5" />
      </motion.button>
    </div>
  )
}
