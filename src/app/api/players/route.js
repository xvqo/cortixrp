// Live player count for the OutsetRP FiveM server.
// status: 'online' (got data) | 'offline' (server confirmed not listed) | 'unknown' (unreachable/blocked)
//
// Two sources, in order of reliability:
//  1) Direct query to the game server's dynamic.json (set FIVEM_SERVER="ip:port" in env).
//     This bypasses Cloudflare, so it works from Vercel's datacenter IPs.
//  2) FiveM frontend API by cfx join id (works from residential IPs, often blocked from datacenters).

const CFX_ID = '8emodg5'
const DIRECT = process.env.FIVEM_SERVER // e.g. "51.83.x.x:30120"

export const revalidate = 60

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://servers.fivem.net/',
}

async function fromDirect() {
  if (!DIRECT) return null
  try {
    const base = DIRECT.startsWith('http') ? DIRECT : `http://${DIRECT}`
    const res = await fetch(`${base}/dynamic.json`, { next: { revalidate: 30 } })
    if (!res.ok) return null
    const d = await res.json()
    if (typeof d?.clients === 'number') {
      return { status: 'online', players: d.clients, max: d.sv_maxclients ?? null }
    }
    return null
  } catch {
    return null
  }
}

async function fromCfx() {
  try {
    const res = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${CFX_ID}`, {
      headers: BROWSER_HEADERS,
      next: { revalidate: 60 },
    })
    if (res.status === 404) return { status: 'offline', players: null, max: null }
    if (!res.ok) return { status: 'unknown', players: null, max: null }
    const json = await res.json()
    const data = json?.Data ?? null
    const clients =
      typeof data?.clients === 'number'
        ? data.clients
        : Array.isArray(data?.players) ? data.players.length : null
    if (data && clients !== null) {
      return { status: 'online', players: clients, max: data.sv_maxclients ?? data.svMaxclients ?? null }
    }
    return { status: 'unknown', players: null, max: null }
  } catch {
    return { status: 'unknown', players: null, max: null }
  }
}

export async function GET() {
  const direct = await fromDirect()
  const result = direct ?? (await fromCfx())
  return Response.json(result, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
  })
}
