import type { Destination } from '../types'
import { himachalPhotos, img } from '../utils/images'

export const himachalRegions = [
  'All',
  'Kullu-Manali',
  'Shimla',
  'Kangra',
  'Chamba',
  'Spiti & Lahaul',
  'Kinnaur',
  'Mandi',
] as const

export type HimachalRegion = (typeof himachalRegions)[number]

export const himachalDestinations: Destination[] = [
  { id: 'hp1', name: 'Manali', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Snow & Adventure', image: img(himachalPhotos.manali), rating: 4.9, price: 8500, weather: '8°C Cold', bestTime: 'Oct - Feb' },
  { id: 'hp2', name: 'Shimla', country: 'Himachal Pradesh', region: 'Shimla', highlight: 'Queen of Hills', image: img(himachalPhotos.shimla), rating: 4.7, price: 6500, weather: '12°C Cool', bestTime: 'Mar - Jun' },
  { id: 'hp3', name: 'Dharamshala', country: 'Himachal Pradesh', region: 'Kangra', highlight: 'Tibetan Culture', image: img(himachalPhotos.dharamshala), rating: 4.8, price: 5500, weather: '15°C Pleasant', bestTime: 'Mar - Jun' },
  { id: 'hp4', name: 'McLeod Ganj', country: 'Himachal Pradesh', region: 'Kangra', highlight: 'Little Lhasa', image: img(himachalPhotos.mcleod), rating: 4.8, price: 4800, weather: '14°C Cool', bestTime: 'Sep - Nov' },
  { id: 'hp5', name: 'Kasol', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Parvati Valley', image: img(himachalPhotos.kasol), rating: 4.6, price: 3500, weather: '10°C Cold', bestTime: 'Apr - Jun' },
  { id: 'hp6', name: 'Kullu', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Valley of Gods', image: img(himachalPhotos.kullu), rating: 4.5, price: 4200, weather: '11°C Cool', bestTime: 'Mar - Jun' },
  { id: 'hp7', name: 'Spiti Valley', country: 'Himachal Pradesh', region: 'Spiti & Lahaul', highlight: 'Cold Desert', image: img(himachalPhotos.spiti), rating: 4.9, price: 12000, weather: '2°C Freezing', bestTime: 'Jun - Sep' },
  { id: 'hp8', name: 'Dalhousie', country: 'Himachal Pradesh', region: 'Chamba', highlight: 'Colonial Charm', image: img(himachalPhotos.dalhousie), rating: 4.6, price: 5800, weather: '9°C Cold', bestTime: 'Apr - Jun' },
  { id: 'hp9', name: 'Khajjiar', country: 'Himachal Pradesh', region: 'Chamba', highlight: 'Mini Switzerland', image: img(himachalPhotos.khajjiar), rating: 4.7, price: 5200, weather: '10°C Cool', bestTime: 'May - Oct' },
  { id: 'hp10', name: 'Bir Billing', country: 'Himachal Pradesh', region: 'Kangra', highlight: 'Paragliding Hub', image: img(himachalPhotos.bir), rating: 4.8, price: 4500, weather: '16°C Pleasant', bestTime: 'Oct - Nov' },
  { id: 'hp11', name: 'Chamba', country: 'Himachal Pradesh', region: 'Chamba', highlight: 'Heritage Town', image: img(himachalPhotos.chamba), rating: 4.4, price: 4000, weather: '13°C Cool', bestTime: 'Mar - Jun' },
  { id: 'hp12', name: 'Kufri', country: 'Himachal Pradesh', region: 'Shimla', highlight: 'Snow Point', image: img(himachalPhotos.kufri), rating: 4.5, price: 3800, weather: '5°C Cold', bestTime: 'Dec - Feb' },
  { id: 'hp13', name: 'Solang Valley', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Ski & Zorbing', image: img(himachalPhotos.solang), rating: 4.8, price: 7200, weather: '4°C Cold', bestTime: 'Dec - Mar' },
  { id: 'hp14', name: 'Rohtang Pass', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'High Altitude Pass', image: img(himachalPhotos.rohtang), rating: 4.7, price: 6000, weather: '0°C Freezing', bestTime: 'May - Oct' },
  { id: 'hp15', name: 'Tirthan Valley', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Eco Tourism', image: img(himachalPhotos.tirthan), rating: 4.6, price: 3200, weather: '12°C Cool', bestTime: 'Apr - Jun' },
  { id: 'hp16', name: 'Kinnaur', country: 'Himachal Pradesh', region: 'Kinnaur', highlight: 'Apple Country', image: img(himachalPhotos.kinnaur), rating: 4.7, price: 7500, weather: '8°C Cold', bestTime: 'May - Oct' },
  { id: 'hp17', name: 'Sangla Valley', country: 'Himachal Pradesh', region: 'Kinnaur', highlight: 'Scenic Valley', image: img(himachalPhotos.sangla), rating: 4.8, price: 6800, weather: '7°C Cold', bestTime: 'May - Sep' },
  { id: 'hp18', name: 'Keylong', country: 'Himachal Pradesh', region: 'Spiti & Lahaul', highlight: 'Lahaul Gateway', image: img(himachalPhotos.keylong), rating: 4.5, price: 5500, weather: '3°C Cold', bestTime: 'Jun - Sep' },
  { id: 'hp19', name: 'Tabo', country: 'Himachal Pradesh', region: 'Spiti & Lahaul', highlight: 'Ancient Monastery', image: img(himachalPhotos.tabo), rating: 4.6, price: 8000, weather: '1°C Freezing', bestTime: 'Jun - Sep' },
  { id: 'hp20', name: 'Mandi', country: 'Himachal Pradesh', region: 'Mandi', highlight: 'Varanasi of Hills', image: img(himachalPhotos.mandi), rating: 4.3, price: 2800, weather: '14°C Pleasant', bestTime: 'Oct - Mar' },
  { id: 'hp21', name: 'Palampur', country: 'Himachal Pradesh', region: 'Kangra', highlight: 'Tea Gardens', image: img(himachalPhotos.palampur), rating: 4.4, price: 3600, weather: '15°C Pleasant', bestTime: 'Mar - Jun' },
  { id: 'hp22', name: 'Shoja', country: 'Himachal Pradesh', region: 'Kullu-Manali', highlight: 'Hidden Gem', image: img(himachalPhotos.shoja), rating: 4.7, price: 3400, weather: '9°C Cold', bestTime: 'Apr - Jun' },
  { id: 'hp23', name: 'Chail', country: 'Himachal Pradesh', region: 'Shimla', highlight: 'Peaceful Retreat', image: img(himachalPhotos.chail), rating: 4.5, price: 4200, weather: '11°C Cool', bestTime: 'Apr - Jun' },
  { id: 'hp24', name: 'Narkanda', country: 'Himachal Pradesh', region: 'Shimla', highlight: 'Skiing Destination', image: img(himachalPhotos.narkanda), rating: 4.6, price: 3900, weather: '6°C Cold', bestTime: 'Dec - Feb' },
  { id: 'hp25', name: 'Prashar Lake', country: 'Himachal Pradesh', region: 'Mandi', highlight: 'Sacred Lake', image: img(himachalPhotos.prashar), rating: 4.8, price: 2500, weather: '8°C Cold', bestTime: 'Apr - Jun' },
  { id: 'hp26', name: 'Rewalsar', country: 'Himachal Pradesh', region: 'Mandi', highlight: 'Holy Lake', image: img(himachalPhotos.rewalsar), rating: 4.4, price: 2200, weather: '13°C Cool', bestTime: 'Mar - Jun' },
  { id: 'hp27', name: 'Barot Valley', country: 'Himachal Pradesh', region: 'Mandi', highlight: 'Fishing & Trekking', image: img(himachalPhotos.barot), rating: 4.5, price: 2800, weather: '10°C Cool', bestTime: 'Apr - Oct' },
  { id: 'hp28', name: 'Kalpa', country: 'Himachal Pradesh', region: 'Kinnaur', highlight: 'Kinner Kailash View', image: img(himachalPhotos.kalpa), rating: 4.9, price: 8200, weather: '5°C Cold', bestTime: 'May - Oct' },
]
