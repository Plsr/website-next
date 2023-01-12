import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Hind:wght@400;600&family=Josefin+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/posts-atom.xml"
          title="Posts (RSS Feed)"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/posts-rss.json"
          title="Posts (JSON Feed)"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/notes-atom.xml"
          title="Notes (RSS Feed)"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/notes-rss.json"
          title="Notes (JSON Feed)"
        />
        <meta
          property="og:image"
          content="https://website-next-alpha.vercel.app/og.jpg"
        />
      </Head>
      <body className="font-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
