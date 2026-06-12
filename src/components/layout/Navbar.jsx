import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

const links = [
  { to: '/regulamin',          label: 'Regulamin'         },
  { to: '/dla-poczatkujacych', label: 'Dla początkujących' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={styles.nav}>
      {/* ── Top bar — constrained to max-width ── */}
      <div className={styles.navInner}>
        <NavLink
          to="/"
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Cortix<span>RP</span>
        </NavLink>

        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>

        {/* Desktop nav links */}
        <ul className={styles.desktopLinks}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => isActive ? styles.active : ''}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
          Discord
        </a>
      </div>

      {/* ── Mobile fullscreen overlay — direct child of nav so position:absolute
           is relative to the full-width sticky nav, not the constrained navInner ── */}
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.overlayLinks}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? styles.overlayActive : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className={styles.overlayCtaBtn}
          onClick={() => setOpen(false)}
        >
          Dołącz przez Discord
        </a>
      </div>
    </nav>
  )
}
