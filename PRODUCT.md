# PRODUCT.md — CortixRP

## Register
**Brand** — design IS the product. This is a marketing/landing site for a FiveM
roleplay server. A visitor's first impression (and the urge to join the Discord)
is the whole job.

## What it is
CortixRP is a casual roleplay FiveM server (GTA V multiplayer) with a whitelist.
The site sells the vibe of night-time Los Santos and funnels players to Discord →
whitelist → in-game. Pages: home, regulamin (rules), dla początkujących
(beginner guide), polityka prywatności, ekipa, sklep.

## Target users
Polish-speaking GTA RP players, mostly 16–25. They live in Discord, judge servers
in seconds by how the site/branding *feels*, and bounce from anything generic.
The site is in Polish.

## Purpose / primary action
Single conversion: **join the Discord**. Secondary: read the rules, understand
the whitelist process. Everything serves "this server looks serious and alive,
I want in".

## Brand personality
Cinematic, nocturnal, premium-tech. Confident without being loud-cheesy. Think a
high-end product launch that happens to be about a night city: deep dark blue,
electric azure light, fluid motion, restraint broken by one big "wow" moment.

Three voice words: **nocturnal, fluid, precise.**

## Anti-references (what to avoid)
- Generic FiveM/gaming template look: red/purple gamer gradients, Bebas Neue,
  glassy cards everywhere, Discord-blurple as the brand color.
- The 2026 AI-landing tells: cream/warm bg, tiny tracked uppercase eyebrows on
  every section, numbered 01/02/03 scaffolding, identical icon-card grids,
  gradient text, ghost-card (1px border + big soft shadow).
- Editorial-serif-magazine lane (Fraunces/Playfair italic + ruled columns). Not
  this brand.

## Strategic design principles
1. **One centerpiece, not ten.** The WebGL fluid hero is the wow. Other sections
   support it with quiet, purposeful motion, not competing spectacle.
2. **Dark as a physical scene, not a default.** Near-black abyssal blue = night
   Los Santos under neon. Light is the brand: azure/cyan glow carries warmth and
   energy, never a warm-neutral bg.
3. **Motion is material.** Lenis smooth scroll, fluid shader, parallax and
   intentional reveals are part of the build, not decoration. Everything degrades
   to a beautiful static state under `prefers-reduced-motion` / no-WebGL.
4. **Premium = space + precision.** Generous whitespace, tight-but-not-cramped
   display type (grotesk, weight/width contrast), mono for HUD/stat details.
5. **Performance is the brand too.** 60fps target, GPU work paused off-screen and
   lazy-initialized; the site must feel as fast as it looks expensive.

## Tech
Next.js 15 (App Router), React 18, Tailwind v4 (CSS-first @theme), Lenis,
raw WebGL2 fluid shader. Deployed on Vercel. Polish UI copy.
