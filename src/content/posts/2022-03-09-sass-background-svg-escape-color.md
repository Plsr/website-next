---
title: Using sass variables for svg background-image fill
date: '2022-03-09 22:17 +0100'
tags: svg web-dev sass
---

<style>
  .slava {
    background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='%230057b7'/%3E%3C/svg%3E%0A");
    width: 120px;
    height: 100px;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
</style>
<style>
  .ukarini {
    background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='%23ffd700'/%3E%3C/svg%3E%0A");
    width: 120px;
    height: 100px;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
</style>

Let's assume we have an element that has an `svg` as a background image in the data-uri format, maybe like this:

```css
.bg-svg {
  background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='%230057b7'/%3E%3C/svg%3E%0A");
  width: 120px;
  height: 100px;
  background-repeat: no-repeat;
}
```

The `svg` in this case is just a grey triangle, like this, with a fill color of `#0057b7`

<div class="slava"></div>

This does not fit our CD at all, so we want it to have our brands main color, `$cd-main-color: #ffd700`, so it looks like this

<div class="ukarini"></div>

## String interpolation

Sass allows us to use [string interpolation](https://sass-lang.com/documentation/interpolation), and since the `background-image` url is a string, we can use it here. So our first attempt might look like this:

```scss
background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='#{$cd-main-color}'/%3E%3C/svg%3E%0A");
```

Now nothing is rendered at all. That's not what we wanted and on inspection, we can see why:

```css
background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='#ffd700'/%3E%3C/svg%3E%0A");
```

The string interpolation also passed in the unencoded `#` that is saved in our sass variable. By definition, a `#` inside an URI defines the start of an [URI Fragment](https://en.wikipedia.org/wiki/URI_fragment), which breaks our data-uri.

So there is two things we need to do now:

1. Encode the `#`
2. Pass in the color variable wihtout the `#`

## Encoding the `#`

This part is fairly simple, as we can just look this up in an [ASCII Table](https://www.w3schools.com/tags/ref_urlencode.asp) or steal it from the encoded examples above. Either way, we want `%23` in there instead of the `#`.

## Only passing in the hex code

To achieve this, we just need to remove the first character from our color variable. Looks like [`str-slice()`](https://wikimass.com/sass/str-slice) could achive that.

> The str-slice() function returns the slice of a string starting at the specified index and ending at the specified index.

Let's try that.

```scss
$cd-main-color: #ffd700;
$cd-hex-only: str-slice($cd-main-color, 2);

.bg-svg {
  background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='#{$cd-hex-only}'/%3E%3C/svg%3E%0A");
  width: 120px;
  height: 100px;
  background-repeat: no-repeat;
}
```

Unfortunately, this gives us an error:

```
Error: $string: #ffd700 is not a string.
```

`$cd-main-color` is of the type `color` and we're trying to call a function on it that only works on `string` types. So we need to convert our color variable to be a `string` first. There are a couple of ways to do that.

We can use `inspect()`, which gives us a string representation of whatever we pass in. I'll go with this one. However, the [sass docs](https://sass-lang.com/documentation/modules/meta#inspect) state that it is only inteded for debugging use. If you do not like to live dangerously, you can also use `ie-hex-str()` and adapt how much of the string you slice.

So we now have one of those:

```scss
$cd-hex-only: str-slice(inspect($cd-main-color), 2);
$cd-hex-only: str-slice(ie-hex-str($cd-main-color), 4);
```

Only thing left to do is to put the two parts together:

```scss
$cd-main-color: #ffd700;
$cd-hex-only: str-slice(inspect($cd-main-color), 2);

.bg-svg {
  background-image: url("data:image/svg+xml,%3Csvg width='108' height='93' viewBox='0 0 108 93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0L107.694 93H0.306423L54 0Z' fill='%23#{$cd-hex-only}'/%3E%3C/svg%3E%0A");
  width: 120px;
  height: 100px;
  background-repeat: no-repeat;
}
```

Done 🤘

The idea for this stems from [this gist](https://gist.github.com/certainlyakey/e9c0d8f5c87ff47e3d5b), which also wraps the whole thing in a nice function for reuse.
