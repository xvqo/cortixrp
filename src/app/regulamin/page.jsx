import RulesContent from './RulesContent'

export const metadata = {
  title: 'Regulamin — OutsetRP',
  description:
    'Regulamin serwera OutsetRP: zasady gry, rozgrywka, przestępstwa, pojazdy i złota zasada. Zapoznaj się przed dołączeniem na whitelist.',
  alternates: { canonical: '/regulamin' },
}

export default function Page() {
  return <RulesContent />
}
