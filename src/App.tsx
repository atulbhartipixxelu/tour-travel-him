import { Routes, Route } from 'react-router-dom'
import Loader from './components/common/Loader'
import AmbientBackground from './components/common/AmbientBackground'
import ScrollProgressBar from './components/common/ScrollProgressBar'
import ColorThemePanel from './components/common/ColorThemePanel'
import FloatingChatWidget from './components/ai/FloatingChatWidget'
import HomePage from './pages/HomePage'
import UserDashboard from './pages/UserDashboard'
import VendorDashboard from './pages/VendorDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-x-hidden">
      <AmbientBackground />
      <ScrollProgressBar />
      <Loader />
      <ColorThemePanel />
      <FloatingChatWidget />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  )
}
