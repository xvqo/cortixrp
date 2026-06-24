import Link from 'next/link'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

export const metadata = {
  title: 'Nie znaleziono — OutsetRP',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="cta-aurora" aria-hidden="true">
        <span /><span /><span />
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center font-display text-[clamp(8rem,26vw,18rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_oklch(from_var(--color-primary)_l_c_h/0.35)] [font-stretch:120%]"
      >
        404
      </span>

      <div className="relative z-[3] flex flex-col items-center gap-5">
        <span className="kicker">Błąd 404</span>
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.02em] text-ink [font-stretch:115%]">
          Zgubiłeś się w Los Santos
        </h1>
        <p className="max-w-[46ch] text-lg leading-[1.7] text-ink-muted">
          Tej strony nie ma na mapie. Wróć na główną albo wskocz na nasz Discord.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 max-[420px]:w-full max-[420px]:flex-col">
          <Link href="/" className="btn-primary max-[420px]:w-full">Wróć na główną</Link>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-ghost max-[420px]:w-full">Discord</a>
        </div>
      </div>
    </section>
  )
}
