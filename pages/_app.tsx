import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ClerkProvider } from '@clerk/nextjs'
import '../styles/prism-atom-dark.css'
import { usePageLoading } from '../lib/hooks/usePageLoading'
import { Loading } from '../components/loading'

export default function App({ Component, pageProps }: AppProps) {
  const { isPageLoading } = usePageLoading()

  return (
    <ClerkProvider>
      <Layout>
        {isPageLoading ? (
          <>
            <div className="flex h-full items-center justify-center">
              <Loading />
            </div>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </ClerkProvider>
  )
}
