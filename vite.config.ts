import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePlacesPlugin } from './server/vitePlacesPlugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GOOGLE_MAPS_API_KEY = env.GOOGLE_MAPS_API_KEY
  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
  process.env.OPENAI_MODEL = env.OPENAI_MODEL

  return {
    plugins: [react(), tailwindcss(), vitePlacesPlugin()],
  }
})
