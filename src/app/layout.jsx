import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'https://outsetrp.pl'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OutsetRP — Polski serwer FiveM Roleplay',
    template: '%s',
  },
  description:
    'OutsetRP to polski serwer roleplay na FiveM (GTA V) z systemem whitelist. Casualowy RP w Los Santos: dołącz na Discord, przejdź weryfikację i zacznij grać.',
  keywords: ['FiveM', 'serwer FiveM', 'serwer roleplay', 'FiveM RP', 'polski serwer FiveM', 'GTA RP', 'whitelist', 'OutsetRP', 'Los Santos'],
  applicationName: 'OutsetRP',
  category: 'games',
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  verification: { google: 'X91OcjHGhJup6yjiLG6xmwvXQZvVEELLlPa0zvzl78k' },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'OutsetRP — Polski serwer FiveM Roleplay',
    description:
      'Polski serwer roleplay na FiveM z systemem whitelist. Dołącz na Discord i wskocz do Los Santos.',
    url: SITE_URL,
    siteName: 'OutsetRP',
    locale: 'pl_PL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OutsetRP — Polski serwer FiveM Roleplay',
    description: 'Polski serwer roleplay na FiveM z systemem whitelist.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0E1A',
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
                  '@id': 'https://outsetrp.pl/#org',
                  name: 'OutsetRP',
                  url: 'https://outsetrp.pl',
                  logo: 'https://outsetrp.pl/logo.svg',
                  sameAs: ['https://discord.gg/CZEtYxkTDy'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://outsetrp.pl/#website',
                  name: 'OutsetRP — Serwer FiveM',
                  url: 'https://outsetrp.pl',
                  inLanguage: 'pl-PL',
                  description:
                    'Casualowy serwer roleplay FiveM z systemem whitelist. Dołącz na Discord i wskocz do Los Santos.',
                  publisher: { '@id': 'https://outsetrp.pl/#org' },
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
