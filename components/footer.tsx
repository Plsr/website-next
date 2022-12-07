import { FooterRow } from './footer-row'

const copyrightString = `© ${new Date().getFullYear()} Chris Jarling`

export default function Footer() {
  return (
    <>
      <div className="px-4 md:px-0 bg-slate-800 py-12 border-t-slate-700 border-t">
        <div className="max-w-screen-md mx-auto text-slate-300">
          <div className="flex flex-col md:flex-row justify-between">
            <FooterRow
              title="About"
              listItems={[
                <FooterRow.Item key="me" href="/about" text="Me" />,
                <FooterRow.Item key="site" href="/colophon" text="This site" />,
                <FooterRow.Item key="now" href="/now" text="Now" />,
                <FooterRow.Item key="uses" href="/uses" text="Uses" />,
                <FooterRow.Item key="cv" href="/cv" text="CV" />,
              ]}
            />
            <FooterRow
              title="Content"
              listItems={[
                <FooterRow.Item key="blog" href="/posts" text="Blog" />,
                <FooterRow.Item key="notes" href="/notes" text="Notes" />,
                <FooterRow.Item
                  key="bookmarks"
                  href="/bookmarks"
                  text="Bookmarks"
                />,
                <FooterRow.Item key="books" href="/books" text="Books" />,
                <FooterRow.Item key="til" href="/til" text="TIL" />,
              ]}
            />
            <FooterRow
              title="Legal"
              listItems={[
                <FooterRow.Item key="imprint" href="/imprint" text="Imprint" />,
                <FooterRow.Item
                  key="privacy"
                  href="/privacy"
                  text="Privacy Policy"
                />,
              ]}
            />
          </div>
          <div className="mt-12 flex justify-center">
            <small className="text-slate-500">{copyrightString}</small>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-400 to-fuchsia-400 h-1" />
    </>
  )
}
