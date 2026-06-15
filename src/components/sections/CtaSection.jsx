const DISCORD_URL = 'https://discord.gg/CZEtYxkTDy'

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-bg px-8 py-32 max-lg:py-24 max-md:px-6 max-[480px]:px-5 max-[480px]:py-16" aria-label="Dołącz do serwera">
      <div className="cta-aurora" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="cta-beam" aria-hidden="true" />
      <div className="scrim-cta" aria-hidden="true" />
      <div className="relative z-[3] mx-auto flex max-w-narrow flex-col items-center gap-6 text-center min-[1921px]:max-w-[860px]">
        <span className="kicker">Whitelist otwarta</span>
        <h2 className="font-display text-3xl font-extrabold leading-none tracking-[-0.025em] text-ink [font-stretch:115%]">
          Gotowy na <em className="not-italic text-primary text-glow-shadow">Los Santos</em>?
        </h2>
        <p className="max-w-[46ch] text-lg leading-[1.7] text-ink-muted max-md:text-base">
          Wejdź na Discord, przejdź krótką weryfikację i wskocz do miasta jeszcze dziś.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 max-[480px]:w-full max-[480px]:flex-col">
          <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn-primary max-[480px]:w-full">
            Dołącz na Discord
          </a>
        </div>
      </div>
    </section>
  )
}
