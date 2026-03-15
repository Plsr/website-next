---
title: 'Quicktip: SVG inheriting the color of its parent'
date: '2017-12-20 15:06 +0100'
tags: web-dev svg
---

_TL;DR: Use `fill: currentColor` on the svg, then control the svg’s color via its parent’s `color` property._

I decided to start writing down things that I learn. In the first place, for me to remember them. I tend to forget things rather quickly and having them written down helps me remembering . I used to shove everything into [this repository](https://github.com/Plsr/resources), but writing my learnings down here forces me to spend more time and thought with them, so I’ll remember them better. At least thats the plan.  
I often tend to think “Oh, thats so basic, this isn’t news to anybody but me, so why should I even write about it?”. But if I searched for it, there’s a decent chance someone else will do the same some day. So, here goes nothing.

I recently found myself in a situation where I built a button with an icon and a label in it. The basic markup looked like this:

```jsx
const IconButton = ({ someprops }) => (
  <button
    onClick={() => onClick(value)}
    isActive={isActive}
    syles={}
  >
      <Icon icon={icon} size={40} color={someColor}/>
      {children}
  </button>
)
```

You may have noticed that this is written in React. The `<Icon>` component is a rather simple one, that takes an svg path as an icon prop and renders it as an `<svg>` tag, applying some styling, like the size and the color.

```jsx
const Icon = ({ size, color, icon }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024">
    <path style={{ fill: color }} d={icon}></path>
  </svg>
)
```

By default, the border of the button and its content should be grey, becoming rose on hover.  
When I originally wrote this component (as part of my bachelor thesis), I was just starting out with React. So my naive approach was to just listen to `onMousenter` and `onMouseLeave` events, to change the color of the button and the icon. Even though all roads lead to Rome, this one is probably the hardest one you could travel on.

When I stumbled upon this component a few days ago, I though that there must be a simpler solution. First of all, the native `<button>` element already listens to hover events and activates the `:hover` pseudo-class, so there really is no need to write that logic myself. Changing the border color of the button and the color of the text was as easy as adding the CSS rules to the `:hover` pseudo-class.  
But since the svg-icon had a color fill assigned by the `<Icon>` class, the color wouldn’t be changed by that.

The next solution coming to mind would be to just change the `fill` of the svg when the button is in hover state, maybe like so:

```scss
.button {
  &:hover {
    // button hover stlying
    > svg {
      fill: rose;
    }
  }
}
```

While this works just fine, I’m not a fan of the deep nesting and the usage of the child-selector here.
But there is an even simpler solution: Providing `fill: currentColor` to the svg. This will lead the svg to adapt the color provided to its parent through the CSS `color` property.

So, for my particular use case, I just changed the default value of the color props in the `<Icon>` component from white to `currentColor`, so the icon now just inherits whatever color the parent element has when not explicit color is provided. Everything else came down to some CSS rules for the button.
