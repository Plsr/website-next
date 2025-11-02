import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'

import { Analytics } from '@vercel/analytics/react'
import { ContextMenu } from 'components/context-menu'
import { Metadata } from 'next'
import { Instrument_Serif, Schibsted_Grotesk } from 'next/font/google'

import Footer from '../components/footer'
import Header from '../components/header'

const font = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-headline',
})

const font2 = Schibsted_Grotesk({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-main',
})

export const metadata: Metadata = {
  title: 'Chris Jarling',
  description:
    'Engineering Manager working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
  alternates: {
    types: {
      'application/rss+xml': '/posts/feed.rss',
      'application/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jarling',
    description:
      'Engineering Manager working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
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
    <html lang="en" className={`${font.variable} ${font2.variable}`}>
      <body className="h-screen flex flex-col font-body  overflow-x-hidden bg-base-950 text-base-100">
        <Analytics />
        <Header />
        <ContextMenu />
        <main className="max-w-xl w-full mx-auto px-4 mb-12 mt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
