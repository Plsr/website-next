import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

export const dynamic = 'force-static'

const NowPage = () => {
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
          <li>
            I’m working full time for{' '}
            <a className="text-rose-500" href="https://gigs.com">
              gigs
            </a>{' '}
            (we&apos;re hiring 🤫)
          </li>
          <li>
            Trying to spend a lot of time with my family since we just had our
            second child.
          </li>
          <li>
            Working on{' '}
            <a className="text-rose-500" href="https://rapidlist.xyz">
              RapidList
            </a>
            , a simple todo list app that I built to fit my needs
          </li>
          <li>
            Reading{' '}
            <a
              className="text-rose-500"
              href="https://lesetagebu.ch/buch/masters-of-doom"
            >
              Masters of Doom
            </a>
          </li>
          <li>
            Reading{' '}
            <a
              className="text-rose-500"
              href="https://lesetagebu.ch/buch/founders-at-work"
            >
              Founders at work
            </a>
          </li>
          <li>Reading a lot of essays online</li>
        </ul>
        <small>Last updated: 1st January, 2024</small>
      </Paragraph>
    </div>
  )
}

export default NowPage
