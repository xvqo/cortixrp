import Hero from '@/components/sections/Hero'
// import ServerStats from '@/components/sections/ServerStats' // hidden until real server stats are available
import GallerySection from '@/components/sections/GallerySection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* <ServerStats /> */}
      <GallerySection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
