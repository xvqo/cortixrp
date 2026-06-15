import RulesContent from './RulesContent'

export const metadata = {
  title: 'Regulamin — CortixRP',
  description:
    'Regulamin serwera CortixRP: zasady gry, rozgrywka, przestępstwa, pojazdy i złota zasada. Zapoznaj się przed dołączeniem na whitelist.',
  alternates: { canonical: '/regulamin' },
}

export default function Page() {
  return <RulesContent />
}
