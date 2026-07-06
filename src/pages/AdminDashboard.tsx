import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Store, Hotel, Car, Bike, Package, CreditCard, FileText, Settings, Bot, BarChart3 } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { GlassCard } from '../components/common/SectionTitle'

const adminModules = [
  { icon: Users, label: 'User Management', count: '12,450' },
  { icon: Store, label: 'Vendor Management', count: '890' },
  { icon: Hotel, label: 'Hotel Management', count: '2,340' },
  { icon: Package, label: 'Tour Packages', count: '560' },
  { icon: Bike, label: 'Bike Rentals', count: '120' },
  { icon: Car, label: 'Car Rentals', count: '85' },
  { icon: CreditCard, label: 'Payments', count: '₹45L' },
  { icon: FileText, label: 'Blogs & CMS', count: '234' },
  { icon: Bot, label: 'AI Controls', count: 'Active' },
  { icon: BarChart3, label: 'Analytics', count: 'Live' },
  { icon: Settings, label: 'SEO Settings', count: 'Optimized' },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="container-custom pt-[calc(var(--nav-height)+1.5rem)] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="text-sm text-cyan-400 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">Admin <span className="gradient-text">Dashboard</span></h1>
          <p className="text-[var(--text-secondary)] mb-8">WanderHive admin — users, vendors, bookings, payments, AI, and CMS.</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Users', value: '12,450' },
            { label: 'Total Revenue', value: '₹45.2L' },
            { label: 'Active Bookings', value: '1,234' },
          ].map(stat => (
            <GlassCard key={stat.label} className="p-5 text-center" hover={false}>
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {adminModules.map((mod, i) => (
            <motion.div key={mod.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-5 cursor-pointer">
                <mod.icon className="w-7 h-7 text-cyan-400 mb-3" />
                <h4 className="font-semibold text-sm mb-1">{mod.label}</h4>
                <p className="text-xs text-[var(--text-secondary)]">{mod.count}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
