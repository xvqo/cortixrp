'use client'

import { useEffect, useState } from 'react'
import FluidShader from '@/components/FluidShader'

function Tag({ children }) {
  return <span className="rules-tag">{children}</span>
}

function Rule({ id, children }) {
  return (
    <li id={id} className="rules-rule">
      <span className="rules-id">{id}</span>
      <span className="rules-text">{children}</span>
    </li>
  )
}

const CHAPTERS = [
  { id: '1', n: '01', label: 'Postanowienia ogólne' },
  { id: '2', n: '02', label: 'Zasady ogólne' },
  { id: '3', n: '03', label: 'Rządowy (Discord)' },
  { id: '4', n: '04', label: 'Rozgrywka' },
  { id: '5', n: '05', label: 'Zdrowie i amnezja' },
  { id: '6', n: '06', label: 'Przestępstwa' },
  { id: '7', n: '07', label: 'Pojazdy' },
  { id: '8', n: '08', label: 'Obywatel' },
  { id: '9', n: '09', label: 'Policja i Medycy' },
  { id: 'zasada', n: '★', label: 'Złota zasada' },
]

export default function RulesPage() {
  const [active, setActive] = useState('1')

  const jumpTo = (e, id) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    setActive(id)
    if (window.lenis) window.lenis.scrollTo(el, { offset: -100, duration: 1.0 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (history.replaceState) history.replaceState(null, '', `#${id}`)
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scroll-spy for the chapter index
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    )
    document.querySelectorAll('[data-chapter]').forEach((el) => spy.observe(el))

    // Section reveal
    let reveal
    if (!reduced) {
      const sections = document.querySelectorAll('.rules-section')
      sections.forEach((el) => el.classList.add('is-hidden'))
      reveal = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.remove('is-hidden'); reveal.unobserve(e.target) }
        }),
        { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
      )
      sections.forEach((el) => reveal.observe(el))
    }

    return () => { spy.disconnect(); reveal?.disconnect() }
  }, [])

  return (
    <div className="doc-page">
      <header className="doc-hero">
        <img src="/hero-bg.webp" alt="" aria-hidden="true" className="doc-hero-bg" draggable={false} />
        <div className="doc-hero-fx"><FluidShader dim={0.95} /></div>
        <div className="scrim-doc" aria-hidden="true" />
        <div className="glow-radial" aria-hidden="true" />
        <div className="doc-hero-content">
          <span className="kicker">Zasady serwera</span>
          <h1>Regulamin <em>serwera</em></h1>
          <p className="doc-hero-sub">
            Zapoznaj się z zasadami przed dołączeniem. Złożenie aplikacji whitelist
            jest równoznaczne z akceptacją poniższego regulaminu.
          </p>
          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-primary/15 pt-6 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint max-lg:justify-center">
            <div className="flex items-center gap-2">
              <dt>Aktualizacja</dt>
              <dd className="text-glow">15.06.2026</dd>
            </div>
            <span className="text-primary/30" aria-hidden="true">/</span>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Liczba rozdziałów</dt>
              <dd className="text-ink-muted">9 rozdziałów</dd>
            </div>
            <span className="text-primary/30" aria-hidden="true">/</span>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Czas czytania</dt>
              <dd className="text-ink-muted">~8 min czytania</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-page grid-cols-[260px_1fr] gap-16 px-8 pb-32 pt-16 [counter-reset:rules-counter] min-[1921px]:max-w-wide max-[1024px]:grid-cols-1 max-[1024px]:gap-8 max-md:px-6 max-md:pt-12 max-[480px]:px-5">

        <nav className="sticky top-[96px] hidden max-h-[calc(100vh-120px)] flex-col gap-1 self-start overflow-y-auto pr-2 lg:flex" aria-label="Spis rozdziałów">
          <p className="mb-3 px-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">Rozdziały</p>
          {CHAPTERS.map((c) => {
            const on = active === c.id
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => jumpTo(e, c.id)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 font-mono text-xs transition-colors duration-200 ${
                  on ? 'bg-primary/10 text-ink' : 'text-ink-faint hover:bg-primary/5 hover:text-ink-muted'
                }`}
              >
                <span className={on ? 'text-primary' : 'text-ink-faint'}>{c.n}</span>
                <span className="truncate">{c.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="min-w-0">

          <section id="1" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Postanowienia ogólne</h2>
            <ol className="rules-list">
              <Rule id="1.1">Regulamin jest własnością OutsetRP i zabrania się jego kopiowania. OutsetRP zastrzega sobie prawo do edycji regulaminu.</Rule>
              <Rule id="1.2">Złożenie podania na stronie internetowej OutsetRP jest równoznaczne z akceptacją regulaminu. Konta są własnością OutsetRP, a użytkownicy posiadają prawa do ich używania. W przypadku naruszenia regulaminu dostęp do konta może zostać odebrany.</Rule>
              <Rule id="1.3">Zakazuje się: <Tag>MetaGamingu (MG)</Tag> we wszystkich formach (stream sniping, sugerowanie się czatem, przebywanie na komunikatorze podczas rozgrywki), <Tag>PowerGamingu (PG)</Tag>, <Tag>Vehicle Deathmatchu (VDM)</Tag>, <Tag>Random Deathmatchu (RDM)</Tag>, <Tag>NinjaJackingu (NJ)</Tag>, <Tag>CopBaitingu (CB)</Tag>, <Tag>CombatLogu (CL)</Tag>, <Tag>RevengeKillingu (RK)</Tag>, wychodzenia z roli oraz nierealistycznych sytuacji.</Rule>
              <Rule id="1.4">Brak znajomości regulaminu nie zwalnia z jego przestrzegania.</Rule>
              <Rule id="1.5">Nieumiejętne korzystanie z czatu Local OOC (floodowanie, zbędne komentarze, śmieszki) jest traktowane jako wyjście z roli i karane banem.</Rule>
              <Rule id="1.6">Podczas gry niezbędna jest wiedza o klawiszach. Kanał <code>#klawiszologia</code> znajduje się na naszym Discordzie.</Rule>
              <Rule id="1.7">Administrator ma prawo karać za czyny nieuwzględnione w regulaminie, jeśli uzna to za słuszne, łącznie z permanentnym banem bez podania przyczyny. Decyzja administracji jest ostateczna.</Rule>
              <Rule id="1.8">Złożenie aplikacji jest równoznaczne z akceptacją regulaminu.</Rule>
            </ol>
          </section>

          <section id="2" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Zasady ogólne</h2>
            <ol className="rules-list">
              <Rule id="2.1">Na serwerze zakazuje się używania wspomagaczy oraz wykorzystywania bugów. Błędy należy niezwłocznie zgłosić do administracji bezpośrednio na Discordzie.</Rule>
              <Rule id="2.2">Jeśli akcja RP została opuszczona przez crash gry lub brak połączenia, należy to niezwłocznie zgłosić na kanale <code>#crash</code> na Discordzie wraz ze screenshotem z datą i godziną.</Rule>
              <Rule id="2.3">Zakazuje się transakcji między graczami poza serwerem. Administracja nie ponosi odpowiedzialności za straty wynikłe z takich działań.</Rule>
              <Rule id="2.4">Zakazuje się posiadania reklam stron trzecich lub własnych w nazwie użytkownika, w tym platform streamingowych.</Rule>
              <Rule id="2.5">Zakaz używania klawisza <code>[Z]</code> bez potrzeby. Służy wyłącznie do odczytania ID gracza w celu zgłoszenia go administracji.</Rule>
              <Rule id="2.6">Posiadanie „kuzyna" (drugiej postaci) dostępne jest po 60 dniach stażu. Jedna z dwóch postaci musi być w służbach publicznych (LSPD lub EMS). Trzecia postać jest dostępna wyłącznie eventowo dla administracji. Zakazane jest przenoszenie pojazdów, pieniędzy ani przedmiotów między postaciami.</Rule>
              <Rule id="2.7">Zakazane jest używanie słów obraźliwych o podtekstach rasistowskich lub homofobicznych oraz propagowania ustrojów totalitarnych.</Rule>
              <Rule id="2.8">Stan upojenia alkoholowego lub odurzenia innymi środkami nie usprawiedliwia łamania regulaminu.</Rule>
              <Rule id="2.9">Zakazuje się sprzedawania lub wypożyczania konta Steam posiadającego whitelist na OutsetRP.</Rule>
              <Rule id="2.10">Zakazuje się wyrzucania przedmiotów przez <code>/me</code> i <code>/do</code>. Jeśli przedmiot jest w ekwipunku <code>[F2]</code>, faktycznie go posiadasz.</Rule>
              <Rule id="2.11">Zakazuje się używania imion i nazwisk sławnych osób lub fikcyjnych postaci niemożliwych w realnym świecie (np. Barack Obama, Hulk).</Rule>
              <Rule id="2.12">Każda inicjacja grupowa musi odbyć się słownie przez voice-chat przed oddaniem strzałów. Policja i zarejestrowane organizacje przestępcze mają przywilej inicjacji grupowej: wystarczy jedna osoba.</Rule>
              <Rule id="2.13">Skucie kajdankami może nastąpić tylko gdy osoba ma podniesione ręce. Jeśli odmawia, należy ją najpierw powalić dostępnymi środkami (np. taser, nie <Tag>BW</Tag>), a następnie skuć.</Rule>
              <Rule id="2.14">Całkowity zakaz używania komend <code>/register</code>, <code>/skin</code>, <code>/chardel</code> bez zgody administracji.</Rule>
            </ol>
          </section>

          <section id="3" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Rządowy (Discord)</h2>
            <ol className="rules-list">
              <Rule id="3.1">Tylko administrator może wezwać gracza na kanał „Mam sprawę". Gracz ma obowiązek stawić się niezwłocznie po zakończeniu trwającej akcji.</Rule>
              <Rule id="3.2">Podczas streamów lub nagrań rozmów na „rządowym" należy wyciszyć mikrofon, każdy ma prawo do prywatności. Niestosowanie się skutkuje usunięciem z kanału lub banem.</Rule>
              <Rule id="3.3">Gracz oskarżający inną osobę na rządowym musi posiadać dowody w postaci nagrań lub screenshotów.</Rule>
              <Rule id="3.4">Nick na Discordzie musi być identyczny z nickiem na Steamie. Niezgodność może skutkować banem.</Rule>
            </ol>
          </section>

          <section id="4" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Rozgrywka</h2>
            <ol className="rules-list">
              <Rule id="4.1">Zakazuje się odradzania w szpitalu podczas <Tag>BW</Tag> gdy wezwano pomoc medyczną lub policję, bądź w celu uniknięcia akcji RP.</Rule>
              <Rule id="4.2">Narracja prowadzona jest przez komendy <code>/me</code> i <code>/do</code>. Na <code>/do</code> obowiązuje wyłącznie prawda, kłamstwo jest karane.</Rule>
              <Rule id="4.3">Nie można rozpoznać osoby, która jest zamaskowana i zmienia głos.</Rule>
              <Rule id="4.4">Dozwolone jest latanie helikopterem przez „zwykłych obywateli" w trakcie rozbudowanej akcji RP, z wyjątkiem napadów helikopterem.</Rule>
              <Rule id="4.5">Każde nagranie IC wymaga włączonej kamery GoPro. Po zakończeniu należy odegrać zgranie karty SD na dysk w mieszkaniu. Nagrań nie można wrzucać do chmury ani podłączać kamery pod telefon. Naciąganie tego punktu to <Tag>PG</Tag>.</Rule>
              <Rule id="4.6">Czat głosowy służy wyłącznie do odgrywania sytuacji RP własnym głosem. Puszczanie audiobooków lub nadużywanie bindów i muzyki jest karane banem. Wyjątek: zgoda administracji lub modulator używany wyłącznie do rozmowy telefonicznej.</Rule>
              <Rule id="4.7">Zabrania się akcji RP na tle seksualnym bez zgody drugiej osoby.</Rule>
            </ol>
          </section>

          <section id="5" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Szacunek do zdrowia i życia & Amnezja</h2>
            <ol className="rules-list">
              <Rule id="5.1">W przypadku zauważenia zagrożenia dla swojej postaci należy oddalić się i odgrywać ból oraz strach adekwatnie do sytuacji.</Rule>
              <Rule id="5.2">Po udzieleniu pierwszej pomocy, zwłaszcza po postrzale, należy jak najszybciej udać się do szpitala. Zbyt długa zwłoka może skutkować trwałym uszczerbkiem lub śmiercią postaci, uznanym za <Tag>FailRP</Tag>.</Rule>
              <Rule id="5.3">Przebywając w szpitalu jako poszkodowany, gracz ma obowiązek odegrać pełną akcję RP z medykiem. Unikanie lub AFK bez zgody personelu medycznego podlega banie.</Rule>
              <Rule id="5.4">Po stanie <Tag>BW</Tag> postać zapomina całą akcję, która do niego doprowadziła.</Rule>
              <Rule id="5.6">Wyłącznie szef zarejestrowanej organizacji przestępczej może wymusić amnezję osobie będącej w stanie <Tag>BW</Tag> (force amnesia).</Rule>
            </ol>
          </section>

          <section id="6" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Przestępstwa</h2>
            <ol className="rules-list">
              <Rule id="6.1">Zakazuje się okradania kont bankowych, traktowane jako <Tag>PG</Tag>.</Rule>
              <Rule id="6.2">Zakazuje się wzywania usług z telefonu w celu porwania na zakładnika.</Rule>
              <li id="6.3" className="rules-rule">
                <span className="rules-id">6.3</span>
                <span className="rules-text">
                  Limity uczestników napadów skryptowych:
                  <table className="heist-table">
                    <thead>
                      <tr><th scope="col">Lokacja</th><th scope="col">Napastnicy</th><th scope="col">Policja</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Kasetka', '1–2', '2–6', false],
                        ['Jubiler', '2–4', '3–7', true],
                        ['Bank', '2–5', '4–10', true],
                        ['Jacht', '3–5', '4–10', true],
                        ['Humane Labs', '3–6', '6–10', true],
                      ].map(([place, att, cops, unavailable]) => (
                        <tr key={place} className={unavailable ? 'heist-unavailable' : ''}>
                          <td className="heist-place">{place}</td>
                          <td className="heist-att">{att}</td>
                          <td className="heist-cops">{cops}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </span>
              </li>
              <Rule id="6.4">Zakazuje się rabowania gracza niebiorącego udziału w tej samej akcji RP.</Rule>
              <Rule id="6.5">Jeżeli ktoś celowo ucieka do green zone, by uniknąć akcji RP, dozwolona jest kontynuacja akcji na jej terenie.</Rule>
              <Rule id="6.6">Do każdego napadu potrzebny jest co najmniej jeden prawdziwy zakładnik i negocjacje z obu stron. Otwarcie ognia musi być poprzedzone negocjacjami. Każde zerwanie musi być zakomunikowane głosowo. Złamanie = <Tag>RDM</Tag>.</Rule>
              <Rule id="6.7">Zakazuje się okradania graczy, którzy piorą brudne pieniądze.</Rule>
              <Rule id="6.8">W odbiciu konwoju może brać udział maks. 10 odbijających i 8 policjantów.</Rule>
              <Rule id="6.9">Zakazuje się porywania pracowników firm pełniących swoje obowiązki. Wyjątek: wcześniej zaplanowane porwania z powodów RP.</Rule>
              <Rule id="6.10">Porwanie z miejsca publicznego wymaga dobrego powodu RP i musi być wcześniej zaplanowane.</Rule>
              <Rule id="6.11">Podczas napadu skryptowego można wziąć maks. 6 zakładników. Obowiązuje zasada: 1 żądanie = 1 zakładnik.</Rule>
              <Rule id="6.12">Zakazuje się wtrącania w napady przez osoby trzecie, nie wolno ingerować w starcie napastników z policją.</Rule>
            </ol>
          </section>

          <section id="7" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Pojazdy</h2>
            <ol className="rules-list">
              <Rule id="7.1">Kradzież pojazdu frakcyjnego wymaga bardzo dobrego powodu RP. W innych przypadkach jest zakazana.</Rule>
              <li id="7.2" className="rules-rule">
                <span className="rules-id">7.2</span>
                <span className="rules-text">
                  O możliwości jazdy off-road decyduje przystosowanie pojazdu, nie same opony. Dozwolone klasy:
                  <ul className="rules-sublist">
                    <li>pojazdy typu cross i quad,</li>
                    <li>pojazdy off-road z odpowiednim ogumieniem,</li>
                    <li>SUV z odpowiednim ogumieniem i prześwitem (jazda po górach na własną odpowiedzialność).</li>
                  </ul>
                  Inne klasy na głębokich piaskach lub stromych stokach traktowane są jako <Tag>FD</Tag>.
                </span>
              </li>
              <Rule id="7.3">Całkowity zakaz kradzieży aut z parkingu Car Dealera.</Rule>
              <Rule id="7.4">Całkowity zakaz kradzieży aut z warsztatu LSCM.</Rule>
            </ol>
          </section>

          <section id="8" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Obywatel</h2>
            <ol className="rules-list">
              <Rule id="8.1">Zakazuje się posiadania przedmiotów powiązanych z LSPD/SWAT: radia, munduru, bodycama i GPS.</Rule>
              <Rule id="8.2">Zakazuje się posiadania przedmiotów powiązanych z EMS/LSFD: apteczki, defibrylatora, munduru medycznego i strażackiego.</Rule>
              <Rule id="8.3">Każdy obywatel musi mieć przy sobie dowód osobisty. Brak dowodu nie ma usprawiedliwienia.</Rule>
              <Rule id="8.4">Pracując w legalnej pracy, masz obowiązek poruszać się wyłącznie pojazdem firmowym od przebrania w strój do spieniężenia pracy.</Rule>
              <Rule id="8.5">Pojazdy i majątek osób martwych lub permanentnie zbanowanych przepadają (chyba że istnieją umowy/testamenty). Przedmioty limitowane wracają na licytację.</Rule>
            </ol>
          </section>

          <section id="9" data-chapter className="rules-section scroll-mt-24">
            <h2 className="rules-heading">Policja i Medycy</h2>
            <ol className="rules-list">
              <Rule id="9.1">Medycy mają ograniczone prawo do stosowania <Tag>PG</Tag>.</Rule>
              <Rule id="9.2">Żaden policjant nie może być skorumpowany, nawet poza służbą. Medyk (z wyłączeniem zarządu EMS) może być skorumpowany podczas służby i poza nią wyłącznie za zgodą administracji.</Rule>
              <Rule id="9.3">Policja nie ma prawa zatrzymać obywatela po <Tag>BW</Tag> w szpitalu, jeśli nie dostarczyło go LSPD lub EMS na ich polecenie.</Rule>
              <Rule id="9.4">Aby porwać medyka na służbie musi ich być minimum 6 (5 pozostaje na służbie) lub musi istnieć bardzo poważny powód RP. Porwany medyk/policjant po zniszczeniu GPS wpisuje <code>/duty</code>.</Rule>
              <Rule id="9.5">Aby porwać policjanta na służbie musi ich być minimum 4 (3 pozostają na służbie).</Rule>
            </ol>
          </section>

          <div id="zasada" data-chapter className="rules-callout scroll-mt-24">
            <h2 className="rules-callout-heading">Złota zasada</h2>
            <p>Jeżeli ktoś do Ciebie celuje, masz obowiązek podnieść ręce i wykonywać polecenia w trosce o swoje życie. Gdy ktoś pierwszy wyjmie broń, nie możesz zrobić tego samego, bo jest to traktowane jako nieposzanowanie życia. Gdy ktoś schowa broń, możliwy jest zwrot akcji po Twojej stronie. Jeśli jednak ciągle trzyma broń skierowaną w Twoją stronę, nie masz prawa jej wyciągnąć.</p>
            <p>W każdej sytuacji nieopisanej w regulaminie zastanów się, czy Twoja reakcja byłaby możliwa w realnym świecie.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
