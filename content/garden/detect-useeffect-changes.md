---
title: Detect changes in useEffect dependencies
createdAt: 2023-10-16T12:24:21.048Z
updatedAt: 2023-10-16T12:24:21.048Z
tags: react
wip: true
---

Taken from [this StackOverflow answer](https://stackoverflow.com/a/59843241/4181679)

```ts
const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, [])

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index

      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      }
    }

    return accum
  }, {})

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger], ', changedDeps)
  }

  useEffect(effectHook, [effectHook, ...dependencies])
}
```

There also seems to be [use-what-changed](https://github.com/simbathesailor/use-what-changed)
which probably is a lot more reliable, but have not used it yet.
