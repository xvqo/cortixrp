# Design

## Theme

Dark — głęboka granatowa noc jako tło. Spokojne i dojrzałe; niebieski akcentowy sygnalizuje aktywność bez krzyku. Strategia koloru: **Committed** — ciemny granat niesie całą powierzchnię, niebieski jest jedynym nasyconym głosem.

Reference: Linear-dark meets casual community — structured calm, not corp-SaaS.

## Color Palette

All values in OKLCH.

```css
:root {
  /* Backgrounds */
  --color-bg:        oklch(0.16 0.025 252);  /* #0F172A — main bg */
  --color-surface:   oklch(0.20 0.025 252);  /* #1E293B — card/section bg */
  --color-surface-2: oklch(0.24 0.025 252); /* #263348 — elevated surface */
  --color-border:    oklch(0.30 0.025 252);  /* #2D3F56 — borders */

  /* Brand */
  --color-primary:   oklch(0.58 0.19 264);   /* #3B82F6 — CTA, links, focus */
  --color-primary-hover: oklch(0.68 0.17 264); /* #60A5FA — hover state */
  --color-primary-subtle: oklch(0.20 0.06 264); /* tinted bg for badges */

  /* Ink */
  --color-ink:       oklch(0.93 0.015 252);  /* #E2EBF7 — body text */
  --color-ink-muted: oklch(0.65 0.025 252);  /* #94A3B8 — secondary text */
  --color-ink-faint: oklch(0.45 0.02 252);   /* #4B5E73 — disabled, captions */
}
```

## Typography

**Display / Headings:** Neuton — klasyczny serif, wagi 400/700/800, daje powagę i charakter bez bycia dziecięcym. Kontrast z sans-serifem nadaje stronie wyraźną hierarchię.

**Body:** Manrope — geometryczny humanist sans, czysty i czytelny, doskonały kontrast z serifem Neuton. Nie jest na reject-liście; odróżnia się od generycznego Inter/DM Sans.

```css
@import url('https://fonts.googleapis.com/css2?family=Neuton:wght@400;700;800&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --font-display: 'Neuton', Georgia, serif;
  --font-body:    'Manrope', system-ui, sans-serif;

  /* Scale — modular 1.333 (perfect fourth) */
  --text-xs:   clamp(0.75rem,  0.7rem + 0.25vw,  0.8rem);
  --text-sm:   clamp(0.875rem, 0.85rem + 0.3vw,  0.95rem);
  --text-base: clamp(1rem,     0.95rem + 0.35vw, 1.05rem);
  --text-lg:   clamp(1.125rem, 1.05rem + 0.5vw,  1.25rem);
  --text-xl:   clamp(1.333rem, 1.2rem + 0.8vw,   1.6rem);
  --text-2xl:  clamp(1.777rem, 1.5rem + 1.4vw,   2.2rem);
  --text-3xl:  clamp(2.369rem, 1.8rem + 2.5vw,   3rem);
  --text-4xl:  clamp(3rem,     2.2rem + 3.5vw,   4.5rem);
  --text-hero: clamp(3.5rem,   2.5rem + 5vw,     6rem);

  --leading-body:    1.7;
  --leading-heading: 1.1;
  --tracking-tight:  -0.025em;
  --tracking-normal: 0em;
}
```

## Spacing & Layout

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --radius-sm: 6px;
  --radius:    10px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  --container: 1120px;
  --container-narrow: 720px;
}
```

## Components

### Button — Primary

```css
.btn-primary {
  background: var(--color-primary);
  color: oklch(1 0 0);
  border-radius: var(--radius);
  padding: 0.75rem 1.75rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-base);
  border: none;
  cursor: pointer;
  transition: background 0.18s ease-out, transform 0.12s ease-out;
}
.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}
```

### Card

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
}
```

## Motion

Strategia: wejście strony — jeden płynny fade-in głównego contentu (opacity + translateY, 0.5s ease-out). Sekcje poniżej fold: fade-in on scroll przez IntersectionObserver, bez staggering-per-element. Żadnych bounce, elastic ani ciągłych animacji.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
