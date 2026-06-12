import { useServerStats } from '../../hooks/useServerStats'
import { useCountUp } from '../../hooks/useCountUp'
import styles from './ServerStats.module.css'

function StatItem({ value, label, descriptor, delay = 0 }) {
  const { value: displayed, ref } = useCountUp(value, 1100 + delay)
  const formatted = displayed.toLocaleString('pl-PL')

  return (
    <div className={styles.stat} ref={ref}>
      <span
        className={styles.number}
        aria-label={`${value.toLocaleString('pl-PL')} ${label}`}
      >
        {formatted}
      </span>
      <span className={styles.label}>{label}</span>
      <span className={styles.descriptor}>{descriptor}</span>
    </div>
  )
}

function SkeletonItem() {
  return (
    <div className={styles.stat}>
      <span className={`${styles.skeleton} ${styles.skeletonNum}`}   aria-hidden="true" />
      <span className={`${styles.skeleton} ${styles.skeletonLabel}`} aria-hidden="true" />
      <span className={`${styles.skeleton} ${styles.skeletonDesc}`}  aria-hidden="true" />
    </div>
  )
}

export default function ServerStats() {
  const { stats, loading } = useServerStats()

  return (
    <section className={styles.section} aria-label="Statystyki serwera">
      <div className={styles.inner}>
        {loading ? (
          <>
            <SkeletonItem />
            <div className={styles.sep} aria-hidden="true" />
            <SkeletonItem />
            <div className={styles.sep} aria-hidden="true" />
            <SkeletonItem />
          </>
        ) : (
          <>
            <StatItem
              value={stats.hoursPlayed}
              label="godzin rozgrywki"
              descriptor="łącznie w tym miesiącu"
              delay={0}
            />
            <div className={styles.sep} aria-hidden="true" />
            <StatItem
              value={stats.whitelistApproved}
              label="zatwierdzonych whitelist"
              descriptor="od uruchomienia serwera"
              delay={120}
            />
            <div className={styles.sep} aria-hidden="true" />
            <StatItem
              value={stats.playersOnline}
              label="graczy online"
              descriptor="aktualnie na serwerze"
              delay={240}
            />
          </>
        )}
      </div>
    </section>
  )
}
