---
title: JavaScript Array Intersection
createdAt: 2023-00-09T23:24:21.048Z
updatedAt: 2023-09-09T23:24:21.048Z
excerpt: 'Different approaches to check array intersection in JavaScript'
---

### Lodash

Use `_.intersection()`: [https://lodash.com/docs/4.17.15#intersection](https://lodash.com/docs/4.17.15#intersection)

```js
_.intersection([2, 1], [2, 3])
// => [2]
```

### Vanilla Javascript

#### Using `Set`

```js
function intersection(a, b) {
  const setA = new Set(a)
  return b.filter((value) => setA.has(value))
}
```

Source: [https://stackoverflow.com/a/73246941/4181679
](https://stackoverflow.com/a/73246941/4181679)

#### Using `.filter()` and `.includes()`

```js
const filteredArray = array1.filter((value) => array2.includes(value))
```

Source: [https://stackoverflow.com/a/1885569/4181679
](https://stackoverflow.com/a/1885569/4181679)

## Benchmarks

100.000 runs with two arrays of 300 items each, 100 intersecting:

```
lodash: 1.208s
set: 826.824ms
filterIncludes: 3.765s
```

100.000 runs with two arrays of 3000 items each, 1000 intersecting:

```
lodash: 19.260s
set: 11.786s
filterIncludes: 5:37.872 (m:ss.mmm)
```

## Which one to use?

Raw speed would indicate using `Set()`. However, there are other factors that play into that.

If `lodash` is already present in the project, I would argue for going with `intersection` for a few reasons:

1. Improved readability. Function name describes exactly what is happening. Could also just move e.g. `Set()` into a function to have the same advantages. See 2.
2. Code will likely be more maintained if its coming from `lodash` compared to when it's somewhere in a private codebase

If speed is essential, there will probably be a culture in the codebase that forbids using `lodash` anyways.
