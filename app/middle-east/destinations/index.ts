import { uaeDestinations } from './uae'
import { saudiArabiaDestinations } from './saudiArabia'
import { jordanDestinations } from './jordan'
import { omanDestinations } from './oman'
import { turkeyDestinations } from './turkiye'
import { qatarDestinations } from './qatar'
import { egyptDestinations } from './egypt'
import { israelPalestineDestinations } from './israel-palestine'
import { lebanonDestinations } from './lebanon'
import { bahrainDestinations } from './bahrain'
import { kuwaitDestinations } from './kuwait'

// Combine all destinations (40+ destinations)
export const middleEastDestinations = [
  ...uaeDestinations,
  ...saudiArabiaDestinations,
  ...jordanDestinations,
  ...omanDestinations,
  ...turkeyDestinations,
  ...qatarDestinations,
  ...egyptDestinations,
  ...israelPalestineDestinations,
  ...lebanonDestinations,
  ...bahrainDestinations,
  ...kuwaitDestinations,
]

// Export individual regions if needed elsewhere
export {
  uaeDestinations,
  saudiArabiaDestinations,
  jordanDestinations,
  omanDestinations,
  turkeyDestinations,
  qatarDestinations,
  egyptDestinations,
  israelPalestineDestinations,
  lebanonDestinations,
  bahrainDestinations,
  kuwaitDestinations,
}
