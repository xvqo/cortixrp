import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://cortixrp.pl'),
  title: 'CortixRP — Serwer FiveM',
  description:
    'CortixRP to casualowy serwer roleplay FiveM z systemem whitelist. Dołącz na Discord, przejdź weryfikację i wskocz do Los Santos.',
  icons: { icon: '/favicon.svg' },
  verification: { google: 'X91OcjHGhJup6yjiLG6xmwvXQZvVEELLlPa0zvzl78k' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'CortixRP — Serwer FiveM',
    description:
      'Casualowy serwer roleplay FiveM z systemem whitelist. Dołącz na Discord i wskocz do Los Santos.',
    url: 'https://cortixrp.pl',
    siteName: 'CortixRP',
    locale: 'pl_PL',
    images: [{ url: '/hero-bg.png', width: 1906, height: 873, alt: 'CortixRP — nocne Los Santos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CortixRP — Serwer FiveM',
    description: 'Casualowy serwer roleplay FiveM z systemem whitelist.',
    images: ['/hero-bg.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,400..900&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
        <link rel="preload" as="image" href="/hero-bg.png" fetchPriority="high" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://cortixrp.pl/#org',
                  name: 'CortixRP',
                  url: 'https://cortixrp.pl',
                  logo: 'https://cortixrp.pl/favicon.svg',
                  sameAs: ['https://discord.gg/CZEtYxkTDy'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://cortixrp.pl/#website',
                  name: 'CortixRP — Serwer FiveM',
                  url: 'https://cortixrp.pl',
                  inLanguage: 'pl-PL',
                  description:
                    'Casualowy serwer roleplay FiveM z systemem whitelist. Dołącz na Discord i wskocz do Los Santos.',
                  publisher: { '@id': 'https://cortixrp.pl/#org' },
                },
              ],
            }),
          }}
        />
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
