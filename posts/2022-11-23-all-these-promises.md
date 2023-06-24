---

title: All these Promises
date: '2022-11-23T06:59:26.271Z'
excerpt: On the different approaches JavaScript offers to simultaneously handle multiple promises.
tags: javascript til
---

Here's the different methods of handling an Array of Promises in JavaScript.

### [`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

Probably the best known of them all. We tell JavaScript "We need all these Promises to fulfill". Thus, `Promise.all()` will stop executing any further promises on the first promise it encounters that is rejected.

```javascript
const promise1 = Promise.resolve(13)
const promise2 = Promise.reject(37)
const promise3 = Promise.resolve('foo')

const results = await Promise.all([promise1, promise2, promise3])
console.log(results)
// => [{status: 'fulfilled', value: 13}, {status: 'rejected', reason: 37}]
```

### [`Promise.allSettled()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

Similar to `Promise.all()`, but will not stop executing on the first rejection and follow trough until all Promises are settled.

```javascript
const promise1 = Promise.resolve(13)
const promise2 = Promise.reject(37)
const promise3 = Promise.resolve('foo')

const results = await Promise.allSettled([promise1, promise2, promise3])
console.log(results)
// => [
// {status: 'fulfilled', value: 13},
// {status: 'rejected', reason: 37}
// {status: 'fulfilled', value: 'foo'}
//]
```

### [`Promise.any()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

With `Promise.any()`, we're telling JavaScript that we need any of the passed Promises to resolve. We do not really care which one, as long as it is at least one. JS will then return the first one to resolve or an `AggregateError` if none resolved (we usually want to handle that).

```javascript
const promise1 = Promise.resolve(13)
const promise2 = Promise.reject(37)
const promise3 = Promise.resolve('foo')

try {
  const result = await Promise.any([promise1, promise2, promise3])
  // Do something with our result
} catch (error) {
  // Do something to handle the error case in a meaningful way
}
```

### [`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

Again, this is very similar to `Promise.any()`. The main difference is that `Promise.race()` will take the first settled Promise (which can be resolved or rejected), whereas `Promise.any()` will take the first resolved Promise.

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one')
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'two')
})

try {
  const result = await Promise.race([promise1, promise2])
  console.log(result.value)
} catch (reason) {
  console.log(reason)
}

// => "two", because promise2 rejected faster than promise1 resolved
```
