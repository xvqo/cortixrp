'use client'

import { useServerStats } from '@/hooks/useServerStats'
import { useCountUp } from '@/hooks/useCountUp'
import { useReveal } from '@/hooks/useReveal'

function Stat({ value, label, descriptor, delay = 0 }) {
  const { value: displayed, ref } = useCountUp(value, 1400 + delay)
  const formatted = displayed.toLocaleString('pl-PL')

  return (
    <div
      ref={ref}
      className="reveal border-l border-primary/10 px-10 first:border-l-0 first:pl-0 max-md:border-l-0 max-md:border-t max-md:px-0 max-md:py-8 max-md:text-center max-md:first:border-t-0 max-md:first:pt-0"
    >
      <div
        className="font-mono text-[clamp(2.5rem,6vw,4.2rem)] font-bold leading-none tracking-[-0.04em] text-ink [font-variant-numeric:tabular-nums] [text-shadow:0_0_44px_oklch(0.66_0.18_248/0.35)]"
        aria-label={`${value.toLocaleString('pl-PL')} ${label}`}
      >
        {formatted}
      </div>
      <div className="mt-4 text-base font-semibold text-ink">{label}</div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-faint">{descriptor}</div>
    </div>
  )
}

export default function ServerStats() {
  const { stats } = useServerStats()
  const gridRef = useReveal('.reveal', { stagger: 120 })

  return (
    <section className="relative overflow-hidden py-28 max-md:py-20" aria-label="Statystyki serwera">
      <div className="stats-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-page px-8 min-[1921px]:max-w-wide max-md:px-6">
        <div className="mb-14 max-w-[58ch] max-md:mb-10 max-md:text-center">
          <h2 className="font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink [font-stretch:112%]">
            Żywy serwer, realna społeczność
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-3 max-md:grid-cols-1">
          <Stat value={stats.hoursPlayed} label="godzin rozgrywki" descriptor="łącznie w tym miesiącu" delay={0} />
          <Stat value={stats.whitelistApproved} label="zatwierdzonych whitelist" descriptor="od uruchomienia serwera" delay={120} />
          <Stat value={stats.playersOnline} label="graczy online" descriptor="aktualnie w mieście" delay={240} />
        </div>
      </div>
    </section>
  )
}
