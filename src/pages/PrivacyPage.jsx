import styles from './PrivacyPage.module.css'

const LAST_UPDATED = '4 czerwca 2025'
const DISCORD_URL = 'https://discord.gg/'

export default function PrivacyPage() {
	return (
		<div className={styles.page}>
			{/* ── Hero header ── */}
			<header className={styles.hero}>
				<div className={styles.heroInner}>
					<p className={styles.eyebrow}>Dokument prawny</p>
					<h1>
						Polityka
						<br />
						<em>prywatności</em>
					</h1>
					<p className={styles.heroMeta}>
						Ostatnia aktualizacja: <time dateTime="2025-06-04">{LAST_UPDATED}</time>
						&ensp;·&ensp; CortixRP
					</p>
				</div>
			</header>

			{/* ── Body ── */}
			<div className={styles.body}>
				<article className={styles.article}>
					<section id="administrator" className={styles.section}>
						<h2>
							<span className={styles.num}>01</span>
							Administrator danych
						</h2>
						<p>
							Administratorem danych przetwarzanych w związku z korzystaniem ze strony oraz serwera jest właściciel
							projektu działający pod nazwą <strong>CortixRP</strong>. W sprawach dotyczących prywatności skontaktuj się
							z nami przez{' '}
							<a href={DISCORD_URL} target="_blank" rel="noreferrer">
								serwer Discord
							</a>
							.
						</p>
					</section>

					<section id="dane" className={styles.section}>
						<h2 id="dane">
							<span className={styles.num}>02</span>
							Zbierane dane
						</h2>
						<p>
							Strona CortixRP nie prowadzi własnej rejestracji ani formularzy zbierających dane osobowe. Jedyne dane,
							jakie możemy pozyskać w związku z procesem dołączenia do serwera, to{' '}
							<strong>nazwa użytkownika Discord oraz publiczne ID konta Discord</strong>, podane dobrowolnie przez
							gracza podczas aplikacji whitelist.
						</p>
						<p>
							Dane te służą wyłącznie do weryfikacji i prowadzenia listy graczy. Nie są sprzedawane ani udostępniane
							podmiotom trzecim.
						</p>
					</section>

					<section id="cloudflare" className={styles.section}>
						<h2 id="cloudflare">
							<span className={styles.num}>03</span>
							Cloudflare
						</h2>
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
							Podstawą przetwarzania jest prawnie uzasadniony interes administratora — bezpieczeństwo i dostępność
							strony. Szczegóły:{' '}
							<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
								cloudflare.com/privacypolicy
							</a>
							.
						</p>
					</section>

					<section id="cookies" className={styles.section}>
						<h2 id="cookies">
							<span className={styles.num}>04</span>
							Pliki cookie
						</h2>
						<p>
							Strona CortixRP nie ustawia własnych plików cookie. Cloudflare może zapisać techniczne ciasteczka
							niezbędne do ochrony przed botami: <code>__cf_bm</code> oraz <code>cf_clearance</code>. Są to pliki
							niezbędne do działania usługi i nie wymagają Twojej zgody.
						</p>
					</section>

					<section id="linki" className={styles.section}>
						<h2 id="linki">
							<span className={styles.num}>05</span>
							Linki zewnętrzne
						</h2>
						<p>
							Strona zawiera linki do serwisów zewnętrznych: Discord i YouTube. Po kliknięciu zostaniesz przeniesiony do
							serwisu rządzonego własnymi zasadami prywatności, za które nie ponosimy odpowiedzialności.
						</p>
					</section>

					<section id="prawa" className={styles.section}>
						<h2 id="prawa">
							<span className={styles.num}>06</span>
							Twoje prawa
						</h2>
						<p>Na podstawie RODO przysługują Ci następujące prawa:</p>
						<ul>
							<li>
								<strong>Dostęp</strong> — możesz zapytać, jakie dane przechowujemy
							</li>
							<li>
								<strong>Sprostowanie</strong> — możesz żądać poprawienia nieprawidłowych danych
							</li>
							<li>
								<strong>Usunięcie</strong> — możesz żądać trwałego usunięcia swoich danych
							</li>
							<li>
								<strong>Ograniczenie</strong> — możesz ograniczyć zakres przetwarzania
							</li>
							<li>
								<strong>Sprzeciw</strong> — możesz wnieść sprzeciw wobec przetwarzania
							</li>
						</ul>
						<p>
							Aby skorzystać z powyższych praw, otwórz ticket na{' '}
							<a href={DISCORD_URL} target="_blank" rel="noreferrer">
								serwerze Discord
							</a>
							.
						</p>
					</section>

					<section id="zmiany" className={styles.section}>
						<h2 id="zmiany">
							<span className={styles.num}>07</span>
							Zmiany polityki
						</h2>
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
