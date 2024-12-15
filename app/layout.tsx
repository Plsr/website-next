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
import { ThemeProvider } from 'components/ThemeProvider'

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
      <body className="dark:bg-base-900 overflow-x-hidden bg-base-100 font-body text-base-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark:bg-base-900 dark:text-base-100 bg-base-100 px-1 py-1 text-base-800 md:px-12 md:py-12">
            <Analytics />
            <main className="dark:bg-base-800 dark:border-base-700 mx-auto max-w-screen-lg rounded-lg border border-base-200 bg-white px-4 py-12 md:px-24">
              <Header />
              <div className="h-16" />
              {children}
              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
