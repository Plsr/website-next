import Header from '../components/header'
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
  Lato,
} from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../components/footer'

const bodyFont = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
  weight: ['300', '400', '700'],
})

const playfair = Merriweather({
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
      <body className="font-body bg-neutral-950">
        <div className="flex flex-col min-h-full">
          <Header />
          <main className="px-8 md:px-4 max-w-screen-md mx-auto text-gray-100 font-body mb-24 w-full">
            <div className="mt-24 md:mt-48">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
