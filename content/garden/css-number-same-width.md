---
title: CSS Numbers with same width
createdAt: 2024-10-06T07:24:21
updatedAt: 2024-10-06T07:24:21
tags:
  - css
  - programming
wip: false
excerpt: Sometimes you want all numbers be the same witdht wihtout using a monospace font
---

To achieve this, we can use the `tabular-nums` value for `font-variant-numeric`:

```css
font-variant-numeric: tabular-nums;
```

In tailwind, we can use the [existing util](https://tailwindcss.com/docs/font-variant-numeric):

```html
<div class="tabular-nums"></div>
```

