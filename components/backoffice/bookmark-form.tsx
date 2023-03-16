import { useState } from 'react'
import { BookmarkData } from '../../lib/data/bookmarksHandler'
import { FormInput } from './form-input'
import { FormTextArea } from './form-textarea'

type BookmarkFormProps = {
  onSubmit: (data: BookmarkData) => void
  defaultValues?: Partial<BookmarkData>
}

export const BookmarkForm = ({
  onSubmit,
  defaultValues = {},
}: BookmarkFormProps) => {
  const [link, setLink] = useState(defaultValues.link || '')
  const [title, setTitle] = useState(defaultValues.title || '')
  const [text, setText] = useState(defaultValues.text || '')

  const formValid = () => {
    return !!link && !!title && !!text
  }

  const handleSubmitClick = () => {
    if (!formValid()) {
      return
    }

    onSubmit({
      link,
      title,
      text,
    })
  }

  return (
    <div className="flex flex-col gap-y-6">
      <FormInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <FormInput
        type="text"
        placeholder="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <FormTextArea
        placeholder="text"
        className="min-h-[300px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-x-4">
        <button
          disabled={!formValid()}
          onClick={handleSubmitClick}
          className="px-4 py-2 bg-blue-500 rounded-lg disabled:opacity-70"
        >
          Save
        </button>
        <button className="px-4 py-2 border border-neutral-50 rounded-lg">
          Draft (tbd)
        </button>
      </div>
    </div>
  )
}
