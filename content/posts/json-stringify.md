---
title: Exploring JSON stringify
date: '2024-03-09T00:03:26.271Z'
excerpt: The JavaScript JSON stringify function is a widely know function, but it can do a lot more than you might think. Let's explore how to change the indentation and replace JSON content.
tags: programming javascript json
slug: json-stringify
draft: false
metaDescription: The JavaScript JSON stringify funciton is a widely know function, but it can do a lot more than you might think. An exploration.
---

If you’re a web developer, you have probably used the `JSON.stringify()` method in JavaScript. And if you’re anything like me, you will most likely have used it with just an object value that you want to stringify, either to store values in `localStorage` or to return a `JSON` response in an api route.

But did you know that `JSON.stringify()` method actually [accepts three parameters?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```jsx
JSON.stringify(value, replacer, space)
```

Let’s talk about the other two a little.

## Space

We’ll start with the last one, `space`, since it’s less complex. Space does what it sounds like: It allows you to add space to the JSON string the method produces.

Let’s assume we have a `user` object that looks like this:

```jsx
const user = {
  name: 'John Doe',
  age: 25,
  email: 'john@example.com',
  address: {
    city: 'New York',
    state: 'NY',
  },
}
```

If we call `JSON.stringify(user)` without any other arguments, we’ll get a valid JSON string, but it will be one long line:

```jsx
'{"name":"John Doe","age":25,"email":"john@example.com","address":{"city":"New York","state":"NY"}}'
```

That’s fine if the recipient of the string will parse it, but what if we wanted to display this somewhere? It would be nicer if it was properly formatted. Let’s do that using `space`:

```jsx
console.log(JSON.stringify(user, null, 2))

// =>
{
  "name": "John Doe",
  "age": 25,
  "email": "john@example.com",
  "address": {
    "city": "New York",
    "state": "NY"
  }
}
```

That looks a lot nicer!

`space` can be either a number or a string. If it’s a number, that indicates how many spaces should be used for indentation. If it’s a string, this string will be used for indentation:

```jsx
console.log(JSON.stringify(user, null, '🙈'))

//=>
{
🙈"name": "John Doe",
🙈"age": 25,
🙈"email": "john@example.com",
🙈"address": {
🙈🙈"city": "New York",
🙈🙈"state": "NY"
🙈}
}
```

Both of these are capped at a depth of `10`. You can also pass `\t` into it to indent using tabs.

This can be useful in various use cases. For example, I wrote a [JSON formatter](https://www.chrisjarling.com/tools/json-formatter) to wrap my head around the topic. The formatter heavily utilizes the `space` option of `JSON.stringify()`.

## replacer

`replacer` accepts either an array (of either strings or numbers) or a function.

If we pass an array of strings to it, `stringify` will only return matching key/value pairs:

```jsx
console.log(JSON.stringify(user, ['email', 'name'], 2))

// =>
{
  "email": "john@example.com",
  "name": "John Doe"
}
```

Note how the order in which the key/values pairs are returned is depending on the order in which they are defined in the array.

Also note that this only works for string or number keys, if we try to get a symbol key it will be empty:

```jsx
console.log(JSON.stringify(user, ['email', 'address'], 2))

// =>
{
  "email": "john@example.com",
  "address": {}
}
```

However, if we want more control over the returned values, we can pass a function in. If we (for whatever reason) wanted to shuffle all strings in our `JSON`, we can do the following:

```jsx
function replacer(key, value) {
  if (typeof value === "string") {
    return value
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
  return value;
}

console.log(JSON.stringify(user, replacer, 2))

// =>
{
  "name": "JoDohne ",
  "age": 25,
  "email": "lxmpjnoec@a.ohme",
  "address": {
    "city": "NeoY rwk",
    "state": "YN"
  }
}
```

As you can see, `JSON.stringify()` is not just a simple method for converting an object into a string. Its `replacer` and `space` parameters can provide you with additional control over the stringification process, allowing you to filter and format the output in various ways.
