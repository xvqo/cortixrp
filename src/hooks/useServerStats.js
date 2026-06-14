// Static data now. To go live, swap the return with the commented block below
// and set SERVER_IP to your FiveM server address (e.g. "1.2.3.4:30120").

const STATIC_STATS = {
  playersOnline: 47,
  hoursPlayed: 128400,
  whitelistApproved: 892,
}

export function useServerStats() {
  return { stats: STATIC_STATS, loading: false, error: null }
}

// -- Live version (uncomment when ready) --
// import { useState, useEffect } from 'react'
// const SERVER_IP = 'YOUR_IP:PORT'
//
// export function useServerStats() {
//   const [state, setState] = useState({ stats: null, loading: true, error: null })
//   useEffect(() => {
//     fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_IP}`)
//       .then(r => r.json())
//       .then(data => setState({
//         stats: {
//           playersOnline: data.Data.clients,
//           hoursPlayed: STATIC_STATS.hoursPlayed,   // still manual
//           whitelistApproved: STATIC_STATS.whitelistApproved, // still manual
//         },
//         loading: false,
//         error: null,
//       }))
//       .catch(() => setState({ stats: STATIC_STATS, loading: false, error: 'api' }))
//   }, [])
//   return state
// }
