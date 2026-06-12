import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'
const AVENLY_URL  = 'https://avenly.pl/'

const NAV_LINKS = [
  { to: '/regulamin',          label: 'Regulamin'          },
  { to: '/dla-poczatkujacych', label: 'Dla początkujących' },
]


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* ── Główna siatka: brand + sitemap ── */}
        <div className={styles.main}>

          {/* Brand po lewej */}
          <div className={styles.brand}>
            <NavLink to="/" className={styles.logo}>
              Cortix<span>RP</span>
            </NavLink>
            <p className={styles.tagline}>
              Casualowy serwer roleplay na FiveM.<br />
              Los Santos czeka.
            </p>
          </div>

          {/* Sitemap po prawej */}
          <div className={styles.sitemap}>
            <div className={styles.col}>
              <p className={styles.colLabel}>Nawigacja</p>
              <ul>
                {NAV_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <NavLink to={to} className={styles.link}>{label}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.col}>
              <p className={styles.colLabel}>Social media</p>
              <ul>
                <li>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.link}>Discord</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div className={styles.divider} aria-hidden="true" />

        {/* ── Bottom bar ── */}
        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} CortixRP</p>

          <p className={styles.disclaimer}>
            This server is not affiliated with or endorsed by Rockstar Games.
          </p>

          <p className={styles.avelyLine}>
            Strona stworzona przez{' '}
            <a href={AVENLY_URL} target="_blank" rel="noreferrer" className={styles.avelyLink}>
              avenly.pl
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
