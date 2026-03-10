import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { AntiPiracy } from '@/components/anti-piracy'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://merryrains.com'),
  title: 'Merry Rains',
  description: 'Descubra MERRY RAINS, uma aventura epica de fantasia e ficcao cientifica que vai transportar voce para mundos alem da imaginacao.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0a1628',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_inter.variable} ${_playfair.variable} font-sans antialiased`}>
        <Providers>
          <AntiPiracy />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
