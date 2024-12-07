import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'
import { Metadata } from 'next'
import {
  Cabin,
  DM_Sans,
  Inter,
  Lexend,
  Libre_Franklin,
  Nunito_Sans,
  Open_Sans,
  Outfit,
  Poppins,
  PT_Sans,
  Rubik,
  Urbanist,
} from 'next/font/google'
import Footer from '../components/footer'

const font = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-main',
})

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
    <html lang="en" className={font.variable}>
      <body className="font-body bg-gray-100 overflow-x-hidden text-gray-800">
        <div className="bg-gray-100 text-base-800 px-12">
          <Analytics />
          <main className="max-w-screen-lg py-12 mx-auto px-24 mb-12 mt-12  bg-white border border-gray-200 rounded-lg">
            <Header />
            <div className="h-16" />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  )
}
