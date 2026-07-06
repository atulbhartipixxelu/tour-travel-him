import { motion } from 'framer-motion'

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <motion.div
        className="aurora-orb absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(232,184,109,0.25) 0%, transparent 70%)' }}
      />
      <motion.div
        className="aurora-orb absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)', animationDelay: '4s' }}
      />
      <motion.div
        className="aurora-orb absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(201,151,58,0.15) 0%, transparent 70%)', animationDelay: '8s' }}
      />
    </div>
  )
}
