import Hero from '@/components/sections/Hero'
// import ServerStats from '@/components/sections/ServerStats' // hidden until real server stats are available
import GallerySection from '@/components/sections/GallerySection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import { FAQS } from '@/data/faqs'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      {/* <ServerStats /> */}
      <GallerySection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
