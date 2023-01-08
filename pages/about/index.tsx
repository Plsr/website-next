import { NextPage } from 'next'
import Link from 'next/link'
import { PageTitleWithSubline } from '../../components/page-title-with-subline'

const AboutPage: NextPage = () => {
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
      <h2 className="font-headline text-2xl font-bold">Me</h2>
      <p className="text-slate-700">My name is Chris Jarling.</p>
      <h2 className="font-headline text-2xl font-bold">This site</h2>
    </div>
  )
}

export default AboutPage
