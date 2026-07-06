import type { Plugin } from 'vite'
import { handlePlacesSearch, handlePlacePhoto } from './googlePlaces'
import { handleChatRequest, handleConfigRequest } from './chatHandler'

export function vitePlacesPlugin(): Plugin {
  const attach = (middlewares: { use: (fn: (req: import('http').IncomingMessage, res: import('http').ServerResponse, next: () => void) => void) => void }) => {
    middlewares.use((req, res, next) => {
      if (req.url?.startsWith('/api/config')) {
        handleConfigRequest(req, res)
        return
      }
      if (req.url?.startsWith('/api/places/photo')) {
        handlePlacePhoto(req, res)
        return
      }
      if (req.url?.startsWith('/api/places/search')) {
        handlePlacesSearch(req, res)
        return
      }
      if (req.url?.startsWith('/api/chat')) {
        handleChatRequest(req, res)
        return
      }
      next()
    })
  }

  return {
    name: 'wanderhive-api',
    configureServer(server) {
      attach(server.middlewares)
    },
    configurePreviewServer(server) {
      attach(server.middlewares)
    },
  }
}
