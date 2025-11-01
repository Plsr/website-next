# Tailwind CSS v4 Migration Plan

## Current State Analysis

- Tailwind CSS v4 and @tailwindcss/postcss are already installed (v4.0.14)
- Configuration still uses v3 syntax in `tailwind.config.js`
- CSS imports in `app/tailwind.css` and `app/global.css` use `@config` directive
- PostCSS config correctly uses `@tailwindcss/postcss`

## Migration Steps

### 1. Convert tailwind.config.js to CSS-based configuration

Replace `tailwind.config.js` with CSS custom properties in `app/tailwind.css`:

```css
@import 'tailwindcss';

@theme {
  /* Custom color palette */
  --color-accent-50: #ddf1e4;
  --color-accent-100: #bfe8d9;
  --color-accent-150: #a2dece;
  --color-accent-200: #87d3c3;
  --color-accent-300: #5abdac;
  --color-accent-400: #3aa99f;
  --color-accent-500: #2f968d;
  --color-accent-600: #24837b;
  --color-accent-700: #1c6c66;
  --color-accent-800: #164f4a;
  --color-accent-850: #143f3c;
  --color-accent-900: #122f2c;
  --color-accent-950: #101f1d;

  --color-paper: #fffcf0;

  --color-base-950: #1c1b1a;
  --color-base-900: #282726;
  --color-base-850: #343331;
  --color-base-800: #403e3c;
  --color-base-700: #575653;
  --color-base-600: #6f6e69;
  --color-base-500: #878580;
  --color-base-300: #b7b5ac;
  --color-base-200: #cecdc3;
  --color-base-150: #dad8ce;
  --color-base-100: #e6e4d9;
  --color-base-50: #f2f0e5;

  --color-neutral-50: #f7f7f8;
  --color-neutral-100: #efeef0;
  --color-neutral-200: #dad9de;
  --color-neutral-300: #b9b7c2;
  --color-neutral-400: #9290a0;
  --color-neutral-500: #716f81;
  --color-neutral-600: #5f5c6d;
  --color-neutral-700: #4d4b59;
  --color-neutral-800: #42414b;
  --color-neutral-900: #3a3941;
  --color-neutral-950: #27262b;

  /* Font families */
  --font-family-title: var(--font-main);
  --font-family-body: var(--font-main);
  --font-family-copy: var(--font-main);
  --font-family-handwriting: var(--font-main);

  /* Typography plugin customization */
  --typography-prose-body: var(--color-paper);
  --typography-prose-headings: var(--color-paper);
  --typography-prose-links: var(--color-accent-200);
  --typography-prose-bold: var(--color-paper);
  --typography-prose-code: var(--color-paper);

  /* Custom typography sizes */
  --typography-prose-h1-font-size: 1.4286em; /* em(20, 14) */
  --typography-prose-h2-font-size: 1.2857em; /* em(18, 14) */
  --typography-prose-code-font-size: 0.7rem;
  --typography-prose-pre-font-size: 0.7rem;
}

@layer base {
  .prose {
    max-width: none;
  }

  .prose h1 {
    font-size: var(--typography-prose-h1-font-size);
  }

  .prose h2 {
    font-size: var(--typography-prose-h2-font-size);
  }

  .prose code {
    font-size: var(--typography-prose-code-font-size);
  }

  .prose pre {
    font-size: var(--typography-prose-pre-font-size);
  }

  .prose a {
    color: var(--color-accent-200);
  }

  .prose strong {
    color: var(--color-paper);
  }
}

/* Border compatibility layer */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

### 2. Remove @config directives from CSS files

Remove the line `@config "../tailwind.config.js";` from:
- `app/tailwind.css` (line 3)
- `app/global.css` (line 1)

### 3. Update @tailwindcss/typography plugin

Install v4 compatible version:
```bash
pnpm remove @tailwindcss/typography
pnpm add @tailwindcss/typography@next
```

### 4. Add plugin configuration to CSS

In `app/tailwind.css`, add after `@import 'tailwindcss';`:
```css
@plugin "@tailwindcss/typography";
```

### 5. Update important mode configuration

Tailwind v4 no longer supports `important: true` in config. Convert all affected components to use `!` prefix on utilities where needed, or wrap the app in an element with high specificity selector.

### 6. Update darkMode configuration

Tailwind v4 uses `prefers-color-scheme` by default. Since the config specifies `darkMode: 'media'`, this should work without changes, but verify dark mode variants are functioning correctly.

### 7. Update content paths

In Tailwind v4, content paths are specified via CSS. Add to `@theme` block in `app/tailwind.css`:
```css
@source "../../app/**/*.{js,ts,jsx,tsx}";
@source "../../components/**/*.{js,ts,jsx,tsx}";
```

### 8. Delete tailwind.config.js

After completing all steps above, delete the file:
```bash
rm tailwind.config.js
```

### 9. Verify build

Run the following commands to ensure everything works:
```bash
pnpm build
```

### 10. Test dark mode and typography

Manually verify:
- Dark mode switching works correctly
- Typography plugin styles are applied (prose classes)
- Custom colors (accent, base, neutral, paper) are accessible
- Font families are applied correctly
- Custom typography sizes for h1, h2, code, pre elements work

## Notes

- The `colors` import from `tailwindcss/colors` in v3 config is no longer needed; all default Tailwind colors are available automatically in v4
- The helper functions (`round`, `em`) used for typography calculations should be computed manually and hardcoded in the CSS custom properties
- The typography theme function is replaced by CSS custom properties with `--typography-prose-*` naming convention
