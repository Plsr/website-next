---
title: Optional number inputs with zod & react-hook-form
date: '2024-01-07T00:03:26.271Z'
excerpt: Having optional number inputs in react-hook-form with zod validation can be a little quirky.
tags: programming typescript zod react-hook-form
slug: zod-rhf-optional-number
draft: false
---

Say we have the following form using zod and react-hook-form:

```tsx
const schema = z.object({
  duration: z.number().optional(),
})

export const Form = () => {
  const { handleSubmit, control, register } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('duration', { valueAsNumber: true })} />
    </form>
  )
}
```

Submitting the from will not work. We can inspect the errors to see what's wrong:

```tsx
export const Form = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  console.log(errors.duration)

  // ...
}
```

Which will yield: `'Expected number, received nan'`. What happened?

Looking at the [react-hook-form documentation](https://react-hook-form.com/docs/useform/register), we learn that `valueAsNumber` will fall back to `NaN` if no conversion is possible[^1]:

> Returns a Number normally. If something goes wrong `NaN` will be returned.

Let's move over to zod: The documentation for `optional()` shows that the inferred type expects the defined type or `undefined`.

```ts
const user = z.object({
  username: z.string().optional(),
})
type C = z.infer<typeof user> // { username?: string | undefined };
```

Remember that `NaN` and `undefined` are different values. So we know why the form is not validating: We're passing an unexpected value for `duration`.

How do we fix it? Luckily, `react-hook-form` also provides another option for `register`, `setValueAs()`. We can use that instead:

```tsx
<input
  {...register('duration', {
    setValueAs: (value) => (value === '' ? undefined : parseInt(value)),
  })}
/>
```

This way, we make sure we set the value to the expected `undefined` if the input is left empty.

---

[moshyfawn](https://moshyfawn.dev/) suggested [another approach to the problem on twitter](https://x.com/moshyfawn/status/1743798518853025858?s=20) using zod's `coerce` functionality, shifting the value transformation from react-hook-form to zod:

```ts
const schema = z.object({
  duration: z.coerce.number().min(0).optional(),
})
```

[^1]: This is a limitation react-hook-form has inherited from the native [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)
