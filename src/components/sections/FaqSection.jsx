'use client'

import { useState, useEffect, useRef } from 'react'
import { FAQS } from '@/data/faqs'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

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

  // Reserve a fixed height for the list (collapsed rows + tallest answer) so
  // opening an item doesn't grow the section and push the CTA below it.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const compute = () => {
      const itemEls = Array.from(list.querySelectorAll('.faq-item'))
      if (!itemEls.length) return
      let base = itemEls.length // ~1px border per item
      itemEls.forEach((it) => { base += it.querySelector('.faq-q')?.offsetHeight ?? 0 })
      let maxAns = 0
      list.querySelectorAll('.faq-answer-inner').forEach((el) => { maxAns = Math.max(maxAns, el.scrollHeight) })
      list.style.minHeight = `${base + maxAns + 8}px`
    }
    compute()
    const t = setTimeout(compute, 350) // recompute after webfont settles
    window.addEventListener('resize', compute)
    if (document.fonts?.ready) document.fonts.ready.then(compute).catch(() => {})
    return () => { clearTimeout(t); window.removeEventListener('resize', compute) }
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
