import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'
import { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import Footer from '../components/footer'

const font = Rubik({
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
    <html lang="en" className={font.variable}>
      <body className="h-screen flex flex-col font-body bg-base-50 dark:bg-base-900 overflow-x-hidden text-base-100 dark">
        <Analytics />
        <Header />
        <main className="max-w-3xl w-full mx-auto px-4 mb-12 mt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
