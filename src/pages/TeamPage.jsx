import styles from './Page.module.css'

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <h1>Ekipa</h1>
      <p className={styles.subtitle}>Poznaj ludzi stojących za serwerem.</p>
      <div className={styles.content}>
        <p>Lista członków ekipy zostanie tu dodana.</p>
      </div>
    </div>
  )
}
