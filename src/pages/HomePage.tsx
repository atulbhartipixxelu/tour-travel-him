import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import AIAssistantSection from '../components/home/AIAssistantSection'
import HimachalSection from '../components/home/HimachalSection'
import StaySection from '../components/home/StaySection'
import RentalSection from '../components/home/RentalSection'
import TourSection from '../components/home/TourSection'
import GuideSection from '../components/home/GuideSection'
import TrackingSection from '../components/home/TrackingSection'
import StoreSection from '../components/home/StoreSection'
import BlogSection from '../components/home/BlogSection'
import ReviewsSection from '../components/home/ReviewsSection'
import MembershipSection from '../components/home/MembershipSection'
import ContactSection from '../components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="page-main">
        <HeroSection />
        <AIAssistantSection />
        <HimachalSection />
        <StaySection />
        <RentalSection />
        <TourSection />
        <GuideSection />
        <TrackingSection />
        <StoreSection />
        <BlogSection />
        <ReviewsSection />
        <MembershipSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
