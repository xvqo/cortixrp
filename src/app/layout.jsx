import { Archivo, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
})
const jbmono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-jbmono',
})

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
    <html lang="pl" suppressHydrationWarning className={`${archivo.variable} ${jbmono.variable}`}>
      <head>
        <link rel="preload" as="image" href="/characters.webp" fetchPriority="high" />
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
