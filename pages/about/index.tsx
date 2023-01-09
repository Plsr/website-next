import { formatDistanceStrict } from 'date-fns'
import { NextPage } from 'next'
import Link from 'next/link'
import { Headline } from '../../components/headline'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

const AboutPage: NextPage = () => {
  const birthDay = new Date('22 Jul 1991')
  const today = new Date()
  const yearsOld = formatDistanceStrict(today, birthDay)

  return (
    <div>
      <PageTitleWithSubline
        title="About"
        subline={
          <PageTitleWithSubline.Subline>
            Information about me and this site. For more information about what
            I&apos;m up to currently, see{' '}
            <Link href="/now" className="text-blue-500 underline">
              /now
            </Link>
          </PageTitleWithSubline.Subline>
        }
      />
      <Headline level={2}>Me</Headline>
      <Paragraph>
        My name is Chris Jarling. I'm {yearsOld} years old, am a husband and
        father and currently live in Cologne, Germany.
        <br />I currently work for a neat starup called{' '}
        <Paragraph.Link href="https://gigs.com">Gigs</Paragraph.Link> (we're
        hiring) as a Frontend Engineer.
      </Paragraph>
      <Paragraph>
        When I'm not working or spending time with my family, I usually work on
        a side project, write for this site or take photos.
      </Paragraph>

      <Headline level={2}>This site</Headline>
      <Paragraph>
        This site is built with Next.js and hosted on Vercel. Content is just
        plain markdown files. You can find the source code on{' '}
        <Paragraph.Link href="https://github.com/Plsr/website-next">
          Github
        </Paragraph.Link>
        .
      </Paragraph>
      <Paragraph>
        I used to run this site on Jekyll, but I wanted to have something more
        dynamic which was written in Javascript. In order to get this done
        quickly, I decided to only add the most important pages in the
        beginning. Things on here will likely change over time.
      </Paragraph>
    </div>
  )
}

export default AboutPage
