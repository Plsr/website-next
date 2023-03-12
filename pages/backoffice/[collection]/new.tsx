import clsx from 'clsx'

type CreateCollectionEntryProps = {
  collectionName: string
}

export const CreateCollectionEntry = ({
  collectionName,
}: CreateCollectionEntryProps) => {
  return (
    <div>
      <h1 className="font-bold text-lg mb-4">Create new {collectionName}</h1>
      <div className="flex flex-col gap-y-6">
        <FormInput type="text" placeholder="title" />
        <FormInput type="text" placeholder="link" />
        <FormTextArea placeholder="text" className="min-h-[300px]" />
        <div className="flex gap-x-4">
          <button className="px-4 py-2 bg-blue-500 rounded-lg">Save</button>
          <button className="px-4 py-2 border border-neutral-50 rounded-lg">
            Draft
          </button>
        </div>
      </div>
    </div>
  )
}

const FormInput = ({ className, ...props }: JSX.IntrinsicElements['input']) => {
  return (
    <input
      {...props}
      className={clsx(
        'rounded bg-neutral-800 border border-neutral-400 p-2',
        className
      )}
    />
  )
}

const FormTextArea = ({
  className,
  ...props
}: JSX.IntrinsicElements['textarea']) => {
  return (
    <textarea
      {...props}
      className={clsx(
        'rounded bg-neutral-800 border border-neutral-400 p-2',
        className
      )}
    />
  )
}

export default CreateCollectionEntry
