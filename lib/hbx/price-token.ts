import { createHmac, timingSafeEqual } from 'crypto'

function getSecret(): string {
  const s = process.env.HBX_PRICE_TOKEN_SECRET
  if (!s) throw new Error('HBX_PRICE_TOKEN_SECRET is not set')
  return s
}

export function signPrice(rateKey: string, price: number, currency: string): string {
  return createHmac('sha256', getSecret())
    .update(rateKey + '|' + price.toFixed(2) + '|' + currency)
    .digest('hex')
}

export function verifyPrice(rateKey: string, price: number, currency: string, token: unknown): boolean {
  try {
    const a = Buffer.from(signPrice(rateKey, price, currency))
    const b = Buffer.from(String(token || ''))
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}