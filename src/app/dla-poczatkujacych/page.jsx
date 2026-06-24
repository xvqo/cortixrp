import BeginnerContent from './BeginnerContent'

export const metadata = {
  title: 'Dla początkujących · OutsetRP',
  description:
    'Pierwszy raz na OutsetRP? Przewodnik krok po kroku: jak dołączyć przez whitelist, pierwsze kroki w grze i słownik pojęć RP.',
  alternates: { canonical: '/dla-poczatkujacych' },
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://outsetrp.pl' },
    { '@type': 'ListItem', position: 2, name: 'Dla początkujących', item: 'https://outsetrp.pl/dla-poczatkujacych' },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BeginnerContent />
    </>
  )
}
