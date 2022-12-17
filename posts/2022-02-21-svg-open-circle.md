---
layout: post
title: Circle with a gap in SVG
date: '2022-02-21 22:03 +0100'
tags: web-dev svg
---

The other day I needed to build a circle with a gap as `SVG`. Here's how I approched it.

## Tl;dr

Use `stroke-dasharray` to define the gap in the circle. You'll want three values:

1. Offset from the start of the circle (right hand side, 90 degrees)
2. Size of the gap in the circle
3. Fill the rest of the circle (any number greater than what is left from `2 * pi * radius - (offset + gap size)`, see "Placing the Gap" below for more detail)

So, something like this:

```html
<svg width="250" height="250">
  <circle
    cx="110"
    cy="110"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
    stroke-dasharray="40 80 508"
  />
</svg>
```

that'll result in

<div style="width: 100%; height: 250px; display: flex; justify-content: center">
  <svg width=250 height=250>
    <circle cx=110 cy=110 r=100 fill="none" stroke-width="4" stroke="black" stroke-dasharray="40 80 508" />
  </svg>
</div>

If this is enough for you, I'm glad I could help. If not, I'll go into more detail below.

## Quick intro to the `<circle>` element

The `<cricle>` element has a few specific attributes we need to know about.

- `cx`: The x-coordinate where the center of the circle is located
- `cy`: The y-coordinate where the center of the circle is located
- `r`: The radius of the circle

A simple example would look like this:

```html
<svg width="200" height="200">
  <circle cx="100" cy="100" r="100" fill="black" />
</svg>
```

We have an `svg` that has a width and height of 200. Inside that, we have a `<circle>` with a radius of 100 (so its 200 in diameter). The center is located right in the middle of our svg.

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=200 height=200>
    <circle cx=100 cy=100 r=100 fill="black" />
  </svg>
</div>

If we want an outline circle with no fill, we can achieve that as well:

```html
<svg width="208" height="208">
  <circle
    cx="100"
    cy="100"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
  />
</svg>
```

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=208 height=208>
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="black" />
  </svg>
</div>

Note that we had to make the svg 8px higher and wider, as well as move the center by 4px since the stroke for an svg is rendered on the outside and it would be cut off otherwise.

## `stroke-dasharray`

Now to place the gap in our circle, we will use the `stroke-dasharray` attribute. As the name suggests, this attribute takes an array of dashes for the stroke. Let's play around with it a little.

### Only one value

```html
<svg width="208" height="208">
  <circle
    cx="100"
    cy="100"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
    stroke-dasharray="10"
  />
</svg>
```

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=208 height=208>
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="black" stroke-dasharray=10 />
  </svg>
</div>

This causes the dashes and gaps to be exactly the same size, 10px in this case.

### Two values

```html
<svg width="208" height="208">
  <circle
    cx="100"
    cy="100"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
    stroke-dasharray="10 50"
  />
</svg>
```

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=208 height=208>
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="black" stroke-dasharray="10 50" />
  </svg>
</div>

This will render dashes with the size of 10px and gaps with the size of 50px. Not too surpirsing.

### Three values

Three values is where it gets a little more interesting.

```html
<svg width="208" height="208">
  <circle
    cx="100"
    cy="100"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
    stroke-dasharray="10 50 150"
  />
</svg>
```

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=208 height=208>
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="black" stroke-dasharray="10 50 150" />
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="red" stroke-dasharray="2 1000" />
  </svg>
</div>

We are iterating though the values, but if it is a dash or a gap changes. Let's go through this, starging at the rightmost side (marked with the small red point).  
We will start with a 10px dash, followed by a 50px gap, followed by a 150px dash. Then, the 10px are used for a gap, the 50px for a dash and the 150px for a gap and so on.

We can use this to create an opening in the circle perfectly.

## Placing the gap

We now have all the tools we need, the only thing left to do is figure out what to pass to `stroke-dasharray`.

Let's say we wanted to place a gap between the 4 and 5 o'clock position in our circle. That would be between the 30 and 60 degree mark or between 1/12th and 2/12th of the circle (remember we're starting at the 3 o'clock position).  
We could totally get by with just filling in numbers and seeing how it goes, but just for the fun of it, let's calculate the values.

The whole circumference of our circle is

```
2 * pi * r = 2 * pi * 100 =~ 628
```

We now want to fill 1/12th of this, then have a gap the size of 1/12th as well and fill out the rest of the cirlce.

```
1/12 * 628 =~ 52
```

So our `stroke-dasharray` would have to be `52 52 524`. The last value is what is left from the circumference after the first dash and gap. You could use any number greater than whats leftover here, but since we're practically doing science now, we can as well be precise. Let's put this into action:

```html
<svg width="208" height="208">
  <circle
    cx="100"
    cy="100"
    r="100"
    fill="none"
    stroke-width="4"
    stroke="black"
    stroke-dasharray="52 52 524"
  />
</svg>
```

<div style="width: 100%; height: 250px; display: flex; justify-content: center; margin-top: 20px;">
  <svg width=208 height=208>
    <circle cx=104 cy=104 r=100 fill="none" stroke-width=4 stroke="black" stroke-dasharray="52 52 524" />
  </svg>
</div>

And that looks just about right. Nice 🎉

## Why not `stroke-dashoffset` and `transform: rotate`?

You could also achieve the above effect with just passing the desired gap size to `stroke-dashoffset` and then rotating the entire svg via CSS to position the gap where we want it. This works for the simple use case we went through above, but has it's limitations.

When I needed to build this, inside the circle there was another element and both of the elements had a uniform linear gradient to it. By rotating the circle, the gradient now went in a different direction on the circle and the inner elements.
