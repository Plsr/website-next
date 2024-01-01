import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './vscode-dark-plus.css'
import './tailwind.css'
import './global.css'
import {
  Nunito,
  Literata,
  Space_Grotesk,
  Inter,
  Open_Sans,
  Merriweather,
  Source_Serif_4,
  Lato,
} from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../components/footer'

const bodyFont = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
  weight: ['300', '400', '700'],
})

const playfair = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-title',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Chris Jarling',
  description:
    'Personal website of Chris Jarling, full stack developer from Germany.',
  alternates: {
    types: {
      'application/rss+xml': '/posts/feed.rss',
      'application/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jarling',
    description:
      'Personal website of Chris Jarling, full stack developer from Germany.',
    url: 'https://chrisjarling.com',
    images: [
      {
        url: 'https://www.chrisjarling.com/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${playfair.variable}`}>
      <body className="font-body bg-stone-900">
        <Analytics />
        <div className="flex flex-col min-h-full">
          <main className="px-8 md:px-0 max-w-screen-sm mx-auto text-gray-100 font-body mb-4">
            <Header />
            <div className="mt-16">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
