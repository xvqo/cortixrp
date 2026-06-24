// Live player count from the FiveM server (cfx.re/join/8emodg5).
// Fetched server-side to avoid CORS, cached/revalidated so we don't hammer the API.
// status: 'online' (got data) | 'offline' (API says server not listed) | 'unknown' (API unreachable/blocked)

const CFX_ID = '8emodg5'

export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${CFX_ID}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        Referer: 'https://servers.fivem.net/',
      },
      next: { revalidate: 60 },
    })

    // Server explicitly not listed -> genuinely offline
    if (res.status === 404) return Response.json({ status: 'offline', players: null, max: null })
    // Any other non-OK (Cloudflare block, rate limit, etc.) -> unknown, don't claim offline
    if (!res.ok) return Response.json({ status: 'unknown', players: null, max: null })

    const json = await res.json()
    const data = json?.Data ?? null
    const clients = typeof data?.clients === 'number'
      ? data.clients
      : Array.isArray(data?.players) ? data.players.length : null

    if (data && clients !== null) {
      return Response.json(
        { status: 'online', players: clients, max: data.sv_maxclients ?? data.svMaxclients ?? null },
        { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' } }
      )
    }
    return Response.json({ status: 'unknown', players: null, max: null })
  } catch {
    return Response.json({ status: 'unknown', players: null, max: null })
  }
}
