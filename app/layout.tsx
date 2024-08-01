import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './prism-vs.css'
import './tailwind.css'
import './global.css'
import { Metadata } from 'next'
import { Inconsolata, Mulish } from 'next/font/google'
import Footer from '../components/footer'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'Chris Jarling',
  description:
    'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
  alternates: {
    types: {
      'application/rss+xml': '/posts/feed.rss',
      'application/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jarling',
    description:
      'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
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
    <html lang="en" className={GeistSans.variable}>
      <body className="font-body bg-base-50 overflow-x-hidden text-base-100">
        <Analytics />
        <Header />
        <main className="max-w-xl mx-auto px-4 mb-12 mt-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
