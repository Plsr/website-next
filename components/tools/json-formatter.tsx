'use client'

import clsx from 'clsx'
import { useRef, useState } from 'react'

// TODO:
// Better way to display invisible characters
// Pick properties to include (later)

export const JSONFormatter = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLTextAreaElement>(null)
  const [formattedResult, setFormattedResult] = useState<string | null>(null)
  const [indentation, setIndentation] = useState<number>(2)
  const [indentationType, setIndentationType] = useState<'tabs' | 'spaces'>(
    'spaces'
  )
  const [error, setError] = useState<string | null>(null)

  // TODO: Should happen automatically later on
  const handleConvertClick = () => {
    console.log('convert')
    setError(null)

    if (!inputRef.current || !inputRef.current.value) {
      // No idea how this happended but shit hit the fan
      return
    }

    const input = inputRef.current.value

    try {
      const yo = JSON.parse(input)
      console.log('valid input')
      console.log(Object.keys(yo))
      setFormattedResult(yo)
      return true
    } catch (error) {
      console.log(error)
      //@ts-ignore
      setError((error.message as string).split('JSON')[0] + 'JSON')
      return false
    }
  }

  // TODO: Might need more work to look nice, especially for tabs
  const getIntendation = () => {
    if (indentationType === 'spaces') {
      return indentation
    }

    return Array(indentation).fill('\t').join('')
  }

  return (
    <>
      <div className="flex gap-8 mb-4">
        <div className="flex flex-col items-center">
          <h2 className="mb-2 self-start text-sm font-semibold uppercase">
            Indentation
          </h2>
          <div className="flex gap-2">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={indentation}
              onChange={(e) => setIndentation(parseInt(e.target.value))}
            />
            <span>10</span>
          </div>
          <div className="px-2 py-1 rounded-lg border border-base-700 bg-base-800">
            {indentation}
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase">
            Indentation Type
          </h2>
          <div className="flex gap-2">
            <button
              className={clsx(
                'p-2 border  rounded-lg',
                indentationType === 'spaces' &&
                  'bg-accent-700 text-base-200 border-accent-600',
                indentationType !== 'spaces' &&
                  'bg-base-800 text-base-300 border-base-700'
              )}
              onClick={() => setIndentationType('spaces')}
            >
              Spaces
            </button>
            <button
              className={clsx(
                'p-2  border rounded-lg',
                indentationType === 'tabs' &&
                  'bg-accent-700 text-base-200 border-accent-600',
                indentationType !== 'tabs' &&
                  'bg-base-800 text-base-300 border-base-700'
              )}
              onClick={() => setIndentationType('tabs')}
            >
              Tabs
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className={clsx(formattedResult && 'hidden', 'w-full')}>
          {error && (
            <div className="mb-2 text-sm bg-rose-300/80 border border-rose-400 rounded-lg p-2 text-rose-950">
              {error}
            </div>
          )}
          <textarea
            placeholder="Paste your JSON here"
            className="focus:outline-none focus:border-base-700 resize-none text-base-200 bg-base-900 border border-base-800 p-4 rounded-lg w-full min-h-[400px]"
            ref={inputRef}
          />
          <button
            className="mt-2 px-4 py-2 bg-accent-600 rounded font-bold"
            onClick={handleConvertClick}
          >
            Format
          </button>
        </div>
        <div
          className={clsx(
            'border-base-800 p-4 bg-base-900 w-full border rounded-lg overflow-x-scroll',
            formattedResult ? 'flex' : 'hidden'
          )}
        >
          <pre>
            {formattedResult &&
              JSON.stringify(formattedResult, null, getIntendation())}
          </pre>
        </div>
      </div>
    </>
  )
}
