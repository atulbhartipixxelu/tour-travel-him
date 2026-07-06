import { himachalDestinations, himachalRegions } from './himachalDestinations'
import { globalTopicReplies } from './himachalKnowledge'

export const himachalStateOverview = `Himachal Pradesh — Dev Bhoomi — northern India ka hill state. 12 districts, 28+ major tourist hubs, snow peaks se cold desert (Spiti) tak. Capital: Shimla. Famous for: apples, tourism, adventure sports, Tibetan culture, tea (Kangra), and Himalayan treks.

Regions: Kullu-Manali (adventure), Shimla (colonial hills), Kangra (tea + Dalai Lama), Chamba (heritage), Spiti-Lahaul (cold desert), Kinnaur (apple valleys), Mandi (temples + lakes).`

export const seasonGuide = {
  spring: 'Mar–Apr: Rhododendron bloom, pleasant 15–22°C. Best for Shimla, Dharamshala, Palampur, Kasol treks starting.',
  summer: 'May–Jun: Peak season. Manali, Shimla, Dharamshala crowded. Book ahead. Rohtang opens (May). Spiti/Kinnaur roads open.',
  monsoon: 'Jul–Aug: Lush green but landslide risk on Manali-Spiti, Kinnaur routes. Tirthan, Barot trout season. Avoid Parvati valley river camps.',
  autumn: 'Sep–Nov: Clearest skies — best for Spiti, Kinnaur, Kalpa sunrise, Bir paragliding (Oct–Nov). Shoulder prices.',
  winter: 'Dec–Feb: Snow at Manali, Shimla, Kufri, Narkanda ski. Spiti/Kinnaur mostly closed. Budget off-season deals in lower hills.',
}

export const bestByCategory: Record<string, { title: string; places: string[]; tip: string }> = {
  snow: {
    title: 'Barf & Snow ke liye best',
    places: ['Manali', 'Solang Valley', 'Rohtang Pass', 'Kufri', 'Narkanda', 'Shimla'],
    tip: 'Dec–Feb best. Rohtang permit required May–Oct for snow views in summer.',
  },
  adventure: {
    title: 'Adventure & thrill',
    places: ['Manali', 'Bir Billing', 'Solang Valley', 'Spiti Valley', 'Kasol', 'Tirthan Valley'],
    tip: 'Rafting Beas (Apr–Jul), paragliding Bir (Oct–Nov), Hampta Pass trek (Jun–Sep).',
  },
  budget: {
    title: 'Budget-friendly trips',
    places: ['Kasol', 'Mandi', 'Rewalsar', 'Barot Valley', 'Shoja', 'Palampur'],
    tip: 'Hostels ₹400–800/night. Mandi & Rewalsar ultra-cheap. Kasol backpacker hub.',
  },
  spiritual: {
    title: 'Dharam & spirituality',
    places: ['Dharamshala', 'McLeod Ganj', 'Tabo', 'Rewalsar', 'Prashar Lake', 'Chamba'],
    tip: 'Dalai Lama temple McLeod, Tabo 1000-yr monastery Spiti, Rewalsar multi-faith lake.',
  },
  honeymoon: {
    title: 'Romantic / couple trips',
    places: ['Manali', 'Dalhousie', 'Khajjiar', 'Palampur', 'Chail', 'Tirthan Valley'],
    tip: 'Khajjiar meadow, Palampur tea estates, Chail quiet palace town — less crowded than Manali.',
  },
  offbeat: {
    title: 'Hidden gems (kam crowd)',
    places: ['Shoja', 'Barot Valley', 'Tirthan Valley', 'Sangla Valley', 'Keylong', 'Narkanda'],
    tip: 'Shoja near Jibhi, Barot fishing, Sangla before Chitkul — authentic village life.',
  },
  camping: {
    title: 'Best camping spots',
    places: ['Kasol (Kheerganga)', 'McLeod Ganj (Triund)', 'Spiti Valley (Chandratal)', 'Khajjiar', 'Tirthan Valley', 'Sangla Valley'],
    tip: 'Organized camps ₹800–2500/night. Kheerganga & Triund most popular.',
  },
  family: {
    title: 'Family-friendly',
    places: ['Shimla', 'Dharamshala', 'Dalhousie', 'Manali', 'Palampur', 'Khajjiar'],
    tip: 'Shimla Mall Road easy, Dharamshala culture, Khajjiar zorbing for kids.',
  },
}

export const travelCircuits = [
  {
    name: 'Classic Shimla-Manali',
    route: 'Delhi → Shimla (2N) → Manali (3N) → Delhi',
    days: '5–6 days',
    highlight: 'Toy train, Ridge, Solang, Hadimba — first-timer circuit.',
  },
  {
    name: 'Dharamshala–Palampur–Bir',
    route: 'McLeod Ganj → Dharamshala → Palampur tea → Bir paragliding',
    days: '4–5 days',
    highlight: 'Tibetan culture, tea gardens, adventure combo.',
  },
  {
    name: 'Spiti Circuit',
    route: 'Manali → Rohtang → Keylong → Kaza → Tabo → Chandratal → Manali',
    days: '7–10 days',
    highlight: 'Cold desert, Key & Tabo monasteries. Jun–Sep only. 4x4 recommended.',
  },
  {
    name: 'Kinnaur–Kalpa',
    route: 'Shimla → Narkanda → Rampur → Sangla → Chitkul → Kalpa → Shimla',
    days: '5–7 days',
    highlight: 'Apple valleys, Kinner Kailash sunrise, less touristy.',
  },
  {
    name: 'Parvati Valley',
    route: 'Bhuntar → Kasol → Tosh → Kheerganga → Manikaran → Kasol',
    days: '3–5 days',
    highlight: 'Backpacker trail, hot springs, Kheerganga trek.',
  },
]

export function buildRegionsSummary(hindi: boolean): string {
  const byRegion = himachalRegions.filter(r => r !== 'All')
  const lines = byRegion.map(region => {
    const places = himachalDestinations
      .filter(d => d.region === region)
      .map(d => d.name)
      .join(', ')
    return hindi ? `**${region}:** ${places}` : `**${region}:** ${places}`
  })
  return lines.join('\n')
}

export function buildAllDestinationsQuickRef(hindi: boolean): string {
  return himachalDestinations
    .map(d =>
      hindi
        ? `• **${d.name}** (${d.region}) — ${d.highlight} | ⭐${d.rating} | ${d.bestTime} | ~₹${d.price}`
        : `• **${d.name}** (${d.region}) — ${d.highlight} | ⭐${d.rating} | Best: ${d.bestTime} | ~₹${d.price}`,
    )
    .join('\n')
}

export function detectCategoryQuery(message: string): keyof typeof bestByCategory | null {
  const lower = message.toLowerCase()
  if (/snow|barf|ski|winter|thand/.test(lower)) return 'snow'
  if (/adventure|thrill|rafting|paraglid/.test(lower)) return 'adventure'
  if (/budget|sasta|cheap|kam kharch/.test(lower)) return 'budget'
  if (/spiritual|dharam|temple|monastery|mandir/.test(lower)) return 'spiritual'
  if (/honeymoon|romantic|couple/.test(lower)) return 'honeymoon'
  if (/offbeat|hidden|kam (log|bheed)|secret/.test(lower)) return 'offbeat'
  if (/camp(ing)?|tent/.test(lower) && /best|kahan|where|top/.test(lower)) return 'camping'
  if (/family|bacch|kids|bacche/.test(lower)) return 'family'
  return null
}

export function getTopicGlobalReply(topic: string): string | null {
  return globalTopicReplies[topic as keyof typeof globalTopicReplies] ?? null
}
