import crypto from 'crypto'

// HBX requires every request to carry a fresh signature proving you hold
// the secret, without ever sending the secret itself over the wire.
// Formula (from HBX docs): SHA256(apiKey + secret + currentUnixTimestamp)
export function getHbxHeaders(isTransfer = false) {
  const apiKey = isTransfer
    ? process.env.HBX_TRANSFER_API_KEY || process.env.HBX_API_KEY
    : process.env.HBX_API_KEY
  const secret = isTransfer
    ? process.env.HBX_TRANSFER_SECRET || process.env.HBX_SECRET
    : process.env.HBX_SECRET

  if (!apiKey || !secret) {
    throw new Error(`HBX API credentials not set. Transfer: ${isTransfer}`)
  }

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = crypto
    .createHash('sha256')
    .update(apiKey + secret + timestamp)
    .digest('hex')

  return {
    'Api-key': apiKey,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
  }
}
export function getHbxActivityHeaders() {
  const apiKey = process.env.HBX_ACTIVITY_API_KEY || process.env.HBX_API_KEY
  const secret = process.env.HBX_ACTIVITY_SECRET || process.env.HBX_SECRET

  if (!apiKey || !secret) {
    throw new Error('HBX Activities credentials not set (HBX_ACTIVITY_API_KEY / HBX_ACTIVITY_SECRET)')
  }

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = crypto
    .createHash('sha256')
    .update(apiKey + secret + timestamp)
    .digest('hex')

  return {
    'Api-key': apiKey,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip',
    'Content-Type': 'application/json',
  }
}
