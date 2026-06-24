'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FluidShader from '@/components/FluidShader'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

export default function Hero() {
  const [players, setPlayers] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'online' | 'offline'
  const charRef = useRef(null)
  const contentRef = useRef(null)

  // Live server status + player count from the FiveM server (via /api/players)
  useEffect(() => {
    let alive = true
    fetch('/api/players')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return
        if (d && d.online && typeof d.players === 'number') {
          setPlayers(d.players)
          setStatus('online')
        } else {
          setStatus('offline')
        }
      })
      .catch(() => { if (alive) setStatus('offline') })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y > window.innerHeight) return
        if (charRef.current) charRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 650))
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="relative -mt-[72px] flex min-h-[100dvh] items-center overflow-hidden bg-bg pt-[72px]">
      <FluidShader dim={0.9} />

      <img
        ref={charRef}
        src="/characters.png"
        alt=""
        aria-hidden="true"
        className="hero-characters"
        draggable={false}
      />

      <div className="scrim-hero" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-52 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-[4] mx-auto w-full max-w-page px-8 py-[clamp(3rem,7vh,5rem)] min-[1921px]:max-w-wide max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center max-md:px-6 max-[480px]:px-5"
      >
        <div
          role="status"
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-muted backdrop-blur animate-rise"
          style={{ animationDelay: '0.26s' }}
        >
          <span
            className={`inline-block h-2 w-2 shrink-0 rounded-full ${
              status === 'online'
                ? 'bg-online [animation:dotPulse_2.6s_ease-in-out_infinite]'
                : status === 'offline'
                  ? 'bg-ink-faint'
                  : 'bg-ink-faint animate-pulse'
            }`}
          />
          <span>
            {status === 'online' && (
              <>
                Serwer online
                {players !== null && <span className="text-glow">&nbsp;·&nbsp;{players} graczy</span>}
              </>
            )}
            {status === 'offline' && 'Serwer offline'}
            {status === 'loading' && 'Sprawdzanie statusu'}
          </span>
        </div>

        <h1
          className="my-5 max-w-[15ch] font-display text-hero font-extrabold leading-[0.98] tracking-[-0.025em] text-ink text-balance [font-stretch:118%] animate-rise max-lg:max-w-[16ch]"
          style={{ animationDelay: '0.1s' }}
        >
          Graj na własnych <em className="not-italic text-primary text-glow-shadow">zasadach</em>
        </h1>

        <p
          className="mb-10 max-w-[46ch] text-lg leading-[1.7] text-ink-muted animate-rise max-lg:max-w-[54ch] max-[480px]:text-base"
          style={{ animationDelay: '0.18s' }}
        >
          Casualowy roleplay w nocnym Los Santos. Policjant, mechanik,
          przedsiębiorca albo ktoś zupełnie inny: to Ty piszesz tę historię.
        </p>

        <div
          className="flex flex-wrap gap-4 animate-rise max-[480px]:w-full max-[480px]:flex-col"
          style={{ animationDelay: '0.32s' }}
        >
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-primary max-[480px]:w-full">
            Dołącz na Discord
          </a>
          <Link href="/dla-poczatkujacych" className="btn-ghost max-[480px]:w-full">
            Jak zacząć
          </Link>
        </div>
      </div>
    </section>
  )
}
