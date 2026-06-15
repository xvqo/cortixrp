'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

const links = [
  { to: '/regulamin', label: 'Regulamin' },
  { to: '/dla-poczatkujacych', label: 'Dla początkujących' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled ? 'border-primary/12 bg-bg-deep/25 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center gap-8 px-8 min-[1921px]:max-w-wide max-md:px-6">
        <Link
          href="/"
          className="mr-auto font-display text-xl font-extrabold uppercase tracking-tight text-ink [font-stretch:115%]"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              if (window.lenis) window.lenis.scrollTo(0, { duration: 1.1 })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          Cortix<span className="text-primary text-glow-shadow">RP</span>
        </Link>

        <button
          className={`nav-burger lg:hidden ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  href={to}
                  className={`group relative py-1 text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-300 ease-out ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_30px_-10px_oklch(0.66_0.18_248/0.6)] lg:inline-flex"
        >
          Discord
        </a>
      </div>

      <div className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul className="flex flex-col items-center gap-7">
          {links.map(({ to, label }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  href={to}
                  onClick={() => setOpen(false)}
                  className={`font-display text-[clamp(2rem,8vw,2.8rem)] font-extrabold tracking-tight [font-stretch:115%] transition-colors duration-200 ${
                    active ? 'text-primary text-glow-shadow' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
          className="btn-primary mt-2 text-base"
        >
          Dołącz przez Discord
        </a>
      </div>
    </nav>
  )
}
