import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
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
      <body className="font-body bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
