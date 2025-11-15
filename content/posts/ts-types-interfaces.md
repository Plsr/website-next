---
title: Differences between Types and Interfaces in TypeScript
date: '2023-12-08T07:03:26.271Z'
excerpt: Exploring the differences between Types and Interfaces in TypeScript, and which to use
tags: programming typescript
slug: ts-types-interfaces
draft: false
---

In TypeScript, you can choose between Type and Interface to define an object type. In this article, I want to write down the (few) differences between the two.
For the longest time, I had the idea in my head, that it’s fine to use either and there are no big differences. Which turns out to be very close to the truth.

For most use cases, it does not make a difference if you use a type or an interface. The TypeScript documentation states they can be swapped freely. You can even merge interfaces and types:

```ts
type Name = {
  name: string
}

interface Age {
  age: number
}

type Person = Name & Age

const me: Person = {
  name: 'Chris',
  age: 32,
}
```

## The differences

If you’d prefer to just read annotated code, [this playground example](https://www.typescriptlang.org/play#example/types-vs-interfaces) might be what you want.

The first difference you may have noticed above is not a functional one, but one in the syntax. Types and Interfaces differ in how they are declared and in mutating them.

```ts
type Name = {
  name: string
}

interface Age {
  age: number
}
```

The declaration looks pretty similar, but when we want to extend an Interface or a Type, the differences are more obvious:

```ts
// Interface
interface Animal {
  name: string
}

interface Insect extends Animal {
  canSting: boolean
}

// Type
type Animal = {
  name: string
}

type Insect = Animal & {
  canSting: boolean
}
```

As you can see, Interfaces are more verbose in comparison to Types. Depending on whether you like that or not, this could be a factor in deciding which one to use.

Another, and basically the only real big difference, is extendability.

Once you defined a Type somewhere, it cannot be mutated in any other place it is used.

```ts
type Person = {
  name: string
}

type Person = {
  // ^ Duplicate identifier 'Person'
  age: number
}
```

Note that this does not mean that you cannot have many Types throughout your codebase with the same name. In a react project, I often times have a `Props` type per component file. However, if you import a Type from somewhere, it is set and cannot be manipulated.

This is different for Interfaces. You can define the same Interface multiple times in a row and it will be merged into a final interface:

```ts
interface Person {
  name: string
}

interface Person {
  age: number
}

const me: Person = {
  name: 'Chris',
  age: 32,
}
```

## Which one should I use?

There are not many factors on which we can make the decision on wether it's best to use Types or Interfaces. The [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) states:

> If you would like a heuristic, use `interface`until you need to use features from `type`

Which could be a starting point. Another factor would be your personal preference on verbosity.

Here’s my personal opinion: I don’t like the verbosity, as it does not blend in well with the rest of the JavaScript syntax I usually write (I don't use classes a lot; however, if you use classes a lot, this argument can easily be reversed), where somewhat cryptic symbols are what I am used to anyways.
I strongly dislike the mutability of interfaces. If I use a typed language, I want my types to be a single source of truth. This is my only real argument for using Types above Interfaces.

Also, it's called TypeScript, not InterfaceScript, so...

### Further Reading

For more detailed information on the topic, I recommend checking out:

- [The TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [This exhaustive StackOverflow thread](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)
