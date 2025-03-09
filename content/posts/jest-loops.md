---
title: Jest Loops and when to use them
date: '2024-08-03T21:57:26.271Z'
excerpt: Jest Loops are a powerful feature, but we should make sure to use them responsibly
tags: javascript programming testing
slug: jest-loops
---

[Jest](https://jestjs.io/) is a great JavaScript testing framework and I love to work with it. On a daily basis, I mostly work with `it` and `describe` blocks and it's `matcher`s. I've recently come across one of it's lesser known features. Or, at least it was lesser known for me personally: Loops.

For both `it` and `describe` blocks, Jest offers Looping functionality. Loops allow you to write a test case once and pass different data into it for each run. Here's the example from the Jest documentation at the time of writing:

```ts
it.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('.add($a, $b)', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```

We basically just pass in an Array of _data_ in whatever complexity we want and every run of the test code has access to one of the array items.

Now, if you think "wow, that was kind of hard to read, I would have preferred three distinct cases albeit the duplicated boilerplate" – keep reading, because this is what we'll talk about next.

## When to use Loops

As always, the answer is "it depends". However, my standard answer to wether you should Jest loops or not in a given situation is "No, don't use them".
Loops are a powerful tool and can be helpful at times, but they're also an easy way to introduce unnecessary complexity into a codebase. And engineers love complexity!

Even just from the example above you can see how much complexity we've added here: There's a data structure passed into the loop that the user has to understand (which is simple enough in this case, but I'm certain given enough time an Engineer will find a way to add something that's "quite elegant and saves us some repetitive code") and this data has to be passed around and referenced in three places. The naming helps, but let's see what we've really saved by using a loop:

```ts
it('.add(1, 1)', () => {
  expect(1 + 1).toBe(2)
})

it('.add(1, 2)', () => {
  expect(1 + 2).toBe(3)
})

it('.add(2, 1)', () => {
  expect(2 + 1).toBe(3)
})
```

Yes, we have some repetition, but I find that easier to read compared to the above. [^1]

There are cases where I like to use loops, though. Usually those cases have a few things in common:

1. The input array consists only of primitives (`string[]` etc.)
2. The loop tests business logic that is required to behave in a certain way for this specific input and we want to be notified once it behaves differently for one of these cases[^2]

### A better example?

Let's assume we have a small program which allows our users to enter their name into an `<input />` field, press a button and the program then will display a message, greeting them by name.
Two of the functions we'd need are `parseInputValue()` and `constructGreetingMessage()`. I'll skip the implementation here, since it's not important and you can probably imagine it just fine. How would we test this?

For `constructGreetingMessage()`, the tests are rather straight forward:

```ts
it('constructs a message that greets the user by name', () => {
  const message = constructGreetingMessage('John')
  expect(message).toEq('Hello, John!')
})
```

And the same for `parseInputValue()`:

```ts
it('returns the input value', () => {
  const expectedInput = 'John'
  // ... render the input
  // ... fill the input with "John"
  expect(parseInputValue()).toEq('John')
})
```

That's great, we add a few more tests, deploy the first version and watch the users come to use our app.
A few days later, our boss, the CEO of GreetMeApp LLC want's to have an immediate call with us. He notifies us that user have been **abusing** or app and entered naughty words in the input. This has to stop!

We're dropping everything else to ship a fix asap. We consult our data team and they provide us with a list of common naughty words. It's a list of 53 words in total and they assure us that they did extensive research: The list is complete and will not change in the future. It has every naughty word in it that there is. We go ahead and build in a filter to our `parseInputValue()` so that is just returns `"User"` if someone enters a naughty word. Great, the day is saved.

But how do we test this? We definitely want to make sure that even on future changes, none of these naughty words makes it back out of the filtered values. We cannot risk taking a hit on our MRR again.

This is actually a good use case for a test loop:

```ts
const naughtyWords = ['poo', 'bum', '💩', '...']
// naughtyWords.length => 53

it.each(naughtyWords)('filters out $word', (word) => {
  // ... render the input
  // ... fill the input with the naughty word
  expect(parseInputValue()).toEq('User')
})
```

Now we can make sure that a test fails in case someone removes one of the words from the filter list and affects important business logic, while the tests remain fairly simple to read.

I realize that this example is... somewhat constructed as well. But we have used loops in test suite in a similar manner lately. The array the loop took in contained only three items but the test cases were quite long. The main advantage of having a loop in this case was that it made clear that for _all_ of the values we passed in, we expect the exact same thing to happen. If we need to adapt the cases for one of these values, it will hopefully ring some alarm bells and make people aware of the consequence of the intended change.

[^1]: : I understand that this is an constructed example for documentation purposes and there might be better examples to show when a loop is useful. But this is what we currently have.

[^2]: Often times, you can just test two cases to make sure you code handles the distinction just right, but sometimes it's required to make sure the code handles _all_ of these cases right.
