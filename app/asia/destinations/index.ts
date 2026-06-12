import { japanDestinations } from './japan'
import { thailandDestinations } from './thailand'
import { indonesiaDestinations } from './indonesia'
import { vietnamDestinations } from './vietnam'
import { singaporeDestinations } from './singapore'
import { maldivesDestinations } from './maldives'
import { southKoreaDestinations } from './southKorea'
import { indiaDestinations } from './india'
import { malaysiaDestinations } from './malaysia'
import { philippinesDestinations } from './philippines'
import { cambodiaDestinations } from './cambodia'
import { nepalDestinations } from './nepal'
import { myanmarDestinations } from './myanmar'

// Combine all destinations (50+ destinations)
export const asiaDestinations = [
  ...japanDestinations,
  ...thailandDestinations,
  ...indonesiaDestinations,
  ...vietnamDestinations,
  ...singaporeDestinations,
  ...maldivesDestinations,
  ...southKoreaDestinations,
  ...indiaDestinations,
  ...malaysiaDestinations,
  ...philippinesDestinations,
  ...cambodiaDestinations,
  ...nepalDestinations,
  ...myanmarDestinations,
]

// Export individual regions if needed elsewhere
export {
  japanDestinations,
  thailandDestinations,
  indonesiaDestinations,
  vietnamDestinations,
  singaporeDestinations,
  maldivesDestinations,
  southKoreaDestinations,
  indiaDestinations,
  malaysiaDestinations,
  philippinesDestinations,
  cambodiaDestinations,
  nepalDestinations,
  myanmarDestinations,
}