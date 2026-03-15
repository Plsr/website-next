---
title: Create and retrieve a record with supabase.js
date: '2023-12-13T10:03:26.271Z'
excerpt: Creating a record and then using it right away is a little icky
tags: programming supabase
draft: false
---

Creating a new record in supabase is pretty straight forward:

```ts
const { error } = await supabase.from('results').insert({
  wpm: results.wpm,
  errorRate: results.errorRate,
  quote_id: results.quoteId,
})
```

When creating a single resource, I often times want to use it right away. However,
supabase's `insert()` only will only tell you if inserting was successful or not.  
In [the documentation](https://supabase.com/docs/reference/javascript/insert?example=create-a-record) you
can toggle a (not very obvious) tab that will show you what to do if you want to
use the created record right away:

```ts
const { data: result, error } = await supabase
  .from('results')
  .insert({
    wpm: results.wpm,
    errorRate: results.errorRate,
    quote_id: results.quoteId,
  })
  .select()
```

This will return an array (with only one entry in this case) though.

```ts
return result
// ^
// const result: {
//   created_at: string;
//   errorRate: number | null;
//   id: number;
//   quote_id: number | null;
//   wpm: number;
// }[]
```

So we use `single()` to tell supbase that we're only expecting one row. Full call
looks like this:

```ts
const { data: result, error } = await supabase
  .from('results')
  .insert({
    wpm: results.wpm,
    errorRate: results.errorRate,
    quote_id: results.quoteId,
  })
  .select()
  .single()

if (error) {
  // error handling
}

return result.id
```

Since I keep forgetting this, hopefully this will help me remember.
