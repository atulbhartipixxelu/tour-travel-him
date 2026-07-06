import type { Destination, Hotel, Room, PG, Bike, Car, TourPackage, Guide, Product, Blog, Review, MembershipPlan } from '../types'

export const destinations: Destination[] = [
  { id: '1', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', rating: 4.9, price: 45000, weather: '28°C Sunny', bestTime: 'Apr - Oct' },
  { id: '2', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', rating: 4.8, price: 85000, weather: '18°C Cloudy', bestTime: 'Apr - Jun' },
  { id: '3', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', rating: 4.7, price: 65000, weather: '35°C Hot', bestTime: 'Nov - Mar' },
  { id: '4', name: 'Goa', country: 'India', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', rating: 4.6, price: 15000, weather: '30°C Sunny', bestTime: 'Nov - Feb' },
  { id: '5', name: 'Switzerland', country: 'Europe', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f4d99bb9?w=800', rating: 4.9, price: 120000, weather: '12°C Cool', bestTime: 'Jun - Sep' },
  { id: '6', name: 'Maldives', country: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', rating: 4.9, price: 95000, weather: '29°C Sunny', bestTime: 'Nov - Apr' },
]

export const hotels: Hotel[] = [
  { id: '1', name: 'Grand Horizon Resort', location: 'Goa, India', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', rating: 4.8, price: 8500, amenities: ['Pool', 'Spa', 'WiFi', 'Breakfast'], available: true },
  { id: '2', name: 'Skyline Luxury Hotel', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', rating: 4.9, price: 22000, amenities: ['Pool', 'Gym', 'Spa', 'Parking'], available: true },
  { id: '3', name: 'Mountain View Lodge', location: 'Manali, India', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80&auto=format&fit=crop', rating: 4.5, price: 4500, amenities: ['WiFi', 'Heater', 'Restaurant'], available: true },
  { id: '4', name: 'Ocean Breeze Inn', location: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', rating: 4.7, price: 12000, amenities: ['Pool', 'Beach', 'Spa', 'WiFi'], available: false },
]

export const rooms: Room[] = [
  { id: '1', type: 'Cozy Guest House', category: 'guesthouse', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', price: 1200, rating: 4.3, location: 'Jaipur' },
  { id: '2', type: 'Backpacker Hostel', category: 'hostel', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800', price: 500, rating: 4.1, location: 'Rishikesh' },
  { id: '3', type: 'Heritage Homestay', category: 'homestay', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', price: 2500, rating: 4.7, location: 'Kerala' },
  { id: '4', type: 'Presidential Suite', category: 'luxury', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', price: 15000, rating: 4.9, location: 'Mumbai' },
  { id: '5', type: 'Budget Room', category: 'budget', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format&fit=crop', price: 800, rating: 3.9, location: 'Delhi' },
  { id: '6', type: 'Shared Dorm', category: 'shared', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d509022?w=800&q=80&auto=format&fit=crop', price: 400, rating: 4.0, location: 'Goa' },
]

export const pgs: PG[] = [
  { id: '1', name: 'Elite Boys PG', type: 'boys', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', price: 8000, amenities: ['WiFi', 'Food', 'AC', 'Laundry'], location: 'Bangalore' },
  { id: '2', name: 'Safe Haven Girls PG', type: 'girls', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', price: 9500, amenities: ['WiFi', 'Food', 'AC', 'Security'], location: 'Pune' },
  { id: '3', name: 'Family Comfort PG', type: 'family', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', price: 12000, amenities: ['WiFi', 'Food', 'Parking', 'Non-AC'], location: 'Hyderabad' },
]

export const bikes: Bike[] = [
  { id: '1', name: 'Honda Activa', type: 'Scooty', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', dailyPrice: 300, weeklyPrice: 1800, monthlyPrice: 6000 },
  { id: '2', name: 'Royal Enfield Classic', type: 'Royal Enfield', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80&auto=format&fit=crop', dailyPrice: 800, weeklyPrice: 4800, monthlyPrice: 15000 },
  { id: '3', name: 'Kawasaki Ninja', type: 'Sports Bike', image: 'https://images.unsplash.com/photo-1449426460159-d05709874355?w=800&q=80&auto=format&fit=crop', dailyPrice: 1500, weeklyPrice: 9000, monthlyPrice: 28000 },
  { id: '4', name: 'Himalayan 411', type: 'Adventure Bike', image: 'https://images.unsplash.com/photo-1449426460159-d05709874355?w=800&q=80&auto=format&fit=crop', dailyPrice: 1000, weeklyPrice: 6000, monthlyPrice: 20000 },
  { id: '5', name: 'Ather 450X', type: 'Electric Bike', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80&auto=format&fit=crop', dailyPrice: 500, weeklyPrice: 3000, monthlyPrice: 10000 },
]

export const cars: Car[] = [
  { id: '1', name: 'Maruti Swift', type: 'Hatchback', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800', price: 1500, selfDrive: true, driverIncluded: false },
  { id: '2', name: 'Honda City', type: 'Sedan', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', price: 2500, selfDrive: true, driverIncluded: true },
  { id: '3', name: 'Toyota Fortuner', type: 'SUV', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800', price: 4500, selfDrive: true, driverIncluded: true },
  { id: '4', name: 'Mercedes S-Class', type: 'Luxury', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', price: 12000, selfDrive: false, driverIncluded: true },
]

export const tours: TourPackage[] = [
  { id: '1', title: 'Golden Triangle India', category: 'Domestic', image: 'https://images.unsplash.com/photo-1524492412937-280cea9fd594?w=800', duration: '7 Days', price: 35000, rating: 4.8 },
  { id: '2', title: 'Swiss Alps Adventure', category: 'International', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f4d99bb9?w=800', duration: '10 Days', price: 180000, rating: 4.9 },
  { id: '3', title: 'Maldives Honeymoon', category: 'Honeymoon', image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800', duration: '5 Days', price: 120000, rating: 4.9 },
  { id: '4', title: 'Rishikesh Rafting', category: 'Adventure', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800', duration: '3 Days', price: 12000, rating: 4.6 },
  { id: '5', title: 'Disney Family Tour', category: 'Family', image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=800', duration: '8 Days', price: 250000, rating: 4.7 },
  { id: '6', title: 'Varanasi Spiritual', category: 'Religious', image: 'https://images.unsplash.com/photo-1561361513-2ae579a7cf622?w=800', duration: '4 Days', price: 18000, rating: 4.5 },
  { id: '7', title: 'Ranthambore Safari', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800', duration: '3 Days', price: 22000, rating: 4.7 },
  { id: '8', title: 'Dubai Luxury Escape', category: 'Luxury', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', duration: '6 Days', price: 150000, rating: 4.8 },
]

export const guides: Guide[] = [
  { id: '1', name: 'Rajesh Kumar', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', languages: ['Hindi', 'English'], rating: 4.9, experience: 8, charge: 2000, verified: true },
  { id: '2', name: 'Maria Santos', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', languages: ['English', 'Spanish'], rating: 4.8, experience: 5, charge: 3500, verified: true },
  { id: '3', name: 'Ahmed Hassan', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', languages: ['Arabic', 'English', 'French'], rating: 4.7, experience: 12, charge: 4000, verified: true },
]

export const products: Product[] = [
  { id: '1', name: 'Travel Backpack 40L', category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', price: 2999 },
  { id: '2', name: 'Hard Shell Suitcase', category: 'Suitcases', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', price: 5499 },
  { id: '3', name: 'Trekking Shoes Pro', category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', price: 3999 },
  { id: '4', name: 'Waterproof Jacket', category: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', price: 2499 },
  { id: '5', name: 'Memory Foam Pillow', category: 'Travel Pillow', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d509022?w=800&q=80', price: 899 },
  { id: '6', name: '20000mAh Power Bank', category: 'Power Bank', image: 'https://images.unsplash.com/photo-1609091839311-d5365a9f1f49?w=800&q=80', price: 1499 },
  { id: '7', name: 'DSLR Camera Kit', category: 'Camera', image: 'https://images.unsplash.com/photo-1495121553079-a98324465aee?w=800&q=80', price: 45999 },
  { id: '8', name: 'Trekking Pole Set', category: 'Trekking', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800', price: 1299 },
]

export const blogs: Blog[] = [
  { id: '1', title: '10 Hidden Gems in Southeast Asia', category: 'Hidden Destinations', image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf653b3?w=800', excerpt: 'Discover breathtaking places tourists rarely visit.', date: 'Mar 15, 2026' },
  { id: '2', title: 'Complete Visa Guide for Indians', category: 'Visa Guide', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800', excerpt: 'Everything you need to know about visa applications.', date: 'Mar 10, 2026' },
  { id: '3', title: 'Travel on ₹5000 Budget', category: 'Budget Tips', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', excerpt: 'Smart tips to explore India without breaking the bank.', date: 'Mar 5, 2026' },
  { id: '4', title: 'Solo Travel Safety Guide', category: 'Safety Tips', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', excerpt: 'Essential safety tips for solo travelers worldwide.', date: 'Feb 28, 2026' },
]

export const reviews: Review[] = [
  { id: '1', name: 'Priya Sharma', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', rating: 5, text: 'WanderHive planned our Manali honeymoon perfectly. Every recommendation was spot on!', destination: 'Manali' },
  { id: '2', name: 'James Wilson', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', rating: 5, text: 'The Hive AI assistant saved me hours of research. Best travel platform I have used.', destination: 'Spiti Valley' },
  { id: '3', name: 'Ananya Patel', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', rating: 4, text: 'Bike rental through WanderHive was seamless and the tracking kept my family updated.', destination: 'Kasol' },
  { id: '4', name: 'Carlos Mendez', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', rating: 5, text: 'Premium experience from booking to checkout on WanderHive.com. Highly recommended!', destination: 'Shimla' },
]

export const membershipPlans: MembershipPlan[] = [
  { id: '1', name: 'Explorer', price: 499, features: ['5% Extra Discount', 'Standard Support', 'Monthly Offers'] },
  { id: '2', name: 'Voyager', price: 999, features: ['15% Extra Discount', 'Priority Support', 'Cashback 2%', 'Faster Booking'], popular: true },
  { id: '3', name: 'Elite', price: 1999, features: ['25% Extra Discount', '24/7 Priority Support', 'Cashback 5%', 'Exclusive Deals', 'Free Upgrades'] },
]

export const heroStats = [
  { label: 'Himachal Spots', value: 28, suffix: '+' },
  { label: 'Happy Travelers', value: 2, suffix: 'M+' },
  { label: 'Hotels & Stays', value: 50, suffix: 'K+' },
  { label: 'Tour Packages', value: 1000, suffix: '+' },
]

export const navLinks = [
  { label: 'Himachal', href: '#destinations' },
  { label: 'Hotels', href: '#hotels' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Tours', href: '#tours' },
  { label: 'Store', href: '#store' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export const aiSuggestions = [
  'Best places in Himachal?',
  'Manali trip budget?',
  'Spiti Valley guide',
  'Weekend trip from Delhi',
  'Snow destinations in HP',
  'Bike rental in Manali',
]

export const tourCategories = ['All', 'Domestic', 'International', 'Honeymoon', 'Adventure', 'Family', 'Religious', 'Wildlife', 'Luxury']

export const roomCategories = [
  { key: 'guesthouse', label: 'Guest House' },
  { key: 'hostel', label: 'Hostel' },
  { key: 'homestay', label: 'Homestay' },
  { key: 'luxury', label: 'Luxury' },
  { key: 'budget', label: 'Budget' },
  { key: 'shared', label: 'Shared' },
]

export const pgTypes = [
  { key: 'boys', label: 'Boys PG' },
  { key: 'girls', label: 'Girls PG' },
  { key: 'family', label: 'Family PG' },
]
