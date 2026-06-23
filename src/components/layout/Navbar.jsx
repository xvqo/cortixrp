'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  // Lock scroll while the mobile menu is open (covers Lenis + native touch)
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    if (open) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      window.lenis?.stop()
    } else {
      html.style.overflow = ''
      body.style.overflow = ''
      window.lenis?.start()
    }
    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
      window.lenis?.start()
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overlay = (
    <div className={`nav-overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="absolute inset-x-0 top-0 flex h-[72px] items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="OutsetRP — strona główna"
          className="flex items-center"
        >
          <img src="/logo.svg" alt="OutsetRP" className="h-14 w-auto" />
        </Link>
        <button
          onClick={() => setOpen(false)}
          aria-label="Zamknij menu"
          className="-mr-1.5 flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-ink"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <ul className="flex w-full flex-col items-center gap-7">
        {links.map(({ to, label }) => {
          const active = pathname === to
          return (
            <li key={to} className="w-full">
              <Link
                href={to}
                onClick={() => setOpen(false)}
                className={`block text-balance text-center font-display text-[clamp(1.75rem,7vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight [font-stretch:115%] transition-colors duration-200 ${
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
  )

  return (
    <nav
      className={`sticky top-0 z-[100] border-b transition-colors duration-300 ${
        scrolled && !open ? 'border-primary/12 bg-bg-deep/25 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="relative z-10 mx-auto flex h-[72px] max-w-page items-center gap-8 px-8 min-[1921px]:max-w-wide max-md:px-6">
        <Link
          href="/"
          aria-label="OutsetRP — strona główna"
          className="mr-auto flex items-center"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault()
              if (window.lenis) window.lenis.scrollTo(0, { duration: 1.1 })
              else window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <img src="/logo.svg" alt="OutsetRP" className="h-14 w-auto" />
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
          className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_30px_-10px_oklch(from_var(--color-primary)_l_c_h/0.6)] lg:inline-flex"
        >
          Discord
        </a>
      </div>

      {mounted && createPortal(overlay, document.body)}
    </nav>
  )
}
