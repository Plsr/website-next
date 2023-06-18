import Header from '../components/header'
import './tailwind.css'
import './global.css'
import { Nunito } from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../components/footer'
import { ClerkProvider } from '@clerk/nextjs'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Chris Jarling',
  description:
    'Personal website of Chris Jarling, full stack developer from Germany.',
  alternates: {
    types: {
      'application/rss+xml': '/posts-atom.xml',
      'application/json': '/notes-rss.json',
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
    <ClerkProvider>
      <html lang="en" className={`${nunito.variable}`}>
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
    </ClerkProvider>
  )
}
