import { motion } from 'framer-motion'
import { User, Heart, Calendar, CreditCard, Wallet, Bell, Ticket, Gift, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { GlassCard } from '../components/common/SectionTitle'

const sidebarItems = [
  { icon: User, label: 'Profile', active: true },
  { icon: Bookmark, label: 'Saved Trips' },
  { icon: Heart, label: 'Wishlist' },
  { icon: Calendar, label: 'Bookings' },
  { icon: CreditCard, label: 'Payment History' },
  { icon: Wallet, label: 'Wallet' },
  { icon: Gift, label: 'Rewards' },
  { icon: Bell, label: 'Notifications' },
  { icon: Ticket, label: 'Support Tickets' },
]

const recentBookings = [
  { title: 'Grand Horizon Resort, Goa', date: 'Apr 10-14, 2026', status: 'Confirmed', amount: '₹34,000' },
  { title: 'Maldives Honeymoon Package', date: 'May 1-6, 2026', status: 'Pending', amount: '₹1,20,000' },
  { title: 'Royal Enfield Rental', date: 'Mar 20-22, 2026', status: 'Completed', amount: '₹1,600' },
]

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <div className="container-custom pt-[calc(var(--nav-height)+1.5rem)] pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="text-sm text-cyan-400 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">User <span className="gradient-text">Dashboard</span></h1>
          <p className="text-[var(--text-secondary)] mb-8">Manage your profile, bookings, wallet, and rewards.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          <GlassCard className="p-4 lg:col-span-1" hover={false}>
            <nav className="space-y-1">
              {sidebarItems.map(item => (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${item.active ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-[var(--text-secondary)]'}`}>
                  <item.icon className="w-4 h-4" /> {item.label}
                </button>
              ))}
            </nav>
          </GlassCard>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Bookings', value: '12' },
                { label: 'Wallet Balance', value: '₹5,420' },
                { label: 'Reward Points', value: '2,850' },
              ].map(stat => (
                <GlassCard key={stat.label} className="p-5 text-center" hover={false}>
                  <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</p>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="p-6" hover={false}>
              <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {recentBookings.map(b => (
                  <div key={b.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl glass gap-2">
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{b.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${b.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : b.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{b.status}</span>
                      <span className="font-semibold text-sm">{b.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
