import Header from '../components/header'
import { Analytics } from '@vercel/analytics/react'
import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'
import {
  Source_Serif_4,
  PT_Sans,
  Inter,
  Rock_Salt,
  IBM_Plex_Serif,
} from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../components/footer'

const bodyFont = IBM_Plex_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-copy',
  weight: ['300', '400', '700'],
})

const playfair = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-title',
  weight: ['400', '700'],
})

const handwriting = Rock_Salt({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handwriting',
  weight: ['400'],
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
    <html
      lang="en"
      className={`${bodyFont.variable} ${handwriting.variable} ${playfair.variable}`}
    >
      <body className="font-body overflow-x-hidden ">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 bg-no-repeat min-h-full max-w-full overflow-x-hidden">
          <div className="absolute top-24  -left-24 z-0 rounded-full bg-sky-700/10 w-1/3 h-1/3 blur-3xl" />
          <div className="absolute -right-96 bottom-36 z-0 rounded-full bg-indigo-700/5 w-1/2 h-1/2 blur-3xl hidden md:block" />
          <Analytics />
          <div className="flex mx-auto flex-col  max-w-screen-md items-center ">
            <main className="z-10 px-8 md:px-0 w-full text-gray-100 flex-1 font-body mb-4">
              <Header />
              <div className="mt-16">{children}</div>
            </main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
