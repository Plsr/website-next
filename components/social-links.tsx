import { SendIcon } from 'lucide-react'
import Image from 'next/image'

export const SocialLinks = () => {
  return (
    <div className="flex flex-row gap-2 not-prose -ml-2">
      <a
        href="https://x.com/chrisjarling"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2"
      >
        <Image
          src="/social-icons/x.svg"
          alt="X Account"
          width="20"
          height="20"
          className="opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        />
      </a>
      <a
        href="https://github.com/plsr"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2"
      >
        <Image
          src="/social-icons/github.svg"
          alt="Github Account"
          width="20"
          height="20"
          className="opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        />
      </a>
      <a
        href="https://www.linkedin.com/in/chrispop/"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2"
      >
        <Image
          src="/social-icons/linkedin.png"
          alt="Linkedin Account"
          width="20"
          height="20"
          className="invert opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        />
      </a>
      <a
        href="mailto:hi@chrisjarling.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2"
      >
        <SendIcon
          aria-label="Email"
          className="w-5 h-5 text-white opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        />
      </a>
    </div>
  )
}
