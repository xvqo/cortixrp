'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import FluidShader from '@/components/FluidShader'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

const STEPS = [
  { num: '01', title: 'Dołącz na Discord', desc: 'Wejdź na nasz serwer Discord. To centrum całej społeczności. Tam znajdziesz ogłoszenia, kanały tematyczne i kontakt z ekipą.' },
  { num: '02', title: 'Przeczytaj regulamin', desc: 'Zapoznaj się dokładnie z zasadami gry w kanale #regulamin. Znajomość regulaminu jest wymagana podczas rozmowy weryfikacyjnej.' },
  { num: '03', title: 'Czekaj na otwarte okienko', desc: 'Rekrutacja odbywa się w ustalonych terminach. Śledź kanał #ogłoszenia: tam pojawiają się informacje o otwartych okienkach.' },
  { num: '04', title: 'Wejdź na kanał głosowy', desc: 'Gdy rekrutacja jest otwarta, przejdź na dedykowany kanał głosowy. Upewnij się, że masz sprawny mikrofon.' },
  { num: '05', title: 'Zdaj rozmowę', desc: 'Porozmawiasz z członkiem ekipy, który sprawdzi czy znasz zasady i rozumiesz klimat roleplay. To nieformalna rozmowa, nie egzamin.' },
]

const FIRST_STEPS = [
  { title: 'Stwórz swoją postać', desc: 'Wymyśl imię, historię i osobowość. Im bardziej przemyślana postać, tym lepsza rozgrywka dla Ciebie i innych.' },
  { title: 'Zacznij od legalnej pracy', desc: 'Na starcie wybierz legalną pracę: taksówkarz, mechanik, dostawca. Zarobisz pierwsze pieniądze i poznasz miasto.' },
  { title: 'Rozmawiaj zawsze IC', desc: 'Na serwerze jesteś swoją postacią. Używaj voice chatu, traktuj innych jak ich postacie, nie jak graczy.' },
  { title: 'Nie śpiesz się', desc: 'Dobry RP to nie wyścig. Rób rzeczy powoli i naturalnie. Każda interakcja to okazja do budowania historii.' },
]

const TERMS = [
  { abbr: 'IC',     name: 'In Character',      def: 'Sytuacja rozgrywająca się w ramach gry, jako Twoja postać.' },
  { abbr: 'OOC',    name: 'Out of Character',   def: 'Poza rolą, jako gracz. Używaj rzadko i tylko gdy naprawdę konieczne.' },
  { abbr: 'MG',     name: 'Meta Gaming',        def: 'Używanie wiedzy spoza gry (np. z czatu, streama) podczas rozgrywki. Zakazane.' },
  { abbr: 'PG',     name: 'Power Gaming',       def: 'Wymuszanie na innych nierealistycznych akcji lub ignorowanie ich reakcji.' },
  { abbr: 'RDM',    name: 'Random Deathmatch',  def: 'Zabicie kogoś bez żadnego powodu fabularnego.' },
  { abbr: 'VDM',    name: 'Vehicle Deathmatch', def: 'Celowe potrącanie graczy samochodem bez uzasadnienia RP.' },
  { abbr: 'BW',     name: 'Bleed Out / Black',  def: 'Stan nieprzytomności: Twoja postać leży i czeka na pomoc lub ewakuację.' },
  { abbr: 'CK',     name: 'Character Kill',     def: 'Permanentna śmierć postaci. Wymaga specjalnej zgody administracji.' },
  { abbr: 'NJ',     name: 'Ninja Jack',         def: 'Kradzież pojazdu bez żadnej interakcji RP z kierowcą. Zakazana.' },
  { abbr: 'CB',     name: 'Cop Bait',           def: 'Celowe prowokowanie policji bez sensu fabularnego.' },
  { abbr: 'CL',     name: 'Combat Log',         def: 'Rozłączenie się z serwera w trakcie akcji, aby uniknąć jej konsekwencji.' },
  { abbr: 'FailRP', name: 'Fail Role Play',     def: 'Zachowanie sprzeczne z logiką świata gry lub charakterem postaci.' },
]

export default function BeginnerPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sections = document.querySelectorAll('.beginner-section')
    sections.forEach((el) => el.classList.add('is-hidden'))
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove('is-hidden'); sectionObserver.unobserve(e.target) }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach((el) => sectionObserver.observe(el))

    const steps = document.querySelectorAll('[data-step]')
    steps.forEach((el) => el.classList.add('is-hidden'))
    const stepObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.dataset.step)
          setTimeout(() => e.target.classList.remove('is-hidden'), idx * 90)
          stepObserver.unobserve(e.target)
        }
      }),
      { threshold: 0.2 }
    )
    steps.forEach((el) => stepObserver.observe(el))

    return () => { sectionObserver.disconnect(); stepObserver.disconnect() }
  }, [])

  return (
    <div className="doc-page">
      <header className="doc-hero">
        <img src="/hero-bg.png" alt="" aria-hidden="true" className="doc-hero-bg" draggable={false} />
        <div className="doc-hero-fx"><FluidShader dim={0.95} /></div>
        <div className="scrim-doc" aria-hidden="true" />
        <div className="glow-radial" aria-hidden="true" />
        <div className="doc-hero-content">
          <span className="kicker">Przewodnik dla nowych</span>
          <h1>Pierwszy raz<br />w <em>Los Santos</em></h1>
          <p className="doc-hero-sub">
            Wszystko, co musisz wiedzieć przed pierwszym logowaniem. Przeczytaj, zapamiętaj i wskakuj do miasta.
          </p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-primary/15 pt-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint max-lg:justify-center">
            <div className="flex items-center gap-2">
              <dt>Wymagania</dt>
              <dd className="text-glow">16+ lat</dd>
            </div>
            <span className="text-primary/30" aria-hidden="true">/</span>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Dostęp</dt>
              <dd className="text-ink-muted">Whitelist</dd>
            </div>
            <span className="text-primary/30" aria-hidden="true">/</span>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Sprzęt</dt>
              <dd className="text-ink-muted">Mikrofon</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="beginner-inner">

        {/* Jak dołączyć — timeline */}
        <section className="beginner-section">
          <span className="kicker">Krok po kroku</span>
          <h2 className="beginner-title">Jak dołączyć do serwera</h2>
          <p className="beginner-sub">
            CortixRP działa na systemie whitelist: każdy gracz przechodzi krótką weryfikację.
            Rekrutacja odbywa się w otwartych okienkach, o których dowiesz się na Discordzie.
          </p>

          <div className="relative mt-2">
            <div
              className="pointer-events-none absolute bottom-6 left-[1.3rem] top-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent max-[480px]:left-[1.1rem]"
              aria-hidden="true"
            />
            <ol className="flex flex-col gap-9">
              {STEPS.map((step, i) => (
                <li key={step.num} data-step={i} className="reveal relative flex gap-6 max-[480px]:gap-4">
                  <div className="relative z-[1] flex h-[2.6rem] w-[2.6rem] shrink-0 items-center justify-center rounded-full border border-primary/40 bg-bg font-mono text-sm font-bold text-primary [box-shadow:0_0_26px_-6px_oklch(0.66_0.18_248/0.7)] max-[480px]:h-9 max-[480px]:w-9">
                    {step.num}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink [font-stretch:108%]">{step.title}</h3>
                    <p className="mt-2 max-w-[58ch] text-base leading-[1.7] text-ink-muted">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pierwsze kroki — tips */}
        <section className="beginner-section">
          <h2 className="beginner-title">Pierwsze kroki na serwerze</h2>
          <p className="beginner-sub">Dostałeś whitelist. Co teraz? Cztery rzeczy na dobry start.</p>
          <div className="grid grid-cols-2 gap-x-14 max-[760px]:grid-cols-1">
            {FIRST_STEPS.map((tip, i) => (
              <div
                key={tip.title}
                className="group flex items-start gap-6 border-t border-border py-9 [&:nth-child(-n+2)]:border-t-0 max-[760px]:[&:nth-child(2)]:border-t max-[760px]:py-7"
              >
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[3.5rem] font-extrabold leading-[0.8] text-transparent transition-colors duration-300 [-webkit-text-stroke:1.5px_oklch(0.66_0.18_248/0.45)] [font-stretch:120%] group-hover:text-primary group-hover:[text-shadow:0_0_28px_oklch(0.66_0.18_248/0.6)] max-[760px]:text-[2.8rem]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink [font-stretch:108%]">{tip.title}</h3>
                  <p className="mt-2 max-w-[42ch] text-sm leading-[1.7] text-ink-muted">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Słownik */}
        <section className="beginner-section">
          <h2 className="beginner-title">Słownik pojęć RP</h2>
          <p className="beginner-sub">Terminy, które usłyszysz na serwerze i na Discordzie. Zapamiętaj je przed rozmową weryfikacyjną.</p>
          <dl className="beginner-glossary">
            {TERMS.map((term) => (
              <div key={term.abbr} className="beginner-glossary-item">
                <dt>
                  <span className="beginner-glossary-abbr">{term.abbr}</span>
                  <span className="beginner-glossary-name">{term.name}</span>
                </dt>
                <dd>{term.def}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="beginner-cta">
          <div className="beginner-cta-content">
            <h2>Gotowy na Los Santos?</h2>
            <p>Dołącz na Discord, śledź ogłoszenia i złap wolne okienko rekrutacyjne.</p>
          </div>
          <div className="beginner-cta-actions">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-primary">Dołącz na Discord</a>
            <Link href="/regulamin" className="btn-ghost">Przeczytaj regulamin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
