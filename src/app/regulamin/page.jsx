import RulesContent from './RulesContent'

export const metadata = {
  title: 'Regulamin · OutsetRP',
  description:
    'Regulamin serwera OutsetRP: zasady gry, rozgrywka, przestępstwa, pojazdy i złota zasada. Zapoznaj się przed dołączeniem na whitelist.',
  alternates: { canonical: '/regulamin' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://outsetrp.pl' },
    { '@type': 'ListItem', position: 2, name: 'Regulamin', item: 'https://outsetrp.pl/regulamin' },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <RulesContent />
    </>
  )
}
