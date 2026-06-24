import Link from 'next/link'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'
const AVENLY_URL = 'https://avenly.pl/'

const NAV_LINKS = [
  { to: '/regulamin', label: 'Regulamin' },
  { to: '/dla-poczatkujacych', label: 'Dla początkujących' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/15 bg-bg-deep">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="mx-auto max-w-page px-8 pb-8 pt-16 min-[1921px]:max-w-wide max-md:px-6 max-md:pt-12 max-[480px]:px-5">

        <div className="mb-10 flex items-start justify-between gap-16 max-md:flex-col max-md:gap-8 max-[480px]:items-center max-[480px]:text-center">
          <div className="flex flex-col gap-4 max-[480px]:items-center">
            <Link href="/" aria-label="OutsetRP, strona główna" className="flex items-center">
              <img src="/logo.svg" alt="OutsetRP" width={64} height={64} className="h-16 w-auto" />
            </Link>
            <p className="max-w-[34ch] text-sm leading-[1.65] text-ink-faint">
              Casualowy serwer roleplay.<br />
              Los Santos czeka.
            </p>
          </div>

          <div className="flex shrink-0 gap-12 max-[480px]:justify-center max-[480px]:gap-10">
            <div className="flex min-w-[120px] flex-col gap-4 max-[480px]:items-center">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary">Nawigacja</p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link href={to} className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-[120px] flex-col gap-4 max-[480px]:items-center">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-primary">Social media</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink">Discord</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 h-px bg-border" />

        <div className="flex flex-wrap items-center justify-between gap-6 max-md:flex-col max-md:items-start max-md:gap-2 max-[480px]:items-center max-[480px]:text-center">
          <p className="whitespace-nowrap font-mono text-xs text-ink-faint">© {new Date().getFullYear()} OutsetRP</p>
          <p className="flex-1 text-center text-xs text-ink-faint max-md:flex-none max-md:text-left max-[480px]:text-center">
            This server is not affiliated with or endorsed by Rockstar Games.
          </p>
          <p className="whitespace-nowrap text-xs text-ink-faint">
            Strona stworzona przez{' '}
            <a href={AVENLY_URL} target="_blank" rel="noreferrer" className="font-semibold text-ink-muted transition-colors duration-200 hover:text-primary">avenly.pl</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
