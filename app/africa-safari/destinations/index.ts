import { eastAfricaDestinations } from './eastAfrica'
import { southernAfricaDestinations } from './southernAfrica'
import { westAfricaDestinations } from './westAfrica'
import { northAfricaDestinations } from './northAfrica'
import { centralAfricaDestinations } from './centralAfrica'
import { islandEscapesDestinations } from './islandEscapes'

// Combine all destinations
export const safariDestinations = [
  ...eastAfricaDestinations,
  ...southernAfricaDestinations,
  ...westAfricaDestinations,
  ...northAfricaDestinations,
  ...centralAfricaDestinations,
  ...islandEscapesDestinations,
]

// Export individual regions if needed elsewhere
export {
  eastAfricaDestinations,
  southernAfricaDestinations,
  westAfricaDestinations,
  northAfricaDestinations,
  centralAfricaDestinations,
  islandEscapesDestinations,
}