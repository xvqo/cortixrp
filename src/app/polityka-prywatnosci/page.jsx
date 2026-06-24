const LAST_UPDATED = '4 czerwca 2025'
const DISCORD_URL = 'https://discord.gg/'

export const metadata = {
  title: 'Polityka prywatności · OutsetRP',
  description: 'Polityka prywatności serwisu OutsetRP.',
}

const TOC = [
  { id: 'administrator', n: '01', label: 'Administrator' },
  { id: 'dane', n: '02', label: 'Zbierane dane' },
  { id: 'cloudflare', n: '03', label: 'Cloudflare' },
  { id: 'cookies', n: '04', label: 'Pliki cookie' },
  { id: 'linki', n: '05', label: 'Linki zewnętrzne' },
  { id: 'prawa', n: '06', label: 'Twoje prawa' },
  { id: 'zmiany', n: '07', label: 'Zmiany polityki' },
]

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://outsetrp.pl' },
    { '@type': 'ListItem', position: 2, name: 'Polityka prywatności', item: 'https://outsetrp.pl/polityka-prywatnosci' },
  ],
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <header className="-mt-[72px] pb-16 pt-[10.5rem] [background:radial-gradient(ellipse_55%_70%_at_12%_60%,oklch(from_var(--color-primary)_l_c_h/0.10),transparent_65%),radial-gradient(ellipse_35%_45%_at_85%_25%,oklch(from_var(--color-glow)_l_c_h/0.06),transparent_55%)] max-sm:pb-10 max-sm:pt-[8.5rem]">
        <div className="mx-auto max-w-page px-8 min-[1921px]:max-w-wide max-sm:px-5">
          <span className="kicker">Dokument prawny</span>
          <h1 className="my-5 font-display text-[clamp(2.6rem,2rem+3.5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink [font-stretch:118%]">
            Polityka<br /><em className="not-italic text-primary text-glow-shadow">prywatności</em>
          </h1>
          <p className="font-mono text-sm text-ink-faint">
            Ostatnia aktualizacja: <time dateTime="2025-06-04">{LAST_UPDATED}</time>
            &ensp;·&ensp; OutsetRP
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1000px] grid-cols-[200px_1fr] gap-16 px-8 pb-32 pt-16 max-[900px]:grid-cols-1 max-[900px]:gap-0 max-sm:px-5">
        <nav className="privacy-toc" aria-label="Spis treści">
          {TOC.map(({ id, n, label }) => (
            <a key={id} href={`#${id}`}>
              <span className="text-primary">{n}</span> &nbsp;{label}
            </a>
          ))}
        </nav>

        <article className="flex flex-col">
          <section id="administrator" className="privacy-section">
            <h2><span className="privacy-num">01</span>Administrator danych</h2>
            <p>
              Administratorem danych przetwarzanych w związku z korzystaniem ze strony oraz serwera jest właściciel
              projektu działający pod nazwą <strong>OutsetRP</strong>. W sprawach dotyczących prywatności skontaktuj się
              z nami przez <a href={DISCORD_URL} target="_blank" rel="noreferrer">serwer Discord</a>.
            </p>
          </section>

          <section id="dane" className="privacy-section">
            <h2><span className="privacy-num">02</span>Zbierane dane</h2>
            <p>
              Strona OutsetRP nie prowadzi własnej rejestracji ani formularzy zbierających dane osobowe. Jedyne dane,
              jakie możemy pozyskać w związku z procesem dołączenia do serwera, to{' '}
              <strong>nazwa użytkownika Discord oraz publiczne ID konta Discord</strong>, podane dobrowolnie przez
              gracza podczas aplikacji whitelist.
            </p>
            <p>
              Dane te służą wyłącznie do weryfikacji i prowadzenia listy graczy. Nie są sprzedawane ani udostępniane
              podmiotom trzecim.
            </p>
          </section>

          <section id="cloudflare" className="privacy-section">
            <h2><span className="privacy-num">03</span>Cloudflare</h2>
            <p>
              Strona korzysta z usług <strong>Cloudflare, Inc.</strong> (101 Townsend St, San Francisco, CA 94107, USA)
              w zakresie ochrony DDoS i dystrybucji treści (CDN). Cloudflare przetwarza automatycznie następujące dane
              techniczne:
            </p>
            <ul>
              <li>adres IP osoby odwiedzającej stronę</li>
              <li>nagłówki HTTP (przeglądarka, system operacyjny)</li>
              <li>data i godzina odwiedzin</li>
              <li>adresy URL odwiedzanych podstron</li>
            </ul>
            <p>
              Podstawą przetwarzania jest prawnie uzasadniony interes administratora: bezpieczeństwo i dostępność
              strony. Szczegóły:{' '}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">cloudflare.com/privacypolicy</a>.
            </p>
          </section>

          <section id="cookies" className="privacy-section">
            <h2><span className="privacy-num">04</span>Pliki cookie</h2>
            <p>
              Strona OutsetRP nie ustawia własnych plików cookie. Cloudflare może zapisać techniczne ciasteczka
              niezbędne do ochrony przed botami: <code>__cf_bm</code> oraz <code>cf_clearance</code>. Są to pliki
              niezbędne do działania usługi i nie wymagają Twojej zgody.
            </p>
          </section>

          <section id="linki" className="privacy-section">
            <h2><span className="privacy-num">05</span>Linki zewnętrzne</h2>
            <p>
              Strona zawiera linki do serwisów zewnętrznych: Discord i YouTube. Po kliknięciu zostaniesz przeniesiony do
              serwisu rządzonego własnymi zasadami prywatności, za które nie ponosimy odpowiedzialności.
            </p>
          </section>

          <section id="prawa" className="privacy-section">
            <h2><span className="privacy-num">06</span>Twoje prawa</h2>
            <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
            <ul>
              <li><strong>Dostęp</strong>: możesz zapytać, jakie dane przechowujemy</li>
              <li><strong>Sprostowanie</strong>: możesz żądać poprawienia nieprawidłowych danych</li>
              <li><strong>Usunięcie</strong>: możesz żądać trwałego usunięcia swoich danych</li>
              <li><strong>Ograniczenie</strong>: możesz ograniczyć zakres przetwarzania</li>
              <li><strong>Sprzeciw</strong>: możesz wnieść sprzeciw wobec przetwarzania</li>
            </ul>
            <p>
              Aby skorzystać z powyższych praw, otwórz ticket na{' '}
              <a href={DISCORD_URL} target="_blank" rel="noreferrer">serwerze Discord</a>.
            </p>
          </section>

          <section id="zmiany" className="privacy-section">
            <h2><span className="privacy-num">07</span>Zmiany polityki</h2>
            <p>
              Zastrzegamy sobie prawo do aktualizacji niniejszej polityki. Wszelkie zmiany będą publikowane na tej
              stronie z nową datą aktualizacji. Dalsze korzystanie ze strony po wprowadzeniu zmian oznacza ich
              akceptację.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
