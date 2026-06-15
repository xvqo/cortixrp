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
  openGraph: {
    type: 'website',
    title: 'CortixRP — Serwer FiveM',
    description:
      'Casualowy serwer roleplay FiveM z systemem whitelist. Dołącz na Discord i wskocz do Los Santos.',
    url: 'https://cortixrp.pl',
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
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
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
