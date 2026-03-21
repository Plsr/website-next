# Images in posts

## Captioned images

A standalone image (the only content in its paragraph) with alt text is automatically wrapped in a `<figure>` with a `<figcaption>` using the alt text. This is handled by the `remark-figure` plugin (`src/plugins/remark-figure.mjs`).

```md
![A quiet mountain lake surrounded by pine trees](https://example.com/lake.jpg)
```

To render an image **without** a caption, leave the alt text empty:

```md
![](https://example.com/lake.jpg)
```

Note: the image must be the sole child of its paragraph (i.e. on its own line, not inline with other text) for the caption to be generated.

## Image pairs

To display two images side by side, use raw HTML with the `image-pair` classes:

```html
<figure class="image-pair">
  <div class="image-pair-grid">
    <img src="https://example.com/photo1.jpg" alt="First image" />
    <img src="https://example.com/photo2.jpg" alt="Second image" />
  </div>
  <figcaption>Optional shared caption</figcaption>
</figure>
```

- On screens wider than 640px, images display in a two-column grid.
- On mobile, they stack vertically.
- The `<figcaption>` is optional — omit it for no caption.
- Styles are defined in `src/styles/global.css`.

There is also an `ImagePair.astro` component (`src/components/ImagePair.astro`) with the same markup, usable in `.mdx` or `.astro` files:

```astro
<ImagePair
  src1="https://example.com/photo1.jpg"
  alt1="First image"
  src2="https://example.com/photo2.jpg"
  alt2="Second image"
  caption="Optional shared caption"
/>
```
