import { useLenisScroll } from '../../context/LenisContext'

export default function ScrollProgressBar() {
  const { scrollY, scrollProgress } = useLenisScroll()

  if (scrollY < 80) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] transition-transform duration-150 scroll-progress-bar"
      style={{ transform: `scaleX(${scrollProgress})` }}
    />
  )
}
