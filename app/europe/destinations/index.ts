import { franceDestinations } from './france'
import { italyDestinations } from './italy'
import { spainDestinations } from './spain'
import { portugalDestinations } from './portugal'
import { ukDestinations } from './uk'
import { germanyDestinations } from './germany'
import { switzerlandDestinations } from './switzerland'
import { austriaDestinations } from './austria'
import { netherlandsDestinations } from './netherlands'
import { greeceDestinations } from './greece'
import { icelandDestinations } from './iceland'

// Combine all destinations (50+ destinations)
export const europeDestinations = [
  ...franceDestinations,
  ...italyDestinations,
  ...spainDestinations,
  ...portugalDestinations,
  ...ukDestinations,
  ...germanyDestinations,
  ...switzerlandDestinations,
  ...austriaDestinations,
  ...netherlandsDestinations,
  ...greeceDestinations,
  ...icelandDestinations,
]

// Export individual regions if needed elsewhere
export {
  franceDestinations,
  italyDestinations,
  spainDestinations,
  portugalDestinations,
  ukDestinations,
  germanyDestinations,
  switzerlandDestinations,
  austriaDestinations,
  netherlandsDestinations,
  greeceDestinations,
  icelandDestinations,
}