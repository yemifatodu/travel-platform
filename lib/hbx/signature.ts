import crypto from 'crypto'

// HBX requires every request to carry a fresh signature proving you hold
// the secret, without ever sending the secret itself over the wire.
// Formula (from HBX docs): SHA256(apiKey + secret + currentUnixTimestamp)
export function getHbxHeaders() {
  const apiKey = process.env.HBX_API_KEY
  const secret = process.env.HBX_SECRET

  if (!apiKey || !secret) {
    throw new Error('HBX_API_KEY or HBX_SECRET is not set in environment variables')
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