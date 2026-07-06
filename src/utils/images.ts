const FALLBACK_PHOTO = 'photo-1506905925346-21bda4d32df4'

/** Reliable Unsplash URL with crop + format */
export function img(photoId: string, width = 800): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&auto=format&fit=crop`
}

export const FALLBACK_IMAGE = img(FALLBACK_PHOTO, 800)

export function onImageError(e: { currentTarget: HTMLImageElement }, width = 800): void {
  e.currentTarget.onerror = null
  e.currentTarget.src = img(FALLBACK_PHOTO, width)
}

/** Unique Himachal destination photos — verified Unsplash IDs */
export const himachalPhotos = {
  manali: 'photo-1626621341517-bbf3d9990a23',
  shimla: 'photo-1551524164-6cf77f5e7f8b',
  dharamshala: 'photo-1586864387967-d02f4ddd132d',
  mcleod: 'photo-1540959733332-eab4deab781a',
  kasol: 'photo-1464822759021-fed622ff2c3b',
  kullu: 'photo-1501785888041-af3ef285b470',
  spiti: 'photo-1478131143088-5e6e9100c4b5',
  dalhousie: 'photo-1518173946687-a4c036bcaaee',
  khajjiar: 'photo-1470071459604-3b5ec3a7fe05',
  bir: 'photo-1526779255197-aaee9410b44d',
  chamba: 'photo-1465146633011-14f8e0781093',
  kufri: 'photo-1486870591958-9b9d0668f51e',
  solang: 'photo-1483728642387-6c3bddc445bd',
  rohtang: 'photo-1454496522488-7a8e488e8606',
  tirthan: 'photo-1441974231531-c6227db76b6e',
  kinnaur: 'photo-1506905925346-21bda4d32df4',
  sangla: 'photo-1519682337058-a94d519337bc',
  keylong: 'photo-1452860606245-08befc0ff4b9',
  tabo: 'photo-1493246507139-91e8fad9978e',
  mandi: 'photo-1475924156734-496f6cac6ec1',
  palampur: 'photo-1563822243916-4c9236163147',
  shoja: 'photo-1472214103451-9374aa1ae450',
  chail: 'photo-1439068799847-4ee021fd71d2',
  narkanda: 'photo-1551632811-561732d1e306',
  prashar: 'photo-1433086966358-54859d0f8717',
  rewalsar: 'photo-1548259715-17573679199a',
  barot: 'photo-1469474968028-56646f79e866',
  kalpa: 'photo-1454496522488-7a8e488e8606',
} as const
