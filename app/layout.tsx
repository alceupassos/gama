import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GAMA SERVICES | Industrial Excellence & Asset Management',
  description: 'Expert facilities management and critical maintenance systems in São Paulo. Precision engineered for high-performance buildings, industrial complexes, and luxury asset portfolios.',
  keywords: 'facilities management, maintenance systems, ar condicionado industrial, elétrica crítica, hidráulica, retrofit, São Paulo',
  authors: [{ name: 'Gama Services' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Gama Services — Industrial Flagship Excellence',
    description: 'Next-generation facilities management with certified ABNT precision and real-time asset tracking.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://gamaservices.com.br',
    siteName: 'Gama Services',
  },
  twitter: { card: 'summary_large_image', title: 'Gama Services', description: 'Industrial Excellence in São Paulo' },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
}

import { ThemeProvider } from '@/components/ThemeProvider'
import { GridBackground } from '@/components/ui/GridBackground'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakartaSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden selection:bg-amber-500/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GridBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
