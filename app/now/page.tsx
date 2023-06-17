import { PageTitleWithSubline } from '../../components/page-title-with-subline'
import { Paragraph } from '../../components/paragraph'

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
          <li>I’m working full time for gigs</li>
          <li>Reading Skin in the Game</li>
          <li>Still reading a lot of blogs </li>
          <li>Playing Pokemon Yellow Edition again after about 20 years</li>
        </ul>
        <small>Last updated: 5th May, 2023</small>
      </Paragraph>
    </div>
  )
}

export default NowPage
