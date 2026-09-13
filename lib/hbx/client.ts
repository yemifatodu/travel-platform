import { getHbxHeaders } from './signature'

const BASE_URL =
  process.env.HBX_ENV === 'live'
    ? 'https://api.hotelbeds.com'
    : 'https://api.test.hotelbeds.com'

async function parseHbxResponse(res: Response) {
  const text = await res.text()
  let json: any
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`HBX returned non-JSON response (status ${res.status}): ${text.slice(0, 300)}`)
  }
  if (!res.ok) {
    const msg = json?.error?.message || json?.error?.code || `HBX request failed (status ${res.status})`
    throw new Error(msg)
  }
  return json
}

export async function hbxPost(path: string, body: unknown) {
  const res = await fetch(BASE_URL + path, {
    method: 'POST',
    headers: getHbxHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return parseHbxResponse(res)
}

export async function hbxGet(path: string, params?: Record<string, string>) {
  const url = new URL(BASE_URL + path)
  if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  const res = await fetch(url.toString(), { headers: getHbxHeaders(), cache: 'no-store' })
  return parseHbxResponse(res)
}