import styles from './Page.module.css'

export default function StorePage() {
  return (
    <div className={styles.page}>
      <h1>Sklep</h1>
      <p className={styles.subtitle}>Wspomóż serwer i odblokuj unikalne przywileje.</p>
      <div className={styles.content}>
        <p>Oferty sklepu zostaną tu dodane.</p>
      </div>
    </div>
  )
}
