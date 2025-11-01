import Head from 'next/head'
import { ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

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
      <Header />
      <main className="px-8 md:px-4 max-w-xl mx-auto text-slate-200 font-body mb-24 w-full">
        <div className="mt-24 md:mt-48">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

type props = {
  children: ReactNode
}
