import { australiaDestinations } from './australia'
import { newZealandDestinations } from './newZealand'
import { fijiDestinations } from './fiji'
import { frenchPolynesiaDestinations } from './frenchPolynesia'
import { hawaiiDestinations } from './hawaii'
import { cookIslandsDestinations } from './cookIslands'
import { samoaDestinations } from './samoa'

// Combine all destinations (40+ destinations)
export const pacificDestinations = [
  ...australiaDestinations,
  ...newZealandDestinations,
  ...fijiDestinations,
  ...frenchPolynesiaDestinations,
  ...hawaiiDestinations,
  ...cookIslandsDestinations,
  ...samoaDestinations,
]

// Export individual regions if needed elsewhere
export {
  australiaDestinations,
  newZealandDestinations,
  fijiDestinations,
  frenchPolynesiaDestinations,
  hawaiiDestinations,
  cookIslandsDestinations,
  samoaDestinations,
}