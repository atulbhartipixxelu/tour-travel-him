import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass } from 'lucide-react'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] bg-[#050810] flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full icon-gradient flex items-center justify-center">
              <Compass className="w-8 h-8 text-[#0b1120] animate-spin" style={{ animationDuration: '2s' }} />
            </div>
            <p className="text-white/50 text-sm tracking-widest uppercase">WanderHive.com</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
