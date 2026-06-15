'use client'

import { useState, useEffect, useRef } from 'react'

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
    a: 'Zgłoszenia trafiają przez system ticketów na Discordzie. Nigdy nie zgłaszaj problemów w grze na kanale IC, wyłącznie ticket system. Staramy się odpowiadać na każde zgłoszenie w ciągu kilku godzin.',
  },
]

function FaqItem({ question, answer, open, onToggle, index }) {
  return (
    <div className={`faq-item ${open ? 'is-open' : ''}`} data-faq-item={index}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span className="faq-q-text">{question}</span>
        <svg className="faq-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="faq-answer">
        <div className="faq-answer-inner">
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = listRef.current?.querySelectorAll('[data-faq-item]')
    if (!items) return
    items.forEach((el) => el.classList.add('is-hidden'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number(entry.target.dataset.faqItem)
          setTimeout(() => entry.target.classList.remove('is-hidden'), idx * 70)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-32 max-sm:py-24" aria-label="Najczęściej zadawane pytania">
      <div className="mx-auto grid max-w-page grid-cols-[1fr_1.5fr] items-start gap-[clamp(3rem,6vw,6rem)] px-8 min-[1921px]:max-w-wide max-[900px]:grid-cols-1 max-[900px]:gap-10 max-md:px-6">
        <div>
          <h2 className="mb-5 font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.02em] text-ink [font-stretch:112%]">
            Pytania<br />i odpowiedzi
          </h2>
          <p className="mb-8 max-w-[34ch] text-base leading-[1.7] text-ink-muted max-[900px]:max-w-none">
            Zebraliśmy odpowiedzi na najczęstsze pytania przed dołączeniem do serwera.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-sm font-medium text-glow transition-colors duration-200 hover:text-ink"
          >
            Napisz do nas na Discord
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M3 11L11 3M11 3H6M11 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="flex flex-col" ref={listRef}>
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
