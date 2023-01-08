import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { ReactNode } from 'react'

export default function Layout({ children }: props) {
  return (
    <div className="flex flex-col min-h-full">
      <Head>
        <title>Chris Jarling</title>
        <meta
          name="description"
          content="Personal website of Chris Jarling, full stack developer from Germany."
        />
      </Head>
      <main className="px-8 md:px-0  max-w-screen-md mx-auto text-slate-900 font-body mb-24 w-full">
        <Header />
        <div className="mt-12 md:mt-24">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

type props = {
  children: ReactNode
}
