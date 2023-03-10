import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ClerkProvider } from '@clerk/nextjs'
import '../styles/prism-atom-dark.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey="pk_test_ZW5hYmxlZC1sYW1wcmV5LTg5LmNsZXJrLmFjY291bnRzLmRldiQ">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}
