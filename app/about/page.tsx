import { formatDistanceToNowStrict } from 'date-fns'
import Link from 'next/link'
import { ChangelogList } from '../../components/changelog-list'
import { Headline } from '../../components/headline'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'
import { getWebsiteReleases } from '../../lib/github'

const birthDay = new Date('22 Jul 1991')
const yearsOld = formatDistanceToNowStrict(birthDay, {
  roundingMethod: 'floor',
})

export const revalidate = 60

const AboutPage = async () => {
  const releases = await getWebsiteReleases()

  return (
    <div>
      <Headline level={2}>About</Headline>
      <Paragraph>
        Hey, I&apos;m Chris Jarling. I&apos;m a {yearsOld} year old husband and
        father of two. Frontend Engineer at{' '}
        <Paragraph.Link href="https://gigs.com">Gigs</Paragraph.Link>, the
        world&apos;s first Telecom-as-a-Service (we&apos;re hiring).
        <br />
        <br />
        If you want to contact me, I&apos;d be stoked to receive and email from
        you:{' '}
        <a
          href="mailto:hi@chrisjarling.com"
          className="underline text-accent-500"
        >
          hi@chrisjarling.com
        </a>
      </Paragraph>
      <Headline level={3}>Elsewhere</Headline>
      <ul className="list-disc ml-4">
        <li>
          Twitter:{' '}
          <a
            href="https://twitter.com/chrisjarling"
            className="text-base-400 underline"
          >
            @chrisjarling
          </a>
        </li>
        <li>
          Mastodon:{' '}
          <a
            href="https://hachyderm.io/@chrisjarling"
            className="text-base-400 underline"
          >
            @chrisjarling@hachyderm.io
          </a>
        </li>
        <li>
          Github:{' '}
          <a href="https://github.com/Plsr" className="text-base-400 underline">
            Plsr
          </a>
        </li>
      </ul>

      <Headline level={2}>Colophon</Headline>
      <Paragraph>
        This site is built with Next.js and hosted on Vercel. Content is just
        plain markdown files. You can find the source code on{' '}
        <Paragraph.Link href="https://github.com/Plsr/website-next">
          Github
        </Paragraph.Link>
        . Styling via Tailwind.
      </Paragraph>
    </div>
  )
}

export default AboutPage
