import { useEffect, useRef } from 'react'
import styles from './CtaSection.module.css'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

export default function CtaSection() {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.classList.add(styles.innerHidden)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(styles.innerHidden)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} aria-label="Dołącz do serwera">
      <img
        src="/image6.png"
        alt=""
        aria-hidden="true"
        className={styles.bg}
        draggable={false}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner} ref={innerRef}>
        <h2 className={styles.heading}>Gotowy na Los Santos?</h2>
        <p className={styles.sub}>
          Dołącz na Discord, przejdź krótką weryfikację i wskocz do miasta.
        </p>
        <div className={styles.actions}>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.btnPrimary}
          >
            Dołącz na Discord
          </a>
        </div>
      </div>
    </section>
  )
}
