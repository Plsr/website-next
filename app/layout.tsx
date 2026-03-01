import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'

import { Analytics } from 'components/analytics'
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
      <body className="min-h-screen overflow-x-hidden bg-base-950 font-body text-base-100">
        <Analytics />
        <ContextMenu />
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 md:flex-row md:gap-14 md:px-6">
          <Header />
          <div className="flex min-h-screen w-full flex-col md:max-w-xl">
            <main className="mb-12 mt-8 w-full">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
