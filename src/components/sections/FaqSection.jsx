import { useState, useEffect, useRef } from 'react'
import styles from './FaqSection.module.css'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

const FAQS = [
  {
    q: 'Jak wygląda proces dołączenia do serwera?',
    a: 'CortixRP działa na systemie whitelist. Dołącz na nasz Discord, zapoznaj się z regulaminem i wypełnij formularz aplikacyjny. Ekipa rozpatruje wnioski i po pozytywnej weryfikacji otrzymasz dostęp.',
  },
  {
    q: 'Ile czeka się na rozpatrzenie aplikacji?',
    a: 'Rozpatrywanie wniosków zajmuje zazwyczaj 24 do 72 godzin. W weekendy i podczas dużego ruchu czas może się wydłużyć. Status sprawdzisz na Discordzie w dedykowanym kanale.',
  },
  {
    q: 'Czy granie na serwerze jest płatne?',
    a: 'Nie. Gra na CortixRP jest w pełni darmowa. Sklep z pakietami VIP istnieje wyłącznie jako dobrowolne wsparcie i nie daje żadnej przewagi w rozgrywce.',
  },
  {
    q: 'Jaki sprzęt i oprogramowanie są potrzebne?',
    a: 'Potrzebujesz legalnej kopii GTA V oraz klienta FiveM (dostępny bezpłatnie na fivem.net). Minimalne wymagania to 8 GB RAM i karta graficzna z obsługą DirectX 11.',
  },
  {
    q: 'Co się dzieje po naruszeniu regulaminu?',
    a: 'System kar działa stopniowo: ostrzeżenie, kick, ban czasowy, a przy poważnych naruszeniach ban permanentny. Każda decyzja jest udokumentowana. Odwołanie składa się przez ticket na Discordzie.',
  },
  {
    q: 'Jak zgłosić gracza lub problem techniczny?',
    a: 'Zgłoszenia trafiają przez system ticketów na Discordzie. Nigdy nie zgłaszaj problemów w grze na kanale IC — wyłącznie ticket system. Staramy się odpowiadać na każde zgłoszenie w ciągu kilku godzin.',
  },
]

function FaqItem({ question, answer, open, onToggle, index }) {
  return (
    <div
      className={`${styles.item} ${open ? styles.itemOpen : ''}`}
      data-faq-item={index}
    >
      <button className={styles.question} onClick={onToggle} aria-expanded={open}>
        <span className={styles.questionText}>{question}</span>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={styles.answer}>
        <div className={styles.answerInner}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 900px)').matches
    if (prefersReduced || isMobile) return

    const items = listRef.current?.querySelectorAll('[data-faq-item]')
    if (!items) return

    items.forEach(el => el.classList.add(styles.itemHidden))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.faqItem)
            setTimeout(() => {
              entry.target.classList.remove(styles.itemHidden)
            }, idx * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    items.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} aria-label="Najczęściej zadawane pytania">
      <div className={styles.inner}>

        {/* Left: heading + context */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Pytania<br />i odpowiedzi</h2>
          <p className={styles.sub}>
            Zebraliśmy odpowiedzi na najczęstsze pytania przed dołączeniem do serwera.
          </p>
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.discordLink}>
            Napisz do nas na Discord
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H6M11 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right: accordion */}
        <div className={styles.list} ref={listRef}>
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              index={i}
              question={faq.q}
              answer={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
