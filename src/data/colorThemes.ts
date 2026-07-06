export type ColorThemeId = 'gold' | 'ocean' | 'emerald' | 'sunset' | 'royal' | 'rose'

export interface ColorTheme {
  id: ColorThemeId
  name: string
  swatch: [string, string]
}

export const colorThemes: ColorTheme[] = [
  { id: 'gold', name: 'Luxury Gold', swatch: ['#e8b86d', '#14b8a6'] },
  { id: 'ocean', name: 'Ocean Blue', swatch: ['#60a5fa', '#22d3ee'] },
  { id: 'emerald', name: 'Emerald', swatch: ['#34d399', '#10b981'] },
  { id: 'sunset', name: 'Sunset', swatch: ['#fb923c', '#f97316'] },
  { id: 'royal', name: 'Royal Violet', swatch: ['#a78bfa', '#8b5cf6'] },
  { id: 'rose', name: 'Rose Gold', swatch: ['#fb7185', '#f43f5e'] },
]

export const DEFAULT_COLOR_THEME: ColorThemeId = 'gold'
