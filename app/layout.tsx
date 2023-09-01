import Header from '../components/header'
import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'
import { Nunito, Literata, Playfair, Fira_Sans, Rufina } from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../components/footer'

const bodyFont = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
  weight: ['400', '700'],
})

const playfair = Fira_Sans({
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
      <body className="font-body bg-zinc-900">
        <div className="flex flex-col min-h-full">
          <Header />
          <main className="px-8 md:px-4  max-w-screen-md mx-auto text-slate-200 font-body mb-24 w-full">
            <div className="mt-24 md:mt-48">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
