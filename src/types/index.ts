export interface Destination {
  id: string
  name: string
  country: string
  image: string
  rating: number
  price: number
  weather: string
  bestTime: string
  region?: string
  highlight?: string
}

export interface Hotel {
  id: string
  name: string
  location: string
  image: string
  rating: number
  price: number
  amenities: string[]
  available: boolean
}

export interface Room {
  id: string
  type: string
  category: 'guesthouse' | 'hostel' | 'homestay' | 'luxury' | 'budget' | 'shared'
  image: string
  price: number
  rating: number
  location: string
}

export interface PG {
  id: string
  name: string
  type: 'boys' | 'girls' | 'family'
  image: string
  price: number
  amenities: string[]
  location: string
}

export interface Bike {
  id: string
  name: string
  type: string
  image: string
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
}

export interface Car {
  id: string
  name: string
  type: string
  image: string
  price: number
  selfDrive: boolean
  driverIncluded: boolean
}

export interface TourPackage {
  id: string
  title: string
  category: string
  image: string
  duration: string
  price: number
  rating: number
}

export interface Guide {
  id: string
  name: string
  image: string
  languages: string[]
  rating: number
  experience: number
  charge: number
  verified: boolean
}

export interface Product {
  id: string
  name: string
  category: string
  image: string
  price: number
}

export interface Blog {
  id: string
  title: string
  category: string
  image: string
  excerpt: string
  date: string
}

export interface Review {
  id: string
  name: string
  image: string
  rating: number
  text: string
  destination: string
}

export interface MembershipPlan {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
}

export interface ChatImage {
  src: string
  alt: string
  caption?: string
}

export interface ChatMessage {
  id?: string
  role: 'user' | 'assistant'
  content: string
  images?: ChatImage[]
  source?: 'google' | 'free' | 'ai'
}

export interface ChatReply {
  content: string
  images?: ChatImage[]
  source?: 'google' | 'free' | 'ai'
}

export interface TrackingItem {
  id: string
  type: string
  title: string
  status: string
  time: string
  icon: string
}
