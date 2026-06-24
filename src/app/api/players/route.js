// Live player count from the FiveM server (cfx.re/join/8emodg5).
// Fetched server-side to avoid CORS, cached/revalidated so we don't hammer the API.

const CFX_ID = '8emodg5'

export const revalidate = 60

export async function GET() {
  try {
    const res = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${CFX_ID}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const json = await res.json()
    const data = json?.Data ?? {}
    const players = typeof data.clients === 'number' ? data.clients : null
    const max = data.sv_maxclients ?? data.svMaxclients ?? null
    return Response.json(
      { players, max, online: players !== null },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' } }
    )
  } catch {
    return Response.json({ players: null, max: null, online: false })
  }
}
