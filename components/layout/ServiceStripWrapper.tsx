'use client'
import { ServiceStrip } from './ServiceStrip'

export function ServiceStripWrapper({ exclude }: { exclude?: string }) {
  return <ServiceStrip exclude={exclude} />
}