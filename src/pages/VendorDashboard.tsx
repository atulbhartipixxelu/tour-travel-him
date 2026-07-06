import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building, Bed, BarChart3, Calendar, DollarSign, Image, Package } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { GlassCard } from '../components/common/SectionTitle'

const vendorStats = [
  { icon: Building, label: 'Active Listings', value: '8' },
  { icon: Calendar, label: 'Bookings Today', value: '14' },
  { icon: DollarSign, label: 'Revenue (Month)', value: '₹2.4L' },
  { icon: BarChart3, label: 'Occupancy Rate', value: '78%' },
]

const vendorActions = [
  { icon: Package, label: 'Add Listings' },
  { icon: Bed, label: 'Manage Rooms' },
  { icon: Image, label: 'Upload Images' },
  { icon: Calendar, label: 'Manage Bookings' },
  { icon: DollarSign, label: 'Update Prices' },
  { icon: BarChart3, label: 'View Analytics' },
]

export default function VendorDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="container-custom pt-[calc(var(--nav-height)+1.5rem)] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="text-sm text-cyan-400 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">Vendor <span className="gradient-text">Dashboard</span></h1>
          <p className="text-[var(--text-secondary)] mb-8">Manage your listings, bookings, prices, and analytics.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {vendorStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-5" hover={false}>
                <stat.icon className="w-8 h-8 text-cyan-400 mb-3" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="p-6" hover={false}>
          <h3 className="font-bold text-lg mb-6">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendorActions.map(action => (
              <button key={action.label} className="flex items-center gap-3 p-4 rounded-xl glass hover:bg-white/5 transition-all cursor-pointer text-left">
                <action.icon className="w-5 h-5 text-indigo-400" />
                <span className="font-medium text-sm">{action.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      </div>
      <Footer />
    </div>
  )
}
