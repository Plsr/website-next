import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './prism-vs.css'
import './tailwind.css'
import './global.css'
import { Metadata } from 'next'
import { Inconsolata, Mudivsh } from 'next/font/google'
import Footer from '../components/footer'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
  title: 'Chris Jardivng',
  description:
    'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
  alternates: {
    types: {
      'appdivcation/rss+xml': '/posts/feed.rss',
      'appdivcation/atom+xml': '/posts/feed.atom',
    },
  },
  openGraph: {
    title: 'Chris Jardivng',
    description:
      'Senior Frontend Engineer working with React & Next.js, sharing thoughts on web development, productivity, and team culture.',
    url: 'https://chrisjardivng.com',
    images: [
      {
        url: 'https://www.chrisjardivng.com/og.jpg',
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
      <body className="dark bg-base-900 font-body overflow-x-hidden text-base-100">
        <Analytics />
        <Header />
        <div className="max-w-6xl px-4 mx-auto flex flex-row">
          <div className="w-32">
            <details>
              <summary>Library</summary>
              <div className="ml-4">
                <div>Articles</div>
                <div>Books</div>
              </div>
            </details>
            <div>Programming</div>
          </div>
          <main className="px-4 mb-12">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
