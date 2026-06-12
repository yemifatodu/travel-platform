import { usaDestinations } from './usa'
import { canadaDestinations } from './canada'
import { mexicoDestinations } from './mexico'
import { brazilDestinations } from './brazil'
import { peruDestinations } from './peru'
import { argentinaChileDestinations } from './argentinaChile'
import { colombiaDestinations } from './colombia'
import { ecuadorGalapagosDestinations } from './ecuadorGalapagos'
import { caribbeanDestinations } from './caribbean'
import { centralAmericaDestinations } from './centralAmerica'

// Combine all destinations (50+ destinations)
export const americasDestinations = [
  ...usaDestinations,
  ...canadaDestinations,
  ...mexicoDestinations,
  ...brazilDestinations,
  ...peruDestinations,
  ...argentinaChileDestinations,
  ...colombiaDestinations,
  ...ecuadorGalapagosDestinations,
  ...caribbeanDestinations,
  ...centralAmericaDestinations,
]

// Export individual regions if needed elsewhere
export {
  usaDestinations,
  canadaDestinations,
  mexicoDestinations,
  brazilDestinations,
  peruDestinations,
  argentinaChileDestinations,
  colombiaDestinations,
  ecuadorGalapagosDestinations,
  caribbeanDestinations,
  centralAmericaDestinations,
}