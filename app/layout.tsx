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
      <body className="overflow-x-hidden font-body text-base-800 dark:bg-base-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative bg-gray-50 bg-[linear-gradient(to_right,#eee_1px,transparent_1px),linear-gradient(to_bottom,#eee_1px,transparent_1px)] bg-[length:30px_30px] px-1 py-1 text-base-800 dark:bg-base-900 dark:bg-[linear-gradient(to_right,#1c1c20_1px,transparent_1px),linear-gradient(to_bottom,#1c1c20_1px,transparent_1px)] dark:text-base-100 md:px-12 md:py-12">
            <div className="relative mx-auto max-w-screen-lg">
              <div className="absolute -left-60 top-40 z-0 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10" />
              <div className="absolute -right-40 top-10 z-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-500/10" />
              <div className="absolute -right-20 -top-10 z-0 h-32 w-96 rounded-full bg-orange-200/30 blur-3xl dark:bg-orange-500/10" />
            </div>
            <Analytics />
            <main className="relative z-10 mx-auto max-w-screen-lg rounded-lg border border-base-200 bg-white px-4 py-12 shadow-xl dark:border-base-800 dark:bg-base-900 md:px-24">
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
