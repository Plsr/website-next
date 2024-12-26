import { FooterRow } from './footer-row'

const copyrightString = `© ${new Date().getFullYear()} Chris Jarling`

export default function Footer() {
  return (
    <div className="mt-auto">
      <div className="px-8 dark:bg-base-900 bg-base-200 py-12">
        <div className="max-w-screen-md mx-auto text-gray-100">
          <div className="flex flex-col md:flex-row justify-between">
            <FooterRow
              title="Pages"
              listItems={[
                <FooterRow.Item key="me" href="/about" text="About" />,
                <FooterRow.Item
                  key="site"
                  href="/colophon"
                  text="This site"
                  hidden
                />,
                <FooterRow.Item key="now" href="/now" text="Now" />,
                <FooterRow.Item key="uses" href="/uses" text="Uses" hidden />,
                <FooterRow.Item key="cv" href="/cv" text="CV" hidden />,
              ]}
            />
            <FooterRow
              title="Collections"
              listItems={[
                <FooterRow.Item key="blog" href="/posts" text="Blog" />,
                <FooterRow.Item key="tags" href="/tags" text="Tags" />,
                <FooterRow.Item
                  key="books"
                  href="/books"
                  text="Books"
                  hidden
                />,
                <FooterRow.Item
                  key="articleNotes"
                  href="/library/articles"
                  text="Reading Notes"
                />,
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
            <small className="text-base-500">{copyrightString}</small>
          </div>
        </div>
      </div>
    </div>
  )
}
