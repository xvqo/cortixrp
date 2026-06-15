import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_TYPE = 'image/png'

// Branded Open Graph card. Diacritic-free copy so it renders reliably with the
// default font (no network font fetch needed at build time).
export function ogImage({
  eyebrow = 'Serwer Roleplay',
  subtitle = 'Twoja historia w Los Santos',
} = {}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 76,
          background: '#070b14',
          color: '#e6eefc',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, display: 'flex', background: 'linear-gradient(90deg, #2fa8ff, #36e0ff)' }} />
        <div style={{ position: 'absolute', top: -220, right: -180, width: 680, height: 680, display: 'flex', background: 'radial-gradient(circle, rgba(47,168,255,0.45), rgba(7,11,20,0) 70%)' }} />
        <div style={{ position: 'absolute', bottom: -260, left: -140, width: 600, height: 600, display: 'flex', background: 'radial-gradient(circle, rgba(54,224,255,0.20), rgba(7,11,20,0) 70%)' }} />

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 26, letterSpacing: 8, textTransform: 'uppercase', color: '#36e0ff' }}>
          {eyebrow}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 176, fontWeight: 800, letterSpacing: -5, lineHeight: 1 }}>
            <div style={{ display: 'flex' }}>CORTIX</div>
            <div style={{ display: 'flex', color: '#2fa8ff' }}>RP</div>
          </div>
          <div style={{ display: 'flex', fontSize: 44, color: '#aebbd6', marginTop: 16 }}>{subtitle}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 27, color: '#8493b3' }}>
          <div style={{ display: 'flex' }}>cortixrp.pl</div>
          <div style={{ display: 'flex', color: '#2fa8ff' }}>Los Santos</div>
        </div>
      </div>
    ),
    OG_SIZE
  )
}
