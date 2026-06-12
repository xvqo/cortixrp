import { useServerStats } from '../hooks/useServerStats'
import ServerStats from '../components/sections/ServerStats'
import GallerySection from '../components/sections/GallerySection'
import FaqSection from '../components/sections/FaqSection'
import CtaSection from '../components/sections/CtaSection'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { stats } = useServerStats()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        {/* Hero background image */}
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className={styles.heroBg}
          fetchpriority="high"
          draggable={false}
        />

        {/* Dark overlay — blends image into dark theme */}
        <div className={styles.heroOverlay} aria-hidden="true" />

        {/* Ambient glow */}
        <div className={styles.glow} aria-hidden="true" />

        {/* GTA characters — PNG with transparent bg */}
        <img
          src="/characters.png"
          alt=""
          aria-hidden="true"
          className={styles.characters}
          draggable={false}
        />

        {/* Hero text content */}
        <div className={styles.heroContent}>
          <div className={styles.status}>
            <span className={styles.dot} />
            <span>
              Serwer online
              {stats && (
                <span className={styles.playerCount}>&nbsp;&middot;&nbsp;{stats.playersOnline} graczy</span>
              )}
            </span>
          </div>

          <h1>
            Graj na własnych<br />
            <em>zasadach</em>
          </h1>

          <p>
            CortixRP to casualowy serwer roleplay, gdzie sam decydujesz kim jesteś.
            Policjant, mechanik, przedsiębiorca czy coś zupełnie innego — Los Santos czeka.
          </p>

          <div className={styles.actions}>
            <a href="https://discord.gg/CZEtYxkTDy" target="_blank" rel="noreferrer" className={styles.btn}>
              Dołącz na Discord
            </a>
          </div>
        </div>
      </section>

      <ServerStats />

      <GallerySection />

      <FaqSection />

      <CtaSection />
    </div>
  )
}
