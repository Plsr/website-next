'use client'

import { EyeIcon, EyeOffIcon, ShipWheelIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export const Story = () => {
  const [hidden, setHidden] = useState(false)

  const handleHideButtonClick = () => {
    setHidden(!hidden)
  }

  return (
    <div className="flex flex-col gap-4 text-base-300 bg-base-800/50 p-4 my-8 rounded-lg border border-base-800">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-base-400 text-sm">
          <div className="flex flex-row items-center gap-2">
            <ShipWheelIcon className="w-4 h-4" /> My story
          </div>
        </h2>
        <button onClick={handleHideButtonClick}>
          <div className="text-base-400 cursor-pointer text-sm transition-all hover:bg-base-800 px-2 py-1 rounded-lg flex flex-row items-center gap-2">
            {hidden ? (
              <>
                <EyeIcon className="w-4 h-4" />
                show
              </>
            ) : (
              <>
                <EyeOffIcon className="w-4 h-4" />
                hide
              </>
            )}
          </div>
        </button>
      </div>
      {!hidden && (
        <div className="text-md flex flex-col gap-4">
          <p>
            When I was 16, I read Walter Isaacson&apos;s biography of Steve Jobs
            and I decided that I wanted to be a builder. This was the first time
            in my life I got up early because <i>I wanted</i> to continue
            working on a project. Something clicked.
          </p>
          <p>
            I started studying Media and Informatics, but did not the thought of
            sitting around for three years. I took a job as an assistant to
            learn from my favorite professor and founded a small agency with
            friends. Many of the sites we built back then are still live and
            generating value for our customers.
          </p>
          <p>
            I started my career as a designer, but quickly realized that I could
            be very useful if I were able to also build the things I designed. I
            started out using frontend technologies, but got drawn into building
            backends in my first job, starting the journey into fullstack
            development. I enjoy the ability it gives me to have impact on a
            product in every aspect.
          </p>

          <h2 className="mt-4 -mb-2 font-bold">Tech stack</h2>
          <p>
            Tech does not matter in the vast majority of cases, I think you can
            get away with building almost anything in almost any tech
            stack.{' '}
          </p>
          <p>
            That said, I do have personal preferences that I&apos;m most
            experienced in:
          </p>
          <div className="flex flex-row gap-2 flex-wrap">
            <div className="flex flex-row items-center gap-1 bg-base-700/50 border border-base-700 p-2 rounded-md">
              <Image
                src="/cv-logos/nextdotjs.svg"
                alt=""
                width={15}
                height={15}
                className="inline-block mr-1 color-white"
              />
              <span className="text-xs">Next.js</span>
            </div>
            <div className="flex flex-row items-center gap-1 bg-base-700/50 border border-base-700 p-2 rounded-md">
              <Image
                src="/cv-logos/react.svg"
                alt=""
                width={15}
                height={15}
                className="inline-block mr-1 color-white"
              />
              <span className="text-xs">React.js</span>
            </div>
            <div className="flex flex-row items-center gap-1 bg-base-700/50 border border-base-700 p-2 rounded-md">
              <Image
                src="/cv-logos/typescript.svg"
                alt=""
                width={15}
                height={15}
                className="inline-block mr-1 color-white"
              />
              <span className="text-xs">TypeScript</span>
            </div>
            <div className="flex flex-row items-center gap-1 bg-base-700/50 border border-base-700 p-2 rounded-md">
              <Image
                src="/cv-logos/rubyonrails.svg"
                alt=""
                width={15}
                height={15}
                className="inline-block mr-1 color-white"
              />
              <span className="text-xs">Ruby on Rails</span>
            </div>
            <div className="flex flex-row items-center gap-1 bg-base-700/50 border border-base-700 p-2 rounded-md">
              <Image
                src="/cv-logos/postgresql.svg"
                alt=""
                width={15}
                height={15}
                className="inline-block mr-1 color-white"
              />
              <span className="text-xs">PostgreSQL</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
