import { getHbxHeaders, getHbxActivityHeaders } from './signature'

const BASE_URL =
  process.env.HBX_ENV === 'live'
    ? 'https://api.hotelbeds.com'
    : 'https://api.test.hotelbeds.com'

async function parseHbxResponse(res: Response, requestedUrl: string) {
  const text = await res.text()
  let json: any
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(
      `HBX returned non-JSON response (status ${res.status}) for ${requestedUrl}: ${text.slice(0, 500)}`
    )
  }
  if (!res.ok) {
    const msg = json?.error?.message || json?.error?.code || JSON.stringify(json)
    throw new Error(`HBX request failed (status ${res.status}) for ${requestedUrl}: ${msg}`)
  }
  return json
}

export async function hbxPost(path: string, body: unknown) {
  const url = BASE_URL + path
  const res = await fetch(url, {
    method: 'POST',
    headers: getHbxHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return parseHbxResponse(res, url)
}

export async function hbxCheckRate(rateKey: string) {
  return hbxPost('/hotel-api/1.0/checkrates', { rateKey })
}

export async function hbxTransferGet(path: string, params?: Record<string, string>) {
  const url = new URL(BASE_URL + path)
  if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  const res = await fetch(url.toString(), {
    headers: getHbxHeaders(true),
    cache: 'no-store'
  })
  return parseHbxResponse(res, url.toString())
}

export async function hbxTransferPost(path: string, body: unknown) {
  // Transfers API might use different paths but same signature logic
  const url = BASE_URL + path
  const res = await fetch(url, {
    method: 'POST',
    headers: getHbxHeaders(true),
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return parseHbxResponse(res, url)
}

export async function hbxGet(path: string, params?: Record<string, string>) {
  const url = new URL(BASE_URL + path)
  if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  const res = await fetch(url.toString(), { headers: getHbxHeaders(), cache: 'no-store' })
  return parseHbxResponse(res, url.toString())
}
export async function hbxPut(path: string, body: unknown) {
  const url = BASE_URL + path
  const res = await fetch(url, {
    method: 'PUT',
    headers: getHbxHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  return parseHbxResponse(res, url)
}


export async function hbxActivityPost(path: string, body: unknown) {
  const url = BASE_URL + path
  const res = await fetch(url, { method: 'POST', headers: getHbxActivityHeaders(), body: JSON.stringify(body), cache: 'no-store' })
  return parseHbxResponse(res, url)
}

export async function hbxActivityPut(path: string, body: unknown) {
  const url = BASE_URL + path
  const res = await fetch(url, { method: 'PUT', headers: getHbxActivityHeaders(), body: JSON.stringify(body), cache: 'no-store' })
  return parseHbxResponse(res, url)
}

export async function hbxActivityGet(path: string, params?: Record<string, string>) {
  const url = new URL(BASE_URL + path)
  if (params) Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  const res = await fetch(url.toString(), { headers: getHbxActivityHeaders(), cache: 'no-store' })
  return parseHbxResponse(res, url.toString())
}
