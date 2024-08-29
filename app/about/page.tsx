import { formatDistanceToNowStrict } from 'date-fns'

const birthDay = new Date('22 Jul 1991')
const yearsOld = formatDistanceToNowStrict(birthDay, {
  roundingMethod: 'floor',
})

export const revalidate = 60

const AboutPage = async () => {
  //const releases = await getWebsiteReleases()

  return (
    <div className="prose dark:prose-invert">
      <h1>About</h1>
      <p>
        Hey, I&apos;m Chris Jarling. I&apos;m a {yearsOld} year old husband and
        father of two. Frontend Engineer at <a href="https://gigs.com">Gigs</a>,
        the world&apos;s first Telecom-as-a-Service (we&apos;re hiring).
        <br />
        <br />
        If you want to contact me, I&apos;d be stoked to receive and email from
        you: <a href="mailto:hi@chrisjarling.com">hi@chrisjarling.com</a>
      </p>
      <h3>Elsewhere</h3>
      <ul className="list-disc ml-4">
        <li>
          Twitter: <a href="https://twitter.com/chrisjarling">@chrisjarling</a>
        </li>
        <li>
          Mastodon:{' '}
          <a href="https://hachyderm.io/@chrisjarling">
            @chrisjarling@hachyderm.io
          </a>
        </li>
        <li>
          Github: <a href="https://github.com/Plsr">Plsr</a>
        </li>
      </ul>

      <h3>Colophon</h3>
      <p>
        This site is built with Next.js and hosted on Vercel. Content is just
        plain markdown files. You can find the source code on{' '}
        <a href="https://github.com/Plsr/website-next">Github</a>. Styling via
        Tailwind.
      </p>
    </div>
  )
}

export default AboutPage
