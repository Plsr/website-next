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
            (we're hiring 🤫)
          </li>
          <li>
            Currently in Stay-at-home-Dad mode, spending a lot of time with the
            family, awaiting our second child
          </li>
          <li>
            Reading{' '}
            <a
              className="text-rose-500"
              href="https://lesetagebu.ch/buch/before-the-coffee-gets-cold"
            >
              Before the Coffee Gets Cold
            </a>
          </li>
          <li>Trying to get back in the habit of writing more on here</li>
        </ul>
        <small>Last updated: 23rd November, 2023</small>
      </Paragraph>
    </div>
  )
}

export default NowPage
