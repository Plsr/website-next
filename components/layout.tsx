import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { ReactNode } from 'react'

export default function Layout({ children }: props) {
  return (
    <>
      <Head>
        <title>Chris Jarling</title>
        <meta
          name="description"
          content="Personal website of Chris Jarling, full stack developer from Germany."
        />
      </Head>
      <Header />
      <main className="px-4 md:px-0 mt-24 md:mt-48 max-w-screen-md mx-auto text-white font-body mb-24">
        {children}
      </main>
      <Footer />
    </>
  )
}

type props = {
  children: ReactNode
}
