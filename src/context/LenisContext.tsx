import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

interface LenisContextValue {
  scrollY: number
  scrollProgress: number
}

const LenisContext = createContext<LenisContextValue>({
  scrollY: 0,
  scrollProgress: 0,
})

export function LenisProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef({ scrollY: 0, scrollProgress: 0 })

  useEffect(() => {
    let lenis: Lenis | null = null

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4,
      })

      document.documentElement.classList.add('lenis', 'lenis-smooth')

      lenis.on('scroll', (instance: Lenis) => {
        pendingRef.current = {
          scrollY: instance.scroll,
          scrollProgress: instance.progress,
        }

        if (rafRef.current) return

        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = 0
          const { scrollY: y, scrollProgress: p } = pendingRef.current
          setScrollY(y)
          setScrollProgress(p)
        })
      })

      const handleAnchorClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
        if (!anchor || !lenis) return

        const href = anchor.getAttribute('href')
        if (!href || href === '#') return

        const target = document.querySelector(href)
        if (!target) return

        e.preventDefault()
        lenis.scrollTo(target as HTMLElement, { offset: -88, duration: 1.2 })
      }

      document.addEventListener('click', handleAnchorClick)

      let loopId = 0
      const loop = (time: number) => {
        lenis?.raf(time)
        loopId = requestAnimationFrame(loop)
      }
      loopId = requestAnimationFrame(loop)

      return () => {
        document.removeEventListener('click', handleAnchorClick)
        cancelAnimationFrame(loopId)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
        lenis?.destroy()
      }
    } catch {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return undefined
    }
  }, [])

  const value = useMemo(() => ({ scrollY, scrollProgress }), [scrollY, scrollProgress])

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenisScroll() {
  return useContext(LenisContext)
}
