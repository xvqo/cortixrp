import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './BeginnerPage.module.css'

const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

const STEPS = [
  {
    num: '01',
    title: 'Dołącz na Discord',
    desc: 'Wejdź na nasz serwer Discord — to centrum całej społeczności. Tam znajdziesz ogłoszenia, kanały tematyczne i kontakt z ekipą.',
  },
  {
    num: '02',
    title: 'Przeczytaj regulamin',
    desc: 'Zapoznaj się dokładnie z zasadami gry w kanale #regulamin. Znajomość regulaminu jest wymagana podczas rozmowy weryfikacyjnej.',
  },
  {
    num: '03',
    title: 'Czekaj na otwarte okienko',
    desc: 'Rekrutacja odbywa się w ustalonych terminach. Śledź kanał #ogłoszenia — tam pojawiają się informacje o otwartych okienkach.',
  },
  {
    num: '04',
    title: 'Wejdź na kanał głosowy',
    desc: 'Gdy rekrutacja jest otwarta, przejdź na dedykowany kanał głosowy. Upewnij się, że masz sprawny mikrofon.',
  },
  {
    num: '05',
    title: 'Zdaj rozmowę',
    desc: 'Porozmawiasz z członkiem ekipy, który sprawdzi czy znasz zasady i rozumiesz klimat roleplay. To nieformalna rozmowa, nie egzamin.',
  },
]

const FIRST_STEPS = [
  {
    title: 'Stwórz swoją postać',
    desc: 'Wymyśl imię, historię i osobowość. Im bardziej przemyślana postać, tym lepsza rozgrywka dla Ciebie i innych.',
  },
  {
    title: 'Zacznij od legalnej pracy',
    desc: 'Na starcie wybierz legalną pracę — taksówkarz, mechanik, dostawca. Zarobisz pierwsze pieniądze i poznasz miasto.',
  },
  {
    title: 'Rozmawiaj zawsze IC',
    desc: 'Na serwerze jesteś swoją postacią. Używaj voice chatu, traktuj innych jak ich postacie, nie jak graczy.',
  },
  {
    title: 'Nie śpiesz się',
    desc: 'Dobry RP to nie wyścig. Rób rzeczy powoli i naturalnie — każda interakcja to okazja do budowania historii.',
  },
]

const TERMS = [
  { abbr: 'IC',     name: 'In Character',      def: 'Sytuacja rozgrywająca się w ramach gry, jako Twoja postać.' },
  { abbr: 'OOC',    name: 'Out of Character',   def: 'Poza rolą, jako gracz. Używaj rzadko i tylko gdy naprawdę konieczne.' },
  { abbr: 'MG',     name: 'Meta Gaming',        def: 'Używanie wiedzy spoza gry (np. z czatu, streama) podczas rozgrywki. Zakazane.' },
  { abbr: 'PG',     name: 'Power Gaming',       def: 'Wymuszanie na innych nierealistycznych akcji lub ignorowanie ich reakcji.' },
  { abbr: 'RDM',    name: 'Random Deathmatch',  def: 'Zabicie kogoś bez żadnego powodu fabularnego.' },
  { abbr: 'VDM',    name: 'Vehicle Deathmatch', def: 'Celowe potrącanie graczy samochodem bez uzasadnienia RP.' },
  { abbr: 'BW',     name: 'Bleed Out / Black',  def: 'Stan nieprzytomności — Twoja postać leży i czeka na pomoc lub ewakuację.' },
  { abbr: 'CK',     name: 'Character Kill',     def: 'Permanentna śmierć postaci. Wymaga specjalnej zgody administracji.' },
  { abbr: 'NJ',     name: 'Ninja Jack',         def: 'Kradzież pojazdu bez żadnej interakcji RP z kierowcą. Zakazana.' },
  { abbr: 'CB',     name: 'Cop Bait',           def: 'Celowe prowokowanie policji bez sensu fabularnego.' },
  { abbr: 'CL',     name: 'Combat Log',         def: 'Rozłączenie się z serwera w trakcie akcji, aby uniknąć jej konsekwencji.' },
  { abbr: 'FailRP', name: 'Fail Role Play',     def: 'Zachowanie sprzeczne z logiką świata gry lub charakterem postaci.' },
]

export default function BeginnerPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Section reveals
    const sections = document.querySelectorAll(`.${styles.section}`)
    sections.forEach(el => el.classList.add(styles.sectionHidden))

    const sectionObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove(styles.sectionHidden)
          sectionObserver.unobserve(e.target)
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    sections.forEach(el => sectionObserver.observe(el))

    // Steps stagger
    const steps = document.querySelectorAll(`.${styles.step}`)
    steps.forEach((el, i) => {
      el.style.setProperty('--i', i)
      el.classList.add(styles.stepHidden)
    })

    const stepObserver = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove(styles.stepHidden)
          stepObserver.unobserve(e.target)
        }
      }),
      { threshold: 0.1 }
    )
    steps.forEach(el => stepObserver.observe(el))

    return () => { sectionObserver.disconnect(); stepObserver.disconnect() }
  }, [])

  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <img src="/hero-bg.png" alt="" aria-hidden="true" className={styles.heroBg} draggable={false} />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <h1>Dla<br /><em>początkujących</em></h1>
          <p className={styles.heroSub}>
            Wszystko co musisz wiedzieć przed pierwszym logowaniem.
            Przeczytaj, zapamiętaj i wskakuj do Los Santos.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.badge}>16+ lat</span>
            <span className={styles.badge}>Whitelist</span>
            <span className={styles.badge}>Mikrofon wymagany</span>
          </div>
        </div>
      </header>

      <div className={styles.inner}>

        {/* ── Jak dołączyć ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Jak dołączyć do serwera</h2>
          <p className={styles.sectionSub}>
            CortixRP działa na systemie whitelist — każdy gracz przechodzi krótką weryfikację.
            Rekrutacja odbywa się w otwartych okienkach, o których dowiesz się na Discordzie.
          </p>

          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepBody}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={styles.stepConnector} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Pierwsze kroki ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pierwsze kroki na serwerze</h2>
          <p className={styles.sectionSub}>
            Dostałeś whitelist — co teraz? Kilka wskazówek na dobry start.
          </p>

          <div className={styles.tips}>
            {FIRST_STEPS.map((tip, i) => (
              <div key={tip.title} className={styles.tip}>
                <span className={styles.tipNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Słownik RP ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Słownik pojęć RP</h2>
          <p className={styles.sectionSub}>
            Terminy które usłyszysz na serwerze i na Discordzie. Zapamiętaj je przed rozmową weryfikacyjną.
          </p>

          <dl className={styles.glossary}>
            {TERMS.map((term) => (
              <div key={term.abbr} className={styles.glossaryItem}>
                <dt>
                  <span className={styles.glossaryAbbr}>{term.abbr}</span>
                  <span className={styles.glossaryName}>{term.name}</span>
                </dt>
                <dd>{term.def}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── CTA ── */}
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Gotowy na Los Santos?</h2>
            <p>Dołącz na Discord, śledź ogłoszenia i złap wolne okienko rekrutacyjne.</p>
          </div>
          <div className={styles.ctaActions}>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.ctaBtn}>
              Dołącz na Discord
            </a>
            <NavLink to="/regulamin" className={styles.ctaSecondary}>
              Przeczytaj regulamin
            </NavLink>
          </div>
        </div>

      </div>
    </div>
  )
}
