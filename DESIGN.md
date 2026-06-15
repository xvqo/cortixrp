# DESIGN.md — CortixRP ("Abyssal")

Visual system for the redesign. Lane: **premium liquid tech**, nocturnal.

## Color (OKLCH)
Near-black abyssal blue base, electric azure brand, cyan glow accent. Dark theme
is a deliberate scene (night city), not a default.

| Role | OKLCH | ~hex | Use |
|---|---|---|---|
| bg | `oklch(0.15 0.035 256)` | #070b14 | page background |
| bg-deep | `oklch(0.11 0.03 256)` | #04060d | sunken / footer |
| surface | `oklch(0.19 0.038 256)` | #0d1422 | cards, panels |
| surface-2 | `oklch(0.24 0.042 256)` | #141d30 | raised |
| border | `oklch(0.32 0.04 256)` | — | hairlines |
| primary (azure) | `oklch(0.66 0.18 248)` | #2fa8ff | brand, CTAs, links |
| primary-hover | `oklch(0.74 0.16 240)` | #5cc0ff | hover |
| glow (cyan) | `oklch(0.82 0.15 210)` | #36e0ff | shader light, accents |
| ink | `oklch(0.96 0.01 250)` | #e6eefc | headings |
| ink-muted | `oklch(0.72 0.03 250)` | — | body (≥4.5:1 on bg/surface) |
| ink-faint | `oklch(0.55 0.03 252)` | — | meta only |
| online (green) | `oklch(0.78 0.18 150)` | — | status dot |

Color strategy: **committed** — azure/cyan light carries the identity against a
drenched-dark field. Tints lean toward hue 256 (the brand blue), never warm.

## Typography
Two families, contrast by weight + width + a mono accent.
- **Display:** Archivo (variable wdth+wght). Headlines at weight 800–900,
  expanded width (~115–125), letter-spacing -0.02em (floor -0.04). Strong
  grotesk, poster energy. Hero clamp max **6rem** ceiling.
- **Body:** Archivo 400–600, normal width. 65–75ch measure, line-height ~1.7.
- **Mono accent:** JetBrains Mono — stat numbers, HUD labels, counters, code,
  small kicker-as-data bits. Carries the "tech" character.
- No all-caps body. Uppercase only on short mono labels (≤4 words).

## Motion
- **Lenis** global smooth scroll (lerp ~0.1), disabled under reduced-motion.
- **WebGL fluid shader** hero centerpiece: domain-warped fbm color waves, azure↔
  cyan, slow drift, mouse-reactive warp. Fallback: animated CSS gradient mesh.
- Reveals: IntersectionObserver enhancing already-visible content (translateY +
  opacity + slight blur clearing), ease-out-expo, staggered per list. Never gate
  visibility on JS.
- Parallax: subtle layer offset on hero + CTA via scroll progress.
- Easing: `cubic-bezier(0.16,1,0.3,1)` (ease-out-expo). No bounce/elastic.
- Every effect has a `prefers-reduced-motion` static alternative.

## Components / treatments
- Buttons: solid azure primary with cyan glow on hover (single defined shadow,
  no ghost-card pairing); ghost = 1px border, fills on hover.
- Glass used sparingly + on purpose: navbar backdrop, lightbox controls only.
- Cards top out at radius 14–16px. No 1px-border + big-soft-shadow pairing.
- Hairline borders + glow insets instead of heavy boxes.
- HUD details: thin corner ticks / mono coordinates as quiet texture, not on
  every section.

## Layout
- Container 1400px (wide 1800 at >1920px), narrow 720px for prose.
- Generous vertical rhythm; vary section spacing, don't uniformly stack.
- Grid for 2D (gallery bento), flex for 1D.
- z-scale: base → sticky(100) → dropdown(200) → modal(300) → toast(400).

## Bans honored
No gradient text, no eyebrow-on-every-section, no 01/02/03 scaffolding (numbers
only where genuinely sequential: beginner steps), no side-stripe borders, no
ghost-card, no over-rounding, no cream bg.
