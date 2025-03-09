---
title: Using ResizeObserver
excerpt: Sometimes, you want to listen to resize events of a specific element.
date: '2022-10-14T06:12:12.706Z'
---

You probably know about the [resize event on the `window` object](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) you can listen to. But there are situations where it is needed to know about size changes on single elements.\
This is where `ResizeObserver` comes in. With `ResizeObserver` you can define a callback that should be fired upon resize of an `Element` or `SVGElement`. Let's take a look.

We will explore the API by solving a fictitious problem:\
We need to know when a div with the id `my-div` resizes and broadcast the new height of the element to a function, `functionThatUsesTheNewHeight()`.

To accomplish that, we'll need to:

1. Instantiate a new `ResizeObserver`, define a callback and pass it to the observer
2. Observe an element

## Instantiating a new `ResizeObserver`

Creating a new `ResizeObserver` uses the syntax

```js
new ResizeObserver(callback)
```

However, we want to store the instance in a variable, to us it later on:

```js
const observer = new ResizeObserver(callback)
```

This is straight forward, but what will be out callback?

### Defining the callback

The callback function takes two arguments, `entries` (the observed elements) and `observer` (the `ResizeObserver` itself).

A callback function could look like the following:

```js
function callback(entries, observer) {
  for (const entry of entries) {
    // Do something with each entry
  }
}
```

Note that `entries` is an array, as one observer can observer multiple elements.

There are a few things we need to change to make the callback work for out scenario.\
First, `callback` is a bad name for the function. It worked for the code examples above, but from now on, we'll name our callback function `handleResize`.\
Second, we don't need the `observer` and will omit it.\
And third, we are observing a single item and will not loop through all entries (as we are sure there will only ever be one).

Our callback would look like this:

```js
function handleResize(entries) {
  const height = entries[0].contentRect.height
  functionThatUsesTheNewHeight(height)
}
```

`entries` is an array of [`ResizeObserverEntry`s.](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) They have a lot of interesting attributes, but for our example, the `contentRect` is the most interesting, as it contains the height of the element.

## Observe the element

The last step is to connect out observer to the target element. To achieve that, we have to get our div and pass it in our observer:

```js
const myDiv = window.getElementById('my-div')

const observer = new ResizeObserver(handleResize)

observer.observe(myDiv)
```

And that's it. We now know about size changes in our `div` and broadcast the new height to out target function.

## Teardown

As with event listeners, it's a good idea to clean up after us once we no longer need the observer. `ResizeObserver` offers to methods for this: `unobserve()` and `disconnect()`.

`unobserve()` takes a target as an argument and stops the observation of the specified target. Had we defined more than on target for our observer to observe, the others would have been left untouched.

`disconnect()` in contrast, will unobserve **all** observed targets of the observer.
