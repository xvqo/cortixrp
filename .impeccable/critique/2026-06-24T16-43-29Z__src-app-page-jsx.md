---
target: strona główna (page.jsx)
total_score: 34
p0_count: 0
p1_count: 2
timestamp: 2026-06-24T16-43-29Z
slug: src-app-page-jsx
---
# Critique — Strona główna OutsetRP (`src/app/page.jsx`)

Register: brand (landing serwera FiveM). Assessment independence: degraded (sub-agents not used). Browser: niedostępny w sesji — ocena z kodu + uruchomionego dev/prod buildu.

## Anti-Patterns Verdict — czy wygląda jak AI?
**Nie w sposób oczywisty.** WebGL fluid shader płynący między kolorami marki (#133A94 → #2563EB → #919BFF), parallax postaci, bento-galeria, edytorskie sekcje, mono-HUD i nawigacja samym logo dają realną tożsamość. Brak banów: zero gradient-text, eyebrow przerzedzone do 1/sekcję-hero, brak identycznych kart, brak ghost-card w spoczynku, radiusy ≤16px.
**Drugorzędny tell (łagodny):** „serwer FiveM, który NIE jest czerwono-fioletowo-gamingowy → granatowo-niebieski premium-tech" to przewidywalna kontr-reakcja (lane fintech-navy). Ratuje to shader + postacie + kontekst nocnego miasta, ale zakres akcentu jest wąski (sam niebieski). Periwinkle trochę pomaga.

## Heuristic Scores (Nielsen, 0–4)
| # | Heurystyka | Wynik |
|---|---|---|
| 1 | Widoczność statusu | 3 — live licznik graczy, hover/scroll OK; ale „Serwer online" + zielona kropka są zahardkodowane, nie spięte z realnym statusem |
| 2 | Dopasowanie do świata | 4 — polski, terminologia RP, czytelne |
| 3 | Kontrola użytkownika | 4 — lightbox zamykalny, smooth-scroll, reduced-motion |
| 4 | Spójność i standardy | 4 — tokeny, spójne komponenty |
| 5 | Zapobieganie błędom | 3 — głównie n/d; API graceful |
| 6 | Rozpoznawanie > pamięć | 4 — jasna nawigacja i etykiety |
| 7 | Elastyczność/efektywność | 3 |
| 8 | Estetyka i minimalizm | 4 — mocna, czysta |
| 9 | Pomoc przy błędach | 2 — `/not-found` to domyślna, bezmarkowa strona Next |
| 10 | Pomoc i dokumentacja | 3 — regulamin + poradnik + FAQ; słabo wyeksponowane z home |
| **Total** | | **34/40** |

## Cognitive load
Niski (dobrze). Nawigacja: 2 linki + Discord. Jedno główne CTA. Brak punktów decyzyjnych >4 opcji.

## Strengths (utrzymać)
1. **Hero shader** płynący przez kolory marki + parallax postaci = zapadający w pamięć, nieszablonowy first impression.
2. **Spójny system**: tokeny OKLCH, premium-tech nocturnal, typografia Archivo + JetBrains Mono, logo-only nav.
3. **Fundamenty**: focus-visible, reduced-motion, SEO/OG/JSON-LD/sitemap, live dane, szybkość, brak poziomego scrolla.

## Priority Issues
**[P1] Strona główna jest cienka na perswazję / IA po ukryciu statystyk.** Flow to teraz Hero → Galeria → FAQ → CTA. Odwiedzający dostaje klimat + screeny + FAQ, ale NIE ma na landingu zwięzłego „dlaczego my" ani „jak dołączyć w 3 krokach". Proces whitelist (kluczowy dla konwersji) żyje tylko na podstronie. Dodać kompaktową sekcję na home (3 kroki dołączenia lub 3–4 filary serwera), najlepiej z kondensacji kroków z poradnika. → `craft`/`shape` lub `layout`.

**[P1] Status serwera kłamie, gdy serwer offline.** Hero pokazuje „Serwer online" + zieloną pulsującą kropkę zawsze, niezależnie od `online` z `/api/players`. Jeśli serwer padnie, strona twierdzi że działa. Spiąć kropkę/etykietę z realnym `online` (zielony „online" / wygaszony „offline/sprawdzanie"). → `harden`.

**[P2] Brandowana strona 404.** `not-found` to domyślny, bezstylowy ekran Next — wypada z klimatu. Dodać `src/app/not-found.jsx` w stylu marki z linkiem na główną/Discord. → `harden`/`onboard`.

**[P2] Paleta jest „bezpieczna".** Navy + royal blue to wąski, lekko korporacyjny zakres. Czyta się gamingowo dzięki shaderowi, ale można dodać iskry (periwinkle już jest; ewentualnie drugi, kontrastowy akcent tylko na hero/CTA). To brand usera — opcjonalne. → `colorize`/`bolder`.

**[P3] Hover galerii = 1px border + duży cień.** Tylko stan hover (feedback), więc łagodne, ale to wzorzec ghost-card. → `polish`.

## Persona red flags
- **Nowy gracz FiveM** (ląduje na home): dostaje klimat i screeny, ale żeby zrozumieć JAK wejść (whitelist) musi kliknąć w podstronę. Brak inline 3-kroków na landingu → ryzyko odbicia bez zrozumienia procesu.
- **Sceptyk („czy serwer żyje?")**: jedyny sygnał aktywności to licznik w hero — a ten znika, gdy API zwróci null. Brak „od kiedy działamy / ilu nas / aktywna społeczność" jako dowodu.

## Minor Observations
- Zielona kropka statusu nie ma `aria-label`/tekstu alternatywnego dla samego stanu (kolor jako jedyny nośnik). Drobne a11y.
- Z ukrytą sekcją statystyk `useServerStats`/`ServerStats`/`useCountUp` są martwym kodem (świadomie zostawione) — OK na teraz.
- Home ma 4 sekcje — krótko jak na landing; sekcja perswazyjna (P1) jednocześnie domknęłaby długość.

## Questions to Consider
- Jak wyglądałby landing, na którym w 5 sekund rozumiem „co to za serwer i jak wejść", bez klikania w podstronę?
- Czy „Serwer online" powinno być żywym wskaźnikiem (zielony/szary), skoro i tak pobieramy dane?
- Czego brakuje sceptykowi, żeby uwierzył, że serwer jest aktywny?
