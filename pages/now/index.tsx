import { NextPage } from 'next'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

export const NowPage: NextPage = () => {
  return (
    <div>
      <PageTitleWithSubline
        title="Now"
        subline={
          <PageTitleWithSubline.Subline>
            What I&apos;m currently doing
          </PageTitleWithSubline.Subline>
        }
      />
      <Paragraph>
        <ul className="mb-2 list-disc ml-4">
          <li>I’m working full time for gigs my</li>
          <li>Working on a redesign of this site in spare time </li>
          <li>Reading The Lean Startup and The Martian </li>
          <li>Also reading a lot of blogs </li>
          <li>Minimalising various aspects of my life</li>
        </ul>
        <small>Last updated: 6th November, 2022</small>
      </Paragraph>
    </div>
  )
}

export default NowPage
