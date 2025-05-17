import Image from 'next/image'
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
    <div>
      <h1>CV</h1>
      <p>
        Hello, I'm Chris Jarling. I'm a Sennior Fullstack Engineer with more
        than 10 years of professional experience.
      </p>
      <p>
        I enjoy working on building great products and all aspects that entails.
      </p>
      <p>
        I'm experienced in building both the frontend and backend of web
        applications. My origins as a designer allow me to build solutions with
        the user in mind. More recently, I've also gained some experience as a
        technical people manager, working on keeping the operational part of
        product development going.
      </p>

      <h2>Tech stack</h2>
      <p>
        In my opinion, in the vast majoirty of cases, the tech stack does not
        play a key role in the success of a product. I try to be open and work
        with watever tech makes most sense given the current setup.
      </p>
      <p>
        That said, I do have personal preferences that I'm most experienced in
      </p>
      <span>Next.js</span>
      <span>React.js</span>
      <span>TypeScript</span>
      <span>Ruby on Rails</span>
      <span>PostgreSQL</span>

      <h2>Experiences</h2>
      <div className="grid grid-cols-12 gap-4 gap-y-16">
        <Tenure company="Gigs" imageUrl="/cv-logos/gigs.png" invertLogo>
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
        <Tenure company="Cisco" imageUrl="/cv-logos/cisco.png">
          <ExperienceItem
            title="Software Engineer"
            startDate="2020"
            endDate="2022"
            achievements={ciscoAchievements}
          />
        </Tenure>
        <Tenure company="Railslove" imageUrl="/cv-logos/railslove.svg">
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
      <div className="flex flex-col items-start gap-2 col-span-3">
        {imageUrl && (
          <Image
            src={imageUrl}
            className={invertLogo ? 'invert bg-transparent' : 'bg-transparent'}
            alt=""
            width={70}
            height={70}
          />
        )}
        <h3>
          {companyUrl ? (
            <a
              href="https://gigs.com/"
              className="text-lg underline decoration-dotted"
            >
              {company}
            </a>
          ) : (
            <span>{company}</span>
          )}
        </h3>
      </div>
      <div className="col-span-9">{children}</div>
    </>
  )
}
