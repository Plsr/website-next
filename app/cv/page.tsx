import { ExternalLink, SailboatIcon, ShipWheelIcon } from 'lucide-react'
import Image from 'next/image'
import { Story } from './Story'
const gigsAchievementsIC = [
  'Worked on Connect, a user-facing, multi-tenant, no-code platform allowing customers to sell connectivity products withou implementation effort.',
  'Refactored the number porting flow and moved it from pre-checkout to post-checkout, vastly decreasing user churn.',
  'Authored the initial release of our in-house API documentation, retiring a generic, bought in solution, allowing us to customize the doucmentation to our needs and keeping it in line with our design language across products.',
  'Wrote guides and recorded instructional videos to aid cusomers implementing Connect features, decreasing the onboarding time for new customers and reducing the thime to ARR.',
  'Worked on the conversion of our Next.js app from the pages to the app router, making sure we are able to utilize the latest framework features and allowing us to run data logic on the server, increasing performance and security.',
]

const gigsAchievementsEM = [
  'Led a team of 5 engineers through the transition phase from my predecessor to myself.',
  "Conducted more than 50 interviews for senior-level engineering positions. Was actively involved in improving our hiring process to raise the bar for talent and make sure we're moving fast at the same time.",
  'Started an inventory for tech debt, worked with the team to prioritize and explored ways to reduce this debt without slowing down the pace of development.',
]

const ciscoAchievements = [
  'Created <a href="https://webex.shop">Webex Shop</a> with a small team, bringing it to production within 3 months, allowing the company to sell more devices during the height of the pandemic.',
  'Introduced hotwire to the existing Rails codebase, allowing for smoother UI interactions',
  'Worked closely with desingers and product managers to improve the existing device shop of our unit to improve sales',
]

const railsloveAchievements = [
  'Worked on the design and implementation of multiple customer projects, with Ruby on Rails and React.js, building both web and native applications.',
  "Lead and managed customer projects, making sure to have both the customers and agency's interests in mind.",
]

const sevenAchievements = [
  'Co-founded 51seven, a small agency focused on building web applicatons for small and medium-sized businesses.',
  'Actively involved in the daily operations of the agency, including project management, customer communication, and development.',
]

const universityAchievements = [
  "Worked as a scientific assistant, helping build courses with the professor's team, ran workshops on different tools like Sketch, Photoshop and Git.",
]

export default function CVPage() {
  return (
    <div className="text-base-200">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="-mb-4 text-base-400 text-sm">Curriculum Vitae</h1>
          <h2 className="text-xl font-bold">Hej, I'm Chris Jarling 👋</h2>
          <p>
            I'm a Senior Fullstack Engineer with more than 10 years of
            professional experience in building products for the web.
          </p>
          <p>
            I'm driven by building great products with a team of smart people. I
            will take on whatever responsibility necessarry for the success of
            the product, though I'm most experienced and useful as an engineer
            and technical manager.
          </p>
        </div>
        <Image
          src="/me-talk.png"
          alt="Chris Jarling"
          width={250}
          height={250}
          className="rounded-xl shadow-lg rotate-3 hidden md:block"
        />
      </div>

      <Story />
      <h2 className="text-xl font-bold mt-16 mb-4">Experiences</h2>
      <div className="grid grid-cols-12 gap-4 gap-y-8 md:gap-y-16">
        <Tenure
          company="Gigs"
          imageUrl="/cv-logos/gigs.png"
          companyUrl="https://gigs.com"
          invertLogo
        >
          <ExperienceItem
            title="Engineering Manager"
            startDate="2024"
            endDate="present"
            achievements={gigsAchievementsEM}
          />
          <div className="h-6" />
          <ExperienceItem
            title="Senior Fullstack Engineer"
            startDate="2022"
            endDate="2024"
            achievements={gigsAchievementsIC}
          />
        </Tenure>
        <Tenure
          company="Cisco"
          companyUrl="https://cisco.com"
          imageUrl="/cv-logos/cisco.png"
        >
          <ExperienceItem
            title="Software Engineer"
            startDate="2020"
            endDate="2022"
            achievements={ciscoAchievements}
          />
        </Tenure>
        <Tenure
          company="Railslove"
          companyUrl="https://railslove.com"
          imageUrl="/cv-logos/railslove.svg"
        >
          <ExperienceItem
            title="Fullstack Engineer"
            startDate="2016"
            endDate="2020"
            achievements={railsloveAchievements}
          />
        </Tenure>
        <Tenure company="51seven">
          <ExperienceItem
            title="Co-Founder & Design Engineer"
            startDate="2014"
            endDate="2016"
            achievements={sevenAchievements}
          />
        </Tenure>
        <Tenure company="Techincal University of Cologne">
          <ExperienceItem
            title="Scientific Assistant & Tutor"
            startDate="2013"
            endDate="2016"
            achievements={universityAchievements}
          />
        </Tenure>
      </div>
    </div>
  )
}

type ExperienceItemProps = {
  title: string
  startDate: string
  endDate: string
  achievements: string[]
}

const ExperienceItem = ({
  title,
  startDate,
  endDate,
  achievements,
}: ExperienceItemProps) => {
  return (
    <>
      <h4 className="font-bold">{title}</h4>
      <span className="block text-sm mb-2 opacity-60">
        {startDate} - {endDate}
      </span>
      <ul>
        {achievements.map((achievement, index) => (
          <li
            key={index}
            className="mb-2 text-sm opacity-90"
            dangerouslySetInnerHTML={{ __html: achievement }}
          ></li>
        ))}
      </ul>
    </>
  )
}

type TenureProps = {
  children: React.ReactNode
  imageUrl?: string
  company: string
  companyUrl?: string
  invertLogo?: boolean
}

const Tenure = ({
  children,
  imageUrl,
  company,
  companyUrl,
  invertLogo = false,
}: TenureProps) => {
  return (
    <>
      <div className="flex flex-col items-start gap-2 md:col-span-3 col-span-12">
        {imageUrl && (
          <Image
            src={imageUrl}
            className={
              invertLogo
                ? 'invert bg-transparent runded-lg'
                : 'rounded-lg bg-transparent'
            }
            alt={company}
            width={70}
            height={70}
          />
        )}
        <h3 className="flex flex-col">
          {!imageUrl && <span className="text-lg ">{company}</span>}
          {companyUrl ? (
            <a
              href={companyUrl}
              className="text-sm underline decoration-dotted"
            >
              {new URL(companyUrl).hostname.replace('www.', '')}
              <ExternalLink className="inline-block ml-2 w-3 h-3" />
            </a>
          ) : null}
        </h3>
      </div>
      <div className="md:col-span-9 col-span-12 mb-12 md:mb-0">{children}</div>
    </>
  )
}
