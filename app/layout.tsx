import './prism-atom-dark.css'
import './tailwind.css'
import './global.css'

import { ContextMenu } from 'components/context-menu'
import { Sidebar } from 'components/sidebar'
import { Metadata } from 'next'
import { Lora } from 'next/font/google'

import Footer from '../components/footer'

const font = Lora({
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
      <body className="h-screen flex flex-col font-body overflow-x-hidden bg-base-950 text-paper">
        <ContextMenu />
        <main className="max-w-3xl w-full mx-auto px-4 mb-12 md:grid md:gap-12 md:grid-cols-12">
          <div className="mb-12 md:mb-0 md:col-span-3 static md:sticky top-0 md:h-screen">
            <Sidebar />
          </div>
          <div className="col-span-12 md:col-span-9 md:pt-12">
            <>
              {children}
              <Footer />
            </>
          </div>
        </main>
      </body>
    </html>
  )
}
